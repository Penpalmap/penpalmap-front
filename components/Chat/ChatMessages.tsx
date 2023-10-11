import { Box, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef, useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import MessageItem from './MessageItem'
import { AppContext } from '../../context/AppContext'
import { onIsTyping } from '../../sockets/socketManager'
import { SocketEvents } from '../../constants/socketEnum'

type Props = {
    messages: Array<Message> | undefined
}

const ChatMessages = ({ messages }: Props) => {
    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    const [otherUserIsTyping, setOtherUserIsTyping] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>(null)

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

    useEffect(() => {
        if (!appData.socket) return

        const handleIsTyping = () => {
            clearTimeout(typingTimeout as NodeJS.Timeout)
            setOtherUserIsTyping(true)

            const newTimeout = setTimeout(() => {
                setOtherUserIsTyping(false)
            }, 3000)

            setTypingTimeout(newTimeout)
        }

        onIsTyping(appData.socket, handleIsTyping)

        return () => {
            appData.socket.off(SocketEvents.IsTyping)
            appData.socket.off(SocketEvents.StopIsTyping)
        }
    }, [appData.socket, typingTimeout])
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
            {otherUserIsTyping && (
                <Box position={'absolute'} bottom={10} left={0} p={4}>
                    <Text fontSize={'small'}>
                        {appData?.userChat?.name} est en train d&apos;écrire...
                    </Text>
                </Box>
            )}
            <Box ref={messagesEndRef} />
        </Box>
    )
}

export default ChatMessages
