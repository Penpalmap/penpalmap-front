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
import { onUsersOnline } from '../sockets/socketManager'
import { AppContext } from './AppContext'
import { getMessages } from '../api/messages/messagesApi'

interface RoomContextType {
  rooms: Room[]
  resetCountUnreadMessagesOfRoom: (roomId: string) => void
  updateLastMessageInRoom: (message: Message, roomId: string) => void
  setRooms: React.Dispatch<React.SetStateAction<Room[]>>
  totalUnreadMessagesNumber: number
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
  const [totalUnreadMessagesNumber, setTotalUnreadMessagesNumber] =
    useState<number>(0)

  const { user } = useSession()
  const [appData] = useContext(AppContext)

  useEffect(() => {
    const fetchUserRooms = async () => {
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

        const newRoom: Room = {
          ...room,
          lastMessage: lastMessage ?? null,
          countUnreadMessages:
            !lastMessage?.isSeen && lastMessage?.sender?.id !== user.id
              ? '1'
              : '0',
        }

        roomsArray.push(newRoom)
      }

      setRooms(roomsArray)

      // if (roomsData) {
      //   setRooms(roomsData.data)

      //   let totalUnread = 0
      //   roomsData.data.forEach((room) => {
      //     if (room.countUnreadMessages) {
      //       totalUnread += parseInt(room.countUnreadMessages)
      //     }
      //   })

      //   setTotalUnreadMessagesNumber(totalUnread)
      // }
    }

    if (user) {
      fetchUserRooms()
    }
  }, [user])

  const updateLastMessageInRoom = useCallback(
    (message: Message, roomId: string) => {
      if (!user) return
      setRooms((prevRooms) => {
        return prevRooms.map((room) => {
          if (room.id === roomId) {
            let countUnreadMessages: string

            if (message.sender?.id === user.id) {
              countUnreadMessages = '0'
              setTotalUnreadMessagesNumber(
                (prev) => prev - parseInt(room.countUnreadMessages)
              )
            } else {
              if (!room.countUnreadMessages) {
                countUnreadMessages = '1'
              } else {
                setTotalUnreadMessagesNumber((prev) => prev + 1)
                countUnreadMessages = (
                  parseInt(room.countUnreadMessages) + 1
                ).toString()
              }
            }

            const newRoom: Room = {
              ...room,
              lastMessage: message,
              countUnreadMessages: countUnreadMessages,
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
          const newRoom: Room = {
            ...room,
            countUnreadMessages: '0',
          }

          setTotalUnreadMessagesNumber((prev) =>
            prev === 0 ? 0 : prev - parseInt(room.countUnreadMessages)
          )

          return {
            ...newRoom,
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
  }, [appData.socket])

  return (
    <RoomContext.Provider
      value={{
        rooms,
        resetCountUnreadMessagesOfRoom,
        updateLastMessageInRoom,
        setRooms,
        totalUnreadMessagesNumber,
      }}
    >
      {children}
    </RoomContext.Provider>
  )
}
