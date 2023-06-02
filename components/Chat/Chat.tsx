import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useContext, useEffect, useState } from 'react'
import { Message } from '../../types'
import { getMessages, getRoomOfTwoUsers } from '../../api/chatApi'
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
                appData.userTarget.user_id,
                session?.user?.userId
            )
            setRoomId(room?.room_id)
        }

        if (appData?.userTarget) {
            getRoomId()
        }
    }, [appData.userTarget, session?.user?.userId])

    useEffect(() => {
        setMessages([])
        const fetchMessages = async () => {
            const { messages } = await getMessages(roomId)
            messages && setMessages(messages)
            console.log(messages)
        }

        if (roomId) {
            fetchMessages()
        }
    }, [roomId])

    // initialize socket.io
    useEffect(() => {
        if (roomId) {
            const socket = io(process.env.NEXT_PUBLIC_API_URL)
            setSocket(socket)

            socket.emit('join-room', roomId)

            socket.on('NEW_CHAT_MESSAGE_EVENT', (data) => {
                // If the message is yours, don't add it to the state
                if (data.senderId === session?.user?.userId) {
                    return
                }
                setMessages((messages) => [...messages, data])
            })
        }
    }, [roomId, session?.user?.userId])

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <ChatHeader
                name={appData?.userTarget?.name}
                photoUrl={
                    appData?.userTarget?.img_small ||
                    'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg'
                }
                status="online"
            />
            <ChatMessages messages={messages} />

            <ChatInput
                roomId={roomId}
                setRoomId={setRoomId}
                senderId={session?.user?.userId}
                setMessages={setMessages}
                socket={socket}
            />
        </Box>
    )
}

export default Chat
