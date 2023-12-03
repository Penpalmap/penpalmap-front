import { useCallback, useContext, useEffect, useState } from 'react'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput, Room } from '../types'
import { useSession } from 'next-auth/react'
import {
    createMessage,
    getMessagesByRoomId,
    getRoomOfTwoUsers,
    updateMessageIsReadByRoom,
} from '../api/chatApi'
import { AppContext } from '../context/AppContext'
import {
    onNewMessage,
    onSeenMessage,
    sendMessageSeen,
    sendMessageSocket,
} from '../sockets/socketManager'
import { useRoom } from '../context/RoomsContext'

const useChat = () => {
    const [room, setRoom] = useState<Room | null>(null)
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [offset, setOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [roomIsLoading, setRoomIsLoading] = useState(true)
    const { updateLastMessageInRoom } = useRoom()

    useEffect(() => {
        const fetchRoom = async () => {
            if (session?.user?.id) {
                const room = await getRoomOfTwoUsers(
                    session?.user?.id,
                    appData.userChat.id
                )

                setRoom(room)
                setIsLoading(false) // Mettre fin au chargement lorsque les informations sont disponibles.
            }
        }

        if (appData?.userChat) {
            setRoomIsLoading(true)
            fetchRoom()

            setMessages([])
            setOffset(0)
        }
    }, [appData.userChat, session?.user?.id])

    const initialFetchMessages = useCallback(async () => {
        if (room) {
            const messagesData = await getMessagesByRoomId(room.id, 20, 0)
            setMessages(messagesData)
            setIsLoading(false)
            setRoomIsLoading(false)
        }
    }, [room])

    useEffect(() => {
        initialFetchMessages()
    }, [initialFetchMessages, room])

    const additonalFetchMessages = useCallback(async () => {
        if (appData?.userChat && room && !roomIsLoading) {
            const messagesData = await getMessagesByRoomId(room.id, 20, offset)

            setMessages((prevMessages) => [...messagesData, ...prevMessages])
            setIsLoading(false) // Mettre fin au chargement lorsque les messages sont chargés.
        }
    }, [appData?.userChat, room, roomIsLoading, offset])

    useEffect(() => {
        if (offset > 0) {
            additonalFetchMessages()
        }
    }, [additonalFetchMessages, offset])

    const addMessageToRoom = useCallback(
        async (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message])

            updateLastMessageInRoom(message)
        },
        [updateLastMessageInRoom]
    )

    const sendMessage = useCallback(
        async (message: MessageInput) => {
            const newMessage: Message = await createMessage(message)
            if (newMessage.isNewRoom) {
            }

            newMessage.receiverId = message.receiverId

            sendMessageSocket(appData.socket, newMessage)
            addMessageToRoom(newMessage)
        },
        [addMessageToRoom, appData.socket]
    )

    useEffect(() => {
        if (!appData.socket) return
        onNewMessage(appData.socket, async (message) => {
            if (message.senderId !== session?.user?.id && room) {
                addMessageToRoom(message)

                if (appData.chatOpen) {
                    await updateMessageIsReadByRoom(room.id, message.senderId)
                    sendMessageSeen(appData.socket, message)
                }
            }
        })

        onSeenMessage(appData.socket, async (message) => {
            if (message.senderId === session?.user?.id && room) {
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

                setAppData({
                    ...appData,
                    rooms: appData.rooms.map((room) => {
                        if (room?.UserRoom?.roomId === message.roomId) {
                            return {
                                ...room,
                                messages: room.messages.map((msg) => {
                                    if (msg.id === message.id) {
                                        return {
                                            ...msg,
                                            isSeen: true,
                                        }
                                    }
                                    return msg
                                }),
                            }
                        }
                        return room
                    }),
                })
            }
        })

        return () => {
            appData.socket.off(SocketEvents.NewMessage)
        }
    }, [
        addMessageToRoom,
        appData,
        appData.socket,
        room,
        session?.user?.id,
        setAppData,
    ])

    return {
        messages: messages,
        sendMessage,
        room,
        addMessageToRoom,
        offset,
        setOffset,
        isLoading,
        additonalFetchMessages,
    }
}

export default useChat
