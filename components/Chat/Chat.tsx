import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useContext, useEffect, useState } from 'react'
import { Message } from '../../types'
import { getMessages, getRoomOfTwoUsers } from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'

const Chat = () => {
    const [messages, setMessages] = useState<Message[]>([])
    const [roomId, setRoomId] = useState<string>(null)
    const [appData] = useContext(AppContext)
    const { data: session } = useSession()

    console.log('session', session?.user?.userId)

    console.log('appData', appData)
    useEffect(() => {
        const getRoomId = async () => {
            const roomId = await getRoomOfTwoUsers(
                appData.userTarget.user_id,
                session?.user?.userId
            )
            setRoomId(roomId)

            console.log('roomId', roomId)
        }

        if (appData?.userTarget) {
            getRoomId()
        }
    }, [appData, session?.user?.userId])

    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getMessages(roomId)
            data && setMessages(data)
        }

        if (roomId) fetchMessages()
    }, [roomId])

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <ChatHeader
                name={appData?.userTarget?.name}
                photoUrl={appData?.userTarget?.img_small}
                status="online"
            />
            <ChatMessages messages={messages} />

            <ChatInput roomId={null} senderId={session?.user?.userId} />
        </Box>
    )
}

export default Chat
