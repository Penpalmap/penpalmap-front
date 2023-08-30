import { useCallback, useContext, useEffect, useState } from 'react'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput, Room } from '../types'
import { useSession } from 'next-auth/react'
import { createMessage, getRoomOfTwoUsers } from '../api/chatApi'
import useRooms from './useRooms'
import { AppContext } from '../context/AppContext'
import {
    leaveRoom,
    onNewMessage,
    sendMessageSocket,
    socket,
} from '../sockets/socketManager'
import dayjs from 'dayjs'

const useChat = () => {
    const [room, setRoom] = useState<Room | null>(null)
    const { data: session } = useSession()
    const { refetch } = useRooms()
    const [appData, setAppData] = useContext(AppContext)

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
        }
    }, [appData.userChat, session?.user?.id])

    const connectToRoom = useCallback((roomId: string) => {
        socket.emit(SocketEvents.JoinRoom, roomId)
    }, [])

    const disconnectFromRoom = useCallback((roomId: string) => {
        leaveRoom(roomId)
        socket.disconnect()
    }, [])

    const addMessageToRoom = useCallback(
        async (message: Message) => {
            setRoom((prevRoom) => {
                if (prevRoom) {
                    // La room existe, donc nous pouvons la mettre à jour
                    return {
                        ...prevRoom,
                        messages: [...prevRoom.messages, message],
                    }
                } else {
                    // La room n'existe pas, donc nous devons la créer avec le message initial
                    const newRoom: Room = {
                        id: message.roomId,
                        members: [],
                        messages: [message],
                        countUnreadMessages: '0',
                        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                        UserRoom: null,
                    }

                    return newRoom
                }
            })

            setAppData({
                ...appData,
                rooms: appData.rooms.map((room) => {
                    if (room?.UserRoom?.roomId === message.roomId) {
                        return {
                            ...room,
                            messages: [message],
                        }
                    }
                    return room
                }),
            })
        },
        [appData, setAppData]
    )

    const sendMessage = useCallback(
        async (message: MessageInput) => {
            const newMessage: Message = await createMessage(message)
            if (newMessage.isNewRoom) {
                refetch()
            }

            sendMessageSocket(newMessage)
            addMessageToRoom(newMessage)
        },
        [addMessageToRoom, refetch]
    )

    useEffect(() => {
        onNewMessage((message) => {
            if (message.senderId !== session?.user?.id) {
                addMessageToRoom(message)
            }
        })

        return () => {
            socket.off(SocketEvents.JoinRoom)
            socket.off(SocketEvents.LeaveRoom)
            socket.off(SocketEvents.NewMessage)
        }
    }, [addMessageToRoom, session?.user?.id])

    return {
        messages: room?.messages,
        connectToRoom,
        disconnectFromRoom,
        sendMessage,
        room,
        addMessageToRoom,
    }
}

export default useChat
