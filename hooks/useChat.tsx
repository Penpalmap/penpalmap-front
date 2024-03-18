import { useCallback, useContext, useEffect, useState } from 'react'
import { Message, Room } from '../types'
import { useSession } from './useSession'
import { AppContext } from '../context/AppContext'
import { useRoom } from '../context/RoomsContext'
import { createRoom, getRoomById } from '../api/rooms/roomApi'
import { CreateMessageDto } from '../api/messages/messagesDto'
import {
  createMessage,
  getMessage,
  getMessages,
  updateMessage,
} from '../api/messages/messagesApi'
import { onNewMessage, onSeenMessage } from '../sockets/socketManager'
import { SocketEvents } from '../constants/socketEnum'
import { createRoom as createRoomSocket } from '../sockets/socketManager'

export type MessageInput = {
  content: string
}

const useChat = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const { user } = useSession()
  const [appData, setAppData] = useContext(AppContext)
  const [messages, setMessages] = useState<Message[]>([])

  const [offset, setOffset] = useState(0)

  const { setRooms, updateLastMessageInRoom } = useRoom()

  useEffect(() => {
    const fetchRoom = async () => {
      if (appData?.chatData.roomChatId) {
        const room = await getRoomById(appData.chatData.roomChatId)

        setCurrentRoom(room as Room)

        const messagesData = await getMessages({
          roomId: room.id,
          limit: 20,
          offset: 0,
          orderBy: 'createdAt',
          order: 'DESC',
        })

        setMessages(messagesData.data.reverse())
      }
    }

    setMessages([])
    setOffset(0)
    if (appData?.chatData?.roomChatId) {
      fetchRoom()
    } else {
      setCurrentRoom(null)
    }
  }, [appData.chatData?.roomChatId, setAppData])

  const additonalFetchMessages = useCallback(async () => {
    if (currentRoom) {
      const messagesData = await getMessages({
        roomId: currentRoom.id,
        limit: 20,
        offset: offset,
        orderBy: 'createdAt',
        order: 'DESC',
      })

      setMessages((prevMessages) => [
        ...messagesData.data.reverse(),
        ...prevMessages,
      ])
    }
  }, [currentRoom, offset])

  useEffect(() => {
    if (offset > 0) {
      additonalFetchMessages()
    }
  }, [additonalFetchMessages, offset])

  const sendMessage = useCallback(
    async (message: MessageInput) => {
      if (!appData?.chatData?.userChat) return
      if (!user?.id) return
      let room = currentRoom ?? null
      if (!currentRoom?.id) {
        const senderId = user?.id
        const otherUserId = appData?.chatData?.userChat?.id
        if (!senderId || !otherUserId) return
        const roomData = await createRoom({
          memberIds: [senderId, otherUserId],
        })
        setCurrentRoom(roomData)
        createRoomSocket(appData?.socket, {
          receiverId: otherUserId,
          roomId: roomData.id,
        })

        room = roomData
        setRooms((prevRooms) => [...prevRooms, roomData])
      }

      if (!room) {
        return
      }

      const inputMessage: CreateMessageDto = {
        content: message.content,
        roomId: room.id,
        senderId: user?.id,
      }

      const newMessage = await createMessage(inputMessage)

      setMessages((prevMessages) => [...prevMessages, newMessage])
      updateLastMessageInRoom(newMessage, room.id)
    },
    [
      appData?.chatData?.userChat,
      appData?.socket,
      currentRoom,
      setRooms,
      updateLastMessageInRoom,
      user,
    ]
  )

  // Socket events
  useEffect(() => {
    if (!appData?.socket) return

    onNewMessage(appData.socket, async (message) => {
      const messageToAdd = await getMessage(message.messageId)

      if (messageToAdd?.room?.id) {
        updateLastMessageInRoom(messageToAdd, messageToAdd?.room?.id)
        if (messageToAdd?.room.id !== currentRoom?.id) return
        setMessages((prevMessages) => {
          // Vérifier si le message est déjà présent
          const isMessagePresent = prevMessages.some(
            (msg) => msg.id === message.messageId
          )
          if (isMessagePresent) {
            return prevMessages
          }

          return [...prevMessages, messageToAdd]
        })
      }
    })

    onSeenMessage(appData.socket, async (data) => {
      const message = messages.find((msg) => msg.id === data.messageId)
      if (message?.room?.id !== currentRoom?.id) return
      if (message?.isSeen) return //
      if (message?.sender?.id !== user?.id) return
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === data.messageId) {
            return {
              ...msg,
              isSeen: true,
            }
          }
          return msg
        })
      })
    })
    return () => {
      appData?.socket?.off(SocketEvents.NewMessage)
      appData?.socket?.off(SocketEvents.SeenMessage)
    }
  }, [
    appData.chatOpen,
    appData.socket,
    currentRoom?.id,
    messages,
    setMessages,
    updateLastMessageInRoom,
    user?.id,
  ])

  useEffect(() => {
    if (appData?.chatOpen && appData?.socket && currentRoom?.id && user?.id) {
      const isMessageToBeSeen = messages.some(
        (message) => message.sender?.id !== user?.id && !message.isSeen
      )

      if (isMessageToBeSeen) {
        const messagesToUpdate = messages.filter(
          (message) => message.sender?.id !== user?.id && !message.isSeen
        )

        messagesToUpdate.forEach(async (message) => {
          await updateMessage(message.id, {
            isSeen: true,
          })
        })

        setMessages((prevMessages) => {
          return prevMessages.map((msg) => {
            if (msg.sender?.id !== user?.id && !msg.isSeen) {
              return {
                ...msg,
                isSeen: true,
              }
            }
            return msg
          })
        })
      }
    }
  }, [appData?.chatOpen, appData?.socket, currentRoom?.id, messages, user?.id])

  return {
    messages: messages,
    sendMessage,
    room: currentRoom,
    offset,
    setOffset,
    // additonalFetchMessages,
  }
}

export default useChat
