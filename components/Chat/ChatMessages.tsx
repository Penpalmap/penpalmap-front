import { Box } from '@chakra-ui/react'
import { Message } from '../../types'

type Props = {
    messages: Array<Message>
}

const ChatMessages = ({ messages }: Props) => {
    return (
        <Box flex={1}>
            <Box>ChatConversations</Box>
        </Box>
    )
}

export default ChatMessages
