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
                        mb={1}
                        key={index}
                        bg={'blue.500'}
                        px={3}
                        py={'6px'}
                        borderRadius={'2xl'}
                        alignSelf={'flex-end'}
                        maxW={'70%'}
                    >
                        <Text fontSize={'.8em'} color={'white'}>
                            {message.text}
                        </Text>
                    </Box>
                )
            }
            return (
                <Box
                    key={index}
                    mb={1}
                    bg={'gray.200'}
                    px={3}
                    py={'6px'}
                    borderRadius={'2xl'}
                    alignSelf={'flex-start'}
                    maxW={'70%'}
                >
                    <Text fontSize={'.8em'}>{message.text}</Text>{' '}
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
