import { useCallback, useContext, useEffect, useState } from 'react'
import { Message, Room } from '../types'
import { useSession } from './useSession'
import { AppContext } from '../context/AppContext'
import { useRoom } from '../context/RoomsContext'
import { createRoom, getRoomById } from '../api/rooms/roomApi'
import { CreateMessageDto } from '../api/messages/messagesDto'
import { createMessage, getMessages } from '../api/messages/messagesApi'

export type MessageInput = {
  content: string
  // roomId: string | null | undefined
  // senderId: string
  // receiverId: string
}

const useChat = () => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null)
  const { user } = useSession()
  const [appData, setAppData] = useContext(AppContext)
  const [messages, setMessages] = useState<Message[]>([])

  const [offset, setOffset] = useState(0)

  const { setRooms } = useRoom()

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
    },
    [appData?.chatData?.userChat?.id, currentRoom, setRooms, user?.id]
  )
  // TO DO
  // useEffect(() => {
  //   if (!appData.socket) return

  //   onNewMessage(appData.socket, async (message) => {
  //     if (!appData.socket) return

  //     const roomIsSameAsComingMessage = currentRoom?.id === message.roomId
  //     const senderUserIsCurrentUser = message.sender?.id === user?.id

  //     updateLastMessageInRoom(message)

  //     if (appData.chatOpen && user?.id) {
  //       if (!senderUserIsCurrentUser) {
  //         if (roomIsSameAsComingMessage) {
  //           setMessages((prevMessages) => [...prevMessages, message])

  //           sendMessageSeen(appData?.socket, message)
  //           resetCountUnreadMessagesOfRoom(message.roomId)
  //           // await updateMessage({})
  //         }
  //       }
  //     }
  //   })

  //   onSeenMessage(appData.socket, async (message) => {
  //     const readerIsOtherUser = message.sender?.id === user?.id

  //     if (readerIsOtherUser) {
  //       setMessages((prevMessages) => {
  //         return prevMessages.map((msg) => {
  //           if (msg.id === message.id) {
  //             return {
  //               ...msg,
  //               isSeen: true,
  //             }
  //           }
  //           return msg
  //         })
  //       })
  //     }
  //   })

  //   onNewRoom(appData.socket, async (roomId) => {
  //     const newRoom = await getRoomById(roomId)
  //     setRooms((prevRooms) => [...prevRooms, newRoom])
  //   })

  //   return () => {
  //     appData?.socket?.off(SocketEvents.NewMessage)
  //     appData?.socket?.off(SocketEvents.NewRoom)
  //   }
  // }, [
  //   appData.socket,
  //   currentRoom,
  //   user,
  //   setAppData,
  //   appData,
  //   setRooms,
  //   updateLastMessageInRoom,
  //   resetCountUnreadMessagesOfRoom,
  // ])

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
