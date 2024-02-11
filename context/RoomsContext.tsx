import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { Message, Room } from '../types'
import { getRooms } from '../api/conversationApi'
import { useSession } from '../hooks/useSession'
import { onUsersOnline } from '../sockets/socketManager'
import { AppContext } from './AppContext'

interface RoomContextType {
  rooms: Room[]
  resetCountUnreadMessagesOfRoom: (roomId: string) => void
  updateLastMessageInRoom: (message: Message) => void
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
  const [appData, setAppData] = useContext(AppContext)

  useEffect(() => {
    const fetchUserRooms = async () => {
      if (!user?.id) return
      const response = await getRooms(user.id)
      if (response) {
        setRooms(response.rooms)

        let totalUnread = 0
        response.rooms.forEach((room) => {
          if (room.countUnreadMessages) {
            totalUnread += parseInt(room.countUnreadMessages)
          }
        })

        setTotalUnreadMessagesNumber(totalUnread)
      }
    }

    fetchUserRooms()
  }, [user?.id])

  const updateLastMessageInRoom = useCallback(
    (message) => {
      if (!user) return
      setRooms((prevRooms) => {
        return prevRooms.map((room) => {
          if (room.id === message.roomId) {
            let countUnreadMessages: string

            if (message.senderId === user.id) {
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
              messages: [message],
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
            members: room.members.map((member) => {
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
      if (appData.userChat) {
        const userChat = appData.userChat
        const userIsOnline = usersOnline.includes(userChat.id)
        setAppData({
          ...appData,
          userChat: {
            ...userChat,
            isOnline: userIsOnline,
          },
        })
      }
    })
  }, [appData, appData.socket, setAppData])

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
