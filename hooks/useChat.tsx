import { useCallback, useContext, useEffect, useState } from 'react'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput, Room } from '../types'
import { useSession } from './useSession'
import {
  createMessage,
  getMessagesByRoomId,
  getRoomById,
  getRoomOfTwoUsers,
  updateMessageIsReadByRoom,
} from '../api/chatApi'
import { AppContext } from '../context/AppContext'
import {
  createRoom,
  onNewMessage,
  onNewRoom,
  onSeenMessage,
  sendMessageSeen,
  sendMessageSocket,
} from '../sockets/socketManager'
import { useRoom } from '../context/RoomsContext'

const useChat = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const { user } = useSession()
  const [appData, setAppData] = useContext(AppContext)
  const [messages, setMessages] = useState<Message[]>([])
  const [offset, setOffset] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [roomIsLoading, setRoomIsLoading] = useState(true)
  const { updateLastMessageInRoom, setRooms, resetCountUnreadMessagesOfRoom } =
    useRoom()

  useEffect(() => {
    const fetchRoom = async () => {
      if (user?.id && appData?.userChat?.id) {
        const room = await getRoomOfTwoUsers(user.id, appData.userChat.id)

        setCurrentRoom(room)
        setIsLoading(false) // Mettre fin au chargement lorsque les informations sont disponibles.
      }
    }

    if (appData?.userChat) {
      setRoomIsLoading(true)
      fetchRoom()

      setMessages([])
      setOffset(0)
    }
  }, [appData.userChat, user])

  const initialFetchMessages = useCallback(async () => {
    if (currentRoom) {
      const messagesData = await getMessagesByRoomId(currentRoom.id, 20, 0)
      setMessages(messagesData)
      setIsLoading(false)
      setRoomIsLoading(false)
    }
  }, [currentRoom])

  useEffect(() => {
    initialFetchMessages()
  }, [initialFetchMessages, currentRoom])

  const additonalFetchMessages = useCallback(async () => {
    if (appData?.userChat && currentRoom && !roomIsLoading) {
      const messagesData = await getMessagesByRoomId(currentRoom.id, 20, offset)

      setMessages((prevMessages) => [...messagesData, ...prevMessages])
      setIsLoading(false) // Mettre fin au chargement lorsque les messages sont chargés.
    }
  }, [appData?.userChat, currentRoom, roomIsLoading, offset])

  useEffect(() => {
    if (offset > 0) {
      additonalFetchMessages()
    }
  }, [additonalFetchMessages, offset])

  const sendMessage = useCallback(
    async (message: MessageInput) => {
      const newMessage: Message = await createMessage(message)

      if (newMessage.isNewRoom) {
        createRoom(appData.socket, {
          roomId: newMessage.roomId,
          senderId: newMessage.senderId,
          receiverId: message.receiverId,
        })

        const room = await getRoomById(newMessage.roomId)
        room.countUnreadMessages = '0'
        setCurrentRoom(room)
        setRooms((prevRooms) => [...prevRooms, room])
      }

      newMessage.receiverId = message.receiverId

      setMessages((prevMessages) => [...prevMessages, newMessage])
      updateLastMessageInRoom(newMessage)

      sendMessageSocket(appData.socket, newMessage)
    },
    [appData.socket, setRooms, updateLastMessageInRoom]
  )

  useEffect(() => {
    if (!appData.socket) return

    onNewMessage(appData.socket, async (message) => {
      if (!appData.socket) return

      const roomIsSameAsComingMessage = currentRoom?.id === message.roomId
      const senderUserIsCurrentUser = message.senderId === user?.id

      updateLastMessageInRoom(message)

      if (appData.chatOpen && user?.id) {
        if (!senderUserIsCurrentUser) {
          if (roomIsSameAsComingMessage) {
            setMessages((prevMessages) => [...prevMessages, message])

            sendMessageSeen(appData?.socket, message)
            resetCountUnreadMessagesOfRoom(message.roomId)
            await updateMessageIsReadByRoom(message.roomId, message.senderId)
          }
        }
      }
    })

    onSeenMessage(appData.socket, async (message) => {
      const readerIsOtherUser = message.senderId === user?.id

      if (readerIsOtherUser) {
        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.id === message.id) {
              return {
                ...msg,
                isSeen: true,
              }
            }
            return msg
          })
        })
      }
    })

    onNewRoom(appData.socket, async (roomId) => {
      const newRoom = await getRoomById(roomId)
      setRooms((prevRooms) => [...prevRooms, newRoom])
    })

    return () => {
      appData?.socket?.off(SocketEvents.NewMessage)
      appData?.socket?.off(SocketEvents.NewRoom)
    }
  }, [
    appData.socket,
    currentRoom,
    user,
    setAppData,
    appData,
    setRooms,
    updateLastMessageInRoom,
    resetCountUnreadMessagesOfRoom,
  ])

  return {
    messages: messages,
    sendMessage,
    room: currentRoom,
    offset,
    setOffset,
    isLoading,
    additonalFetchMessages,
  }
}

export default useChat
