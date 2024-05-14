import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { Message, Room } from '../types'
import { getRooms } from '../api/rooms/roomApi'
import { useSession } from '../hooks/useSession'
import { onNewRoom } from '../sockets/socketManager'
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
  const [isUnreadMessages, setIsUnreadMessages] = useState<boolean>(false)

  const { user } = useSession()
  const [appData] = useContext(AppContext)

  const fetchUserRooms = useCallback(async () => {
    if (!user?.id) return

    setRooms([])
    const roomsData = await getRooms({ userIds: [user.id], limit: 50 })

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
    // Check if any room has unread messages
    const hasUnreadMessages = rooms.some((room) => room.isUnreadMessages)

    // Update the state based on the result
    setIsUnreadMessages(hasUnreadMessages)
  }, [rooms])

  useEffect(() => {
    if (!appData.socket) return
    onNewRoom(appData.socket, async () => {
      fetchUserRooms()
    })
  }, [appData.socket, fetchUserRooms])

  const obj = useMemo(
    () => ({
      rooms,
      resetCountUnreadMessagesOfRoom,
      updateLastMessageInRoom,
      setRooms,
      isUnreadMessages,
    }),
    [
      rooms,
      resetCountUnreadMessagesOfRoom,
      updateLastMessageInRoom,
      isUnreadMessages,
    ]
  )

  return <RoomContext.Provider value={obj}>{children}</RoomContext.Provider>
}
