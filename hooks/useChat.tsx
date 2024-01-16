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
    const [room, setRoom] = useState<Room | null>(null)
    const { user } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const [messages, setMessages] = useState<Message[]>([])
    const [offset, setOffset] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [roomIsLoading, setRoomIsLoading] = useState(true)
    const { updateLastMessageInRoom, setRooms } = useRoom()

    useEffect(() => {
        const fetchRoom = async () => {
            if (user?.id) {
                const room = await getRoomOfTwoUsers(
                    user.id,
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
    }, [appData.userChat, user])

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
            if (
                message.senderId === appData.userChat.id ||
                message.senderId === user?.id
            ) {
                setMessages((prevMessages) => [...prevMessages, message])
            }

            updateLastMessageInRoom(message)
        },
        [appData.userChat?.id, updateLastMessageInRoom, user?.id]
    )

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
                setRooms((prevRooms) => [...prevRooms, room])
            }

            newMessage.receiverId = message.receiverId

            sendMessageSocket(appData.socket, newMessage)
            addMessageToRoom(newMessage)
        },
        [addMessageToRoom, appData.socket, setRooms]
    )

    useEffect(() => {
        if (!appData.socket) return
        onNewMessage(appData.socket, async (message) => {
            if (message.senderId !== user?.id && room) {
                addMessageToRoom(message)

                if (appData.chatOpen) {
                    await updateMessageIsReadByRoom(room.id, message.senderId)
                    sendMessageSeen(appData.socket, message)
                }
            }
        })

        onSeenMessage(appData.socket, async (message) => {
            if (message.senderId === user?.id && room) {
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

        onNewRoom(appData.socket, async (roomId) => {
            const newRoom = await getRoomById(roomId)
            // addRoomToRooms(newRoom)
            setRooms((prevRooms) => [...prevRooms, newRoom])
        })

        return () => {
            appData.socket.off(SocketEvents.NewMessage)
        }
    }, [
        addMessageToRoom,
        appData.socket,
        room,
        user,
        setAppData,
        appData,
        setRooms,
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
