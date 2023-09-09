import { Box, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef } from 'react'
import { useSession } from 'next-auth/react'
import MessageItem from './MessageItem'

type Props = {
    messages: Array<Message> | undefined
}

const ChatMessages = ({ messages }: Props) => {
    const { data: session } = useSession()

    const messagesEndRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'auto' })
    }, [messages])

    const renderMessages = useMemo(() => {
        return messages?.map((message, index) => {
            const isLastMessage = index === messages.length - 1
            const isOwnMessage = session?.user?.id === message.senderId
            const seenText = message.isSeen ? 'Vu' : 'Envoyé'
            return (
                <MessageItem
                    key={message.id}
                    content={message.content}
                    isLastMessage={isLastMessage}
                    isOwnMessage={isOwnMessage}
                    seenText={seenText}
                />
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
