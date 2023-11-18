import { Box, Spinner, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef, useContext, useState } from 'react'
import { useSession } from 'next-auth/react'
import MessageItem from './MessageItem'
import { AppContext } from '../../context/AppContext'
import { onIsTyping } from '../../sockets/socketManager'
import { SocketEvents } from '../../constants/socketEnum'
import EmptyChatMessages from './EmptyChatMessages'
import { useTranslation } from 'next-i18next'

type Props = {
    messages: Array<Message> | undefined
    isNewChat: boolean
    offset: number
    setOffset: (offset: number) => void
    isLoading: boolean
}

const ChatMessages = ({
    messages,
    isNewChat,
    offset,
    setOffset,
    isLoading,
}: Props) => {
    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    const [otherUserIsTyping, setOtherUserIsTyping] = useState(false)
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>(
        null as any
    )

    const { t } = useTranslation('common')

    const chatContainerRef = useRef<HTMLDivElement>(null)
    const topMessageRef = useRef<HTMLDivElement>(null)

    const lastSenderId = useRef<string | null>(null)
    const [bottomScrollIsDone, setBottomScrollIsDone] = useState(false)

    useEffect(() => {
        setBottomScrollIsDone(false)
    }, [appData.userChat])

    useEffect(() => {
        // scroll to bottom when new userChat
        if (chatContainerRef.current && messages && messages?.length === 15) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
            setBottomScrollIsDone(true)
        }
    }, [appData.userChat, messages, messages?.length])

    const renderMessages = useMemo(() => {
        return messages?.map((message, index) => {
            const isLastMessage = index === messages.length - 1
            const isOwnMessage = session?.user?.id === message.senderId
            const seenText = message.isSeen ? t('chat.seen') : t('chat.send')

            const isSameSender = lastSenderId.current === message.senderId

            lastSenderId.current = message.senderId

            // if top message, put a ref to scroll to it
            if (index === 0) {
                return (
                    <Box
                        key={message.id}
                        ref={topMessageRef}
                        display={'flex'}
                        flexDirection={'column'}
                    >
                        <MessageItem
                            key={message.id}
                            content={message.content}
                            isLastMessage={isLastMessage}
                            isOwnMessage={isOwnMessage}
                            seenText={seenText}
                            image={
                                (!isSameSender && appData?.userChat?.image) ||
                                ''
                            }
                        />
                    </Box>
                )
            }
            return (
                <MessageItem
                    key={message.id}
                    content={message.content}
                    isLastMessage={isLastMessage}
                    isOwnMessage={isOwnMessage}
                    seenText={seenText}
                    image={(!isSameSender && appData?.userChat?.image) || ''}
                />
            )
        })
    }, [appData?.userChat?.image, messages, session?.user?.id])

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
            onScroll={(e) => {
                const element = e.target as HTMLDivElement
                if (element.scrollTop === 0 && bottomScrollIsDone) {
                    setOffset(offset + 15)
                    if (topMessageRef.current) {
                        topMessageRef.current.scrollIntoView({
                            behavior: 'auto',
                        })
                    }
                }
            }}
            ref={chatContainerRef}
        >
            {renderMessages}

            {isLoading && (
                <Spinner size={'sm'} position={'absolute'} top={2} left={2} />
            )}

            {isNewChat && (
                <EmptyChatMessages
                    image={appData?.userChat?.image || ''}
                    name={appData?.userChat?.name || ''}
                />
            )}
            {otherUserIsTyping && (
                <Box position={'absolute'} bottom={10} left={0} p={4}>
                    <Text fontSize={'small'}>
                        {appData?.userChat?.name} {t('chat.IsTyping')}
                    </Text>
                </Box>
            )}
            {/* <Box ref={messagesEndRef} /> */}
        </Box>
    )
}

export default ChatMessages
