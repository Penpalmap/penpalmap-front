import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useContext, useEffect, useState } from 'react'
import { Message } from '../../types'
import {
    getMessages,
    getRoomOfTwoUsers,
    updateMessage,
} from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import io, { Socket } from 'socket.io-client'

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [roomId, setRoomId] = useState<string>(null)
    const [appData] = useContext(AppContext)
    const { data: session } = useSession()

    // SOCKET.IO
    const [socket, setSocket] = useState<Socket>(null)

    useEffect(() => {
        const getRoomId = async () => {
            const { room } = await getRoomOfTwoUsers(
                session?.user?.id,
                appData.userTarget.id
            )

            setRoomId(room?.room_id)
        }

        if (appData?.userTarget) {
            getRoomId()
        }
    }, [appData.userTarget, session?.user?.id])

    useEffect(() => {
        setMessages([])
        const fetchMessages = async () => {
            const { messages } = await getMessages(roomId)

            const messagesNotRead = messages.filter((message) => {
                return (
                    message.seen === false &&
                    message.sender_id !== session?.user?.id
                )
            })

            if (messagesNotRead.length > 0) {
                messagesNotRead.forEach(async (message) => {
                    await updateMessage(message.message_id, {
                        seen: true,
                    })
                })
            }

            messages && setMessages(messages)
        }

        if (roomId) {
            fetchMessages()
        }
    }, [roomId, session?.user?.id])

    // initialize socket.io
    useEffect(() => {
        if (roomId) {
            const socket = io(process.env.NEXT_PUBLIC_API_URL)
            setSocket(socket)

            socket.emit('join-room', roomId)

            socket.on('NEW_CHAT_MESSAGE_EVENT', (data) => {
                // If the message is yours, don't add it to the state
                if (data.senderId === session?.user?.id) {
                    return
                }
                setMessages((messages) => [...messages, data])
            })
        }
    }, [roomId, session?.user?.id])

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
            <ChatMessages messages={messages} />

            <ChatInput
                roomId={roomId}
                setRoomId={setRoomId}
                senderId={session?.user?.id}
                setMessages={setMessages}
                socket={socket}
            />
        </Box>
    )
}

export default Chat
