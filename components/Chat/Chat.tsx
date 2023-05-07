import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { useEffect, useState } from 'react'
import { Message } from '../../types'
import { getMessages } from '../../api/chatApi'

type Props = {
    roomId: string
}

const Chat = ({ roomId }: Props) => {
    const [messages, setMessages] = useState<Message[]>([])

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
                name="Colin"
                photoUrl="https://media.licdn.com/dms/image/D4E03AQE0Xtk2AYoDjQ/profile-displayphoto-shrink_800_800/0/1678535679471?e=2147483647&v=beta&t=WCN4Pm5xV1gd-Wj3QRMX744nIDIzTc8T4ZP-4VY1tjY"
                status="online"
            />
            <ChatMessages messages={messages} />

            <ChatInput roomId={null} senderId="012" />
        </Box>
    )
}

export default Chat
