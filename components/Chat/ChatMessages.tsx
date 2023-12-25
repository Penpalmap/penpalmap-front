import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import { Message } from '../../types'
import { useEffect, useMemo, useRef, useContext, useState } from 'react'
import { useSession } from './../../hooks/useSession'
import MessageItem from './MessageItem'
import { AppContext } from '../../context/AppContext'
import { onIsTyping, onNewMessage } from '../../sockets/socketManager'
import { SocketEvents } from '../../constants/socketEnum'
import EmptyChatMessages from './EmptyChatMessages'
import { useTranslation } from 'next-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faHome } from '@fortawesome/free-solid-svg-icons'

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
    const { user } = useSession()
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

    const genderFolder = appData?.userChat?.gender || 'other'

    const [arrowDisplay, setArrowDisplay] = useState<boolean>(false)

    useEffect(() => {
        setBottomScrollIsDone(false)
    }, [appData.userChat])

    const checkIfAtBottom = (offsetHeight: number) => {
        if (!chatContainerRef.current) return false

        return (
            chatContainerRef.current.scrollTop +
                chatContainerRef.current.clientHeight >=
            chatContainerRef.current.scrollHeight - offsetHeight
        )
    }

    useEffect(() => {
        if (chatContainerRef.current && messages && messages?.length === 20) {
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
            setBottomScrollIsDone(true)
        }
    }, [appData.userChat, messages])

    useEffect(() => {
        const currentChatContainer = chatContainerRef.current

        if (currentChatContainer) {
            const isAtBottom = checkIfAtBottom(100)

            if (isAtBottom) {
                setTimeout(() => {
                    if (chatContainerRef.current) {
                        chatContainerRef.current.scrollTop =
                            chatContainerRef.current.scrollHeight
                    }
                }, 100)
            }
        }

        const checkScrollBottom = () => {
            if (chatContainerRef.current) {
                const isAtBottom = checkIfAtBottom(0)

                if (isAtBottom) setArrowDisplay(false)
            }
        }

        if (currentChatContainer) {
            currentChatContainer.addEventListener('scroll', checkScrollBottom)
        }

        // Nettoyage de l'effet
        return () => {
            if (currentChatContainer) {
                currentChatContainer.removeEventListener(
                    'scroll',
                    checkScrollBottom
                )
            }
        }
    }, [messages])

    const renderMessages = useMemo(() => {
        return messages?.map((message, index) => {
            const isLastMessage = index === messages.length - 1
            const isOwnMessage = user?.id === message.senderId
            const seenText = message.isSeen ? t('chat.seen') : t('chat.send')

            const isSameSender = lastSenderId.current === message.senderId

            lastSenderId.current = message.senderId

            const image =
                appData?.userChat?.image ??
                `/images/avatar/${genderFolder}/${appData.userChat?.avatarNumber}.png`

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
                            image={(!isSameSender && image) || ''}
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
                    image={(!isSameSender && image) || ''}
                />
            )
        })
    }, [
        appData.userChat?.avatarNumber,
        appData.userChat?.image,
        genderFolder,
        messages,
        user?.id,
        t,
    ])

    useEffect(() => {
        if (!appData.socket) return

        onNewMessage(appData.socket, () => {
            if (chatContainerRef.current) {
                if (chatContainerRef.current) {
                    const isAtBottom = checkIfAtBottom(0)
                    if (!isAtBottom) {
                        setArrowDisplay(true)
                    }
                }
            }
        })

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

    const clickOnArrowNewMessage = () => {
        setArrowDisplay(false)
        if (chatContainerRef.current)
            chatContainerRef.current.scrollTop =
                chatContainerRef.current.scrollHeight
    }

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
                    setOffset(offset + 20)
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
                    image={
                        appData?.userChat?.image ||
                        `/images/avatar/${genderFolder}/${appData?.userChat?.avatarNumber}.png`
                    }
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

            {arrowDisplay && (
                <Button
                    position={'absolute'}
                    bottom={20}
                    left={'50%'}
                    borderRadius={'lg'}
                    transform={'translateX(-50%)'}
                    backgroundColor={'gray.100'}
                    rightIcon={<FontAwesomeIcon icon={faArrowDown} />}
                    onClick={clickOnArrowNewMessage}
                >
                    New message
                </Button>
            )}
        </Box>
    )
}

export default ChatMessages
