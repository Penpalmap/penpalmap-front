import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Message, Room } from '../types'
import { getRooms } from '../api/rooms/roomApi'
import { useSession } from '../hooks/useSession'
import { onNewRoom, onUsersOnline } from '../sockets/socketManager'
import { AppContext } from './AppContext'
import { getMessages } from '../api/messages/messagesApi'

interface RoomContextType {
  rooms: Room[]
  resetCountUnreadMessagesOfRoom: (roomId: string) => void
  updateLastMessageInRoom: (message: Message, roomId: string) => void
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  isUnreadMessages: boolean
}

interface RoomProviderProps {
  children: ReactNode
}

const RoomContext = createContext<RoomContextType | undefined>(undefined)

export function useRoom() {
  const context = useContext(RoomContext)
  if (!context) {
    throw new Error('useRoom must be used within a RoomProvider')
  }
  return context
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [isUnreadMessages, setUnreadMessages] = useState<boolean>(false)

  const { user } = useSession()
  const [appData] = useContext(AppContext)

  const fetchUserRooms = useCallback(async () => {
    if (!user?.id) return
    const roomsData = await getRooms({ userIds: [user.id] })

    const roomsArray: Room[] = []
    for (const room of roomsData.data) {
      const lastMessageData = await getMessages({
        roomId: room.id,
        limit: 1,
        offset: 0,
        orderBy: 'createdAt',
        order: 'DESC',
      })

      const lastMessage = lastMessageData.data[0]
      const isUnreadMessages =
        !lastMessage?.isSeen && lastMessage?.sender?.id !== user.id
      const newRoom: Room = {
        ...room,
        lastMessage: lastMessage ?? null,
        isUnreadMessages: isUnreadMessages,
      }

      roomsArray.push(newRoom)
    }

    setUnreadMessages(roomsArray.some((room) => room.isUnreadMessages))
    setRooms(roomsArray)
  }, [user?.id])

  useEffect(() => {
    if (user) {
      fetchUserRooms()
    }
  }, [user, fetchUserRooms])

  const updateLastMessageInRoom = useCallback(
    (message: Message, roomId: string) => {
      if (!user) return
      setRooms((prevRooms) => {
        return prevRooms.map((room) => {
          if (room.id === roomId) {
            const newRoom: Room = {
              ...room,
              lastMessage: message,
              isUnreadMessages:
                !message.isSeen && message.sender?.id !== user.id,
            }

            return {
              ...newRoom,
            }
          }
          return room
        })
      })
    },
    [user]
  )

  const resetCountUnreadMessagesOfRoom = useCallback((roomId) => {
    setRooms((prevRooms) => {
      return prevRooms.map((room) => {
        if (room.id === roomId) {
          return {
            ...room,
            isUnreadMessages: false,
          }
        }
        return room
      })
    })
  }, [])

  useEffect(() => {
    if (!appData.socket) return
    onUsersOnline(appData.socket, (usersOnline) => {
      setRooms((prevRooms) => {
        return prevRooms.map((room) => {
          const newRoom: Room = {
            ...room,
            members: room?.members?.map((member) => {
              if (usersOnline.includes(member.id)) {
                return {
                  ...member,
                  isOnline: true,
                }
              } else {
                return {
                  ...member,
                  isOnline: false,
                }
              }
            }),
          }

          return {
            ...newRoom,
          }
        })
      })
    })

    onNewRoom(appData.socket, async () => {
      fetchUserRooms()
    })
  }, [appData.socket, fetchUserRooms])

  return (
    <RoomContext.Provider
      value={{
        rooms,
        resetCountUnreadMessagesOfRoom,
        updateLastMessageInRoom,
        setRooms,
        isUnreadMessages,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
