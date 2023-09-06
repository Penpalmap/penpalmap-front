import { Box, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef } from 'react'
import { useSession } from 'next-auth/react'

type Props = {
    messages: Array<Message> | undefined
}

const ChatMessages = ({ messages }: Props) => {
    const { data: session } = useSession()

    const messagesEndRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const renderMessages = useMemo(() => {
        return messages?.map((message, index) => {
            const isLastMessage = index === messages.length - 1
            const isOwnMessage = session?.user?.id === message.senderId
            const seenText = message.isSeen ? 'Vu' : 'Envoyé'
            return (
                <>
                    <Box
                        key={index}
                        mb={1}
                        bg={isOwnMessage ? 'blue.500' : 'gray.200'}
                        px={3}
                        py={'6px'}
                        borderRadius={'2xl'}
                        alignSelf={isOwnMessage ? 'flex-end' : 'flex-start'}
                        maxW={'70%'}
                    >
                        <Text
                            fontSize={'.8em'}
                            color={isOwnMessage ? 'white' : 'black'}
                        >
                            {message.content}
                        </Text>
                    </Box>
                    {isLastMessage && isOwnMessage && (
                        <Text fontSize={'.6em'} alignSelf="flex-end">
                            {seenText}
                        </Text>
                    )}
                </>
            )
        })
    }, [messages, session?.user?.id])

    return (
        <Box
            flex={1}
            display={'flex'}
            flexDirection={'column'}
            p={2}
            h={'full'}
            overflowY={'scroll'}
        >
            {renderMessages}
            <Box ref={messagesEndRef} />
        </Box>
    )
}

export default ChatMessages
