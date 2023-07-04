import { useCallback, useContext, useEffect, useState } from 'react'
import socket from '../utils/socket'
import { SocketEvents } from '../constants/socketEnum'
import { Message, MessageInput, Room } from '../types'
import { useSession } from 'next-auth/react'
import { createMessage, getRoomOfTwoUsers } from '../api/chatApi'
import useConversations from './useConversations'
import { AppContext } from '../context/AppContext'

const useChat = () => {
    const [room, setRoom] = useState<Room | null>(null)
    const { data: session } = useSession()
    const { refetch } = useConversations()
    const [appData] = useContext(AppContext)

    useEffect(() => {
        const fetchRoom = async () => {
            if (session?.user?.id) {
                const room = await getRoomOfTwoUsers(
                    session?.user?.id,
                    appData.userTarget.id
                )

                setRoom(room)
            }
        }

        if (appData?.userTarget) {
            fetchRoom()
        }
    }, [appData.userTarget, session?.user?.id])

    const connectToRoom = useCallback((roomId: string) => {
        socket.emit(SocketEvents.JoinRoom, roomId)
    }, [])

    const disconnectFromRoom = useCallback((roomId: string) => {
        socket.emit(SocketEvents.LeaveRoom, roomId)
        socket.disconnect()
    }, [])

    const addMessageToRoom = useCallback(async (message: Message) => {
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
                }

                return newRoom
            }
        })
    }, [])

    const sendMessage = useCallback(
        async (message: MessageInput) => {
            const newMessage: Message = await createMessage(message)
            refetch()
            socket.emit(SocketEvents.NewMessage, message)

            addMessageToRoom(newMessage)
        },
        [addMessageToRoom, refetch]
    )

    useEffect(() => {
        socket.on(SocketEvents.NewMessage, (message: Message) => {
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
