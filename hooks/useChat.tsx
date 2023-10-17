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

    const { updateLastMessageInRoom } = useRoom()

    useEffect(() => {
        const fetchRoom = async () => {
            if (session?.user?.id) {
                const room = await getRoomOfTwoUsers(
                    session?.user?.id,
                    appData.userChat.id
                )

                setRoom(room)
            }
        }

        if (appData?.userChat) {
            fetchRoom()
            setMessages([])
            setOffset(0)
        }
    }, [appData.userChat, session?.user?.id])

    useEffect(() => {
        const fetchMessages = async () => {
            if (room) {
                console.log('fetching messages', offset)
                const messages = await getMessagesByRoomId(room.id, 15, offset)
                setMessages((prevMessages) => [...prevMessages, ...messages])
            }
        }

        fetchMessages()
    }, [offset, room])

    const addMessageToRoom = useCallback(
        async (message: Message) => {
            // setRoom((prevRoom) => {
            //     if (prevRoom) {
            //         // La room existe, donc nous pouvons la mettre à jour
            //         return {
            //             ...prevRoom,
            //             messages: [...prevRoom.messages, message],
            //         }
            //     } else {
            //         // La room n'existe pas, donc nous devons la créer avec le message initial
            //         const newRoom: Room = {
            //             id: message.roomId,
            //             members: [],
            //             messages: [message],
            //             countUnreadMessages: '0',
            //             createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            //             updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            //             UserRoom: null,
            //         }

            //         return newRoom
            //     }
            // })

            setMessages((prevMessages) => [...prevMessages, message])

            updateLastMessageInRoom(message)

            // setAppData({
            //     ...appData,
            //     rooms: appData.rooms.map((room) => {
            //         if (room?.UserRoom?.roomId === message.roomId) {
            //             return {
            //                 ...room,
            //                 messages: [message],
            //             }
            //         }
            //         return room
            //     }),
            // })
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
                // change isSeen for message
                setRoom((prevRoom) => {
                    if (prevRoom) {
                        // La room existe, donc nous pouvons la mettre à jour
                        return {
                            ...prevRoom,
                            messages: prevRoom.messages.map((msg) => {
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
                    return prevRoom
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
            // socket.off(SocketEvents.JoinRoom)
            // socket.off(SocketEvents.LeaveRoom)
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
    }
}

export default useChat
