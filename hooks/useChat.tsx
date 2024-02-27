import { useCallback, useContext, useEffect, useState } from 'react'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput, Room, User } from '../types'
import { useSession } from './useSession'
import { AppContext } from '../context/AppContext'
import {
  onNewMessage,
  onNewRoom,
  onSeenMessage,
  sendMessageSeen,
} from '../sockets/socketManager'
import { useRoom } from '../context/RoomsContext'
import { createRoom, getRoomById, getRooms } from '../api/rooms/roomApi'
import { CreateMessageDto } from '../api/messages/messagesDto'
import {
  createMessage,
  getMessages,
  updateMessage,
} from '../api/messages/messagesApi'

const useChat = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const { user } = useSession()
  const [appData, setAppData] = useContext(AppContext)
  const [messages, setMessages] = useState<Message[]>([])

  const [otherUser, setOtherUser] = useState<User | null>(null)

  const [offset, setOffset] = useState(0)

  const [isLoading, setIsLoading] = useState(true)
  const [roomIsLoading, setRoomIsLoading] = useState(true)
  const { updateLastMessageInRoom, setRooms, resetCountUnreadMessagesOfRoom } =
    useRoom()

  useEffect(() => {
    const fetchRoom = async () => {
      if (user?.id && appData?.roomChatId) {
        const room = await getRoomById(appData.roomChatId)

        setCurrentRoom(room as Room)

        const otherUser = room?.members?.find((member) => member.id !== user.id)
        if (otherUser) [setOtherUser(otherUser)]

        setIsLoading(false) // Mettre fin au chargement lorsque les informations sont disponibles.
      }
    }

    if (appData?.roomChatId) {
      setRoomIsLoading(true)
      fetchRoom()
      setMessages([])
      setOffset(0)
    }
  }, [appData.roomChatId, user])

  const initialFetchMessages = useCallback(async () => {
    if (currentRoom) {
      const messagesData = await getMessages({
        roomId: currentRoom.id,
      })
      setMessages(messagesData)
      setIsLoading(false)
      setRoomIsLoading(false)
    }
  }, [currentRoom])

  useEffect(() => {
    initialFetchMessages()
  }, [initialFetchMessages, currentRoom])

  const additonalFetchMessages = useCallback(async () => {
    if (currentRoom && !roomIsLoading) {
      const messagesData = await getMessages({
        roomId: currentRoom.id,
      })

      setMessages((prevMessages) => [...messagesData, ...prevMessages])
      setIsLoading(false) // Mettre fin au chargement lorsque les messages sont chargés.
    }
  }, [currentRoom, roomIsLoading])

  useEffect(() => {
    if (offset > 0) {
      additonalFetchMessages()
    }
  }, [additonalFetchMessages, offset])

  const sendMessage = useCallback(
    async (message: MessageInput) => {
      // const newMessage: Message = await createMessage(message)

      if (!message.roomId) {
        const room = await createRoom({
          memberIds: [message.senderId, message.receiverId],
        })
        setCurrentRoom(room)

        const newMessage: CreateMessageDto = {
          content: message.content,
          roomId: room.id,
          senderId: message.senderId,
        }

        await createMessage(newMessage)
        setRooms((prevRooms) => [...prevRooms, room])
      }

      // if (newMessage.isNewRoom) {
      //   createRoom(appData.socket, {
      //     roomId: newMessage.roomId,
      //     senderId: newMessage.senderId,
      //     receiverId: message.receiverId,
      //   })

      //   const room = await getRoomById(newMessage.roomId)
      //   room.countUnreadMessages = '0'
      //   setCurrentRoom(room)
      //   setRooms((prevRooms) => [...prevRooms, room])
      // }

      // setRooms((prevRooms) => [...prevRooms, room])

      // newMessage.receiverId = message.receiverId

      // setMessages((prevMessages) => [...prevMessages, newMessage])
      // updateLastMessageInRoom(newMessage)

      // sendMessageSocket(appData.socket, newMessage)
    },
    [setRooms]
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
            // await updateMessage({})
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
    otherUser,
    additonalFetchMessages,
  }
}

export default useChat
