import { Box, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef } from 'react'
import { useSession } from 'next-auth/react'

type Props = {
    messages: Array<Message>
}

const ChatMessages = ({ messages }: Props) => {
    const { data: session } = useSession()

    const messagesEndRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const renderMessages = useMemo(() => {
        return messages?.map((message, index) => {
            if (session?.user?.userId === message.sender_id) {
                // OWN MESSAGE
                return (
                    <Box
                        key={index}
                        border={'2px'}
                        bg={'blue.400'}
                        alignSelf={'flex-end'}
                        maxW={'60%'}
                    >
                        <Text>{message.text}</Text>
                    </Box>
                )
            }
            return (
                <Box
                    key={index}
                    border={'2px'}
                    bg={'red.400'}
                    alignSelf={'flex-start'}
                    maxW={'60%'}
                >
                    {message.text}
                </Box>
            )
        })
    }, [messages, session?.user?.userId])

    return (
        <Box flex={1} display={'flex'} flexDirection={'column'} p={2}>
            {renderMessages}
            <Box ref={messagesEndRef} />
        </Box>
    )
}

export default ChatMessages
