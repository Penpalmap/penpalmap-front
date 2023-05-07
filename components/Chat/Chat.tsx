import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'

const Chat = () => {
    return (
        <Box>
            <ChatHeader name="name" photoUrl="photoUrl" status="status" />
            <ChatMessages messages={[]} />

            <ChatInput />
        </Box>
    )
}

export default Chat
