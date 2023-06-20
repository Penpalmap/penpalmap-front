import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useCallback, useContext, useEffect, useState } from 'react'
import { Message, Room } from '../../types'
import {
    getMessages,
    getRoomOfTwoUsers,
    updateMessage,
} from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import io, { Socket } from 'socket.io-client'
import useConversations from '../../hooks/useConversations'

const Chat = () => {
    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    const [room, setRoom] = useState<Room | null>(null)
    const [socket, setSocket] = useState<Socket | null>(null)
    const { refetch } = useConversations()
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

    const addMessage = useCallback(
        (message: Message) => {
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
                    refetch()

                    return newRoom
                }
            })
        },
        [refetch]
    )

    useEffect(() => {
        if (room) {
            const socket = io(process.env.NEXT_PUBLIC_API_URL)
            setSocket(socket)

            socket.emit('join-room', room.id)

            socket.on('NEW_CHAT_MESSAGE_EVENT', (data) => {
                if (data.senderId !== session?.user?.id) {
                    addMessage(data)
                }
            })

            return () => {
                socket.emit('leave-room', room.id)
                socket.disconnect()
            }
        }
    }, [addMessage, room, session?.user?.id])

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <ChatHeader
                name={appData?.userTarget?.name}
                photoUrl={
                    appData?.userTarget?.image ||
                    'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg'
                }
                status="online"
            />
            <ChatMessages messages={room?.messages} />

            {session?.user?.id && (
                <ChatInput
                    room={room}
                    setRoom={setRoom}
                    addMessage={addMessage}
                    socket={socket}
                    senderId={session?.user?.id}
                />
            )}
        </Box>
    )
}

export default Chat
