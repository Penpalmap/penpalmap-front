import { Box, Button, Text } from '@chakra-ui/react'
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
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { format } from 'date-fns'
import React from 'react'
import useGenderFolder from '../../hooks/useGenderFolder'
import { UserTypingEventDto } from '../../sockets/socketDto'
import MessageIsWriting from './MessageIsWriting'

type Props = {
  messages: Array<Message> | undefined
  isNewChat: boolean
  offset: number
  setOffset: (offset: number) => void
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const currentDate = new Date()

  const sameYear = date.getFullYear() === currentDate.getFullYear()
  const formatString = sameYear ? 'MMMM d' : 'MMMM d, yyyy'

  return format(date, formatString)
}

const ChatMessages = ({ messages, isNewChat, offset, setOffset }: Props) => {
  const { user } = useSession()
  const [appData] = useContext(AppContext)
  const [otherUserIsTyping, setOtherUserIsTyping] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>(
    null as unknown as NodeJS.Timeout
  )

  const sortByDate = (a: Message, b: Message) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  }

  const sortedMessages = useMemo(() => {
    return messages?.sort(sortByDate)
  }, [messages])

  const { t } = useTranslation('common')

  const chatContainerRef = useRef<HTMLDivElement>(null)
  const topMessageRef = useRef<HTMLDivElement>(null)

  const lastSenderId = useRef<string | null>(null)
  const [bottomScrollIsDone, setBottomScrollIsDone] = useState(false)
  const { genderFolder } = useGenderFolder(
    appData?.chatData?.userChat?.gender || ''
  )

  const [arrowDisplay, setArrowDisplay] = useState<boolean>(false)

  useEffect(() => {
    setBottomScrollIsDone(false)
  }, [])

  const checkIfAtBottom = (offsetHeight: number) => {
    if (!chatContainerRef.current) return false

    return (
      chatContainerRef.current.scrollTop +
        chatContainerRef.current.clientHeight >=
      chatContainerRef.current.scrollHeight - offsetHeight
    )
  }

  useEffect(() => {
    if (
      chatContainerRef.current &&
      sortedMessages &&
      sortedMessages?.length === 20
    ) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      setBottomScrollIsDone(true)
    }
  }, [sortedMessages])

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
      } else if (
        sortedMessages &&
        sortedMessages[sortedMessages.length - 1]?.sender?.id === user?.id
      ) {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight
        }
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
        currentChatContainer.removeEventListener('scroll', checkScrollBottom)
      }
    }
  }, [sortedMessages, user?.id, otherUserIsTyping])

  const renderMessages = useMemo(() => {
    let currentDate = ''
    return sortedMessages?.map((message, index) => {
      const isLastMessage = index === sortedMessages.length - 1
      const isOwnMessage = user?.id === message.sender?.id
      const seenText = message.isSeen ? t('chat.seen') : t('chat.send')

      const isSameSender = lastSenderId.current === message.sender?.id
      lastSenderId.current = message.sender?.id ?? null

      // Ajout de cette vérification pour éviter l'erreur de TypeScript
      const previousMessage = index > 0 ? sortedMessages[index - 1] : null
      const posteriorMessage =
        index < sortedMessages.length - 1 ? sortedMessages[index + 1] : null
      const hasPreviousSameSender =
        (previousMessage &&
          previousMessage.sender?.id === message.sender?.id) ??
        false
      const hasNextSameSender =
        (posteriorMessage &&
          posteriorMessage.sender?.id === message.sender?.id) ??
        false

      const image =
        appData?.chatData?.userChat?.image ??
        `/images/avatar/${genderFolder}/${appData?.chatData?.userChat?.avatarNumber}.png`

      const messageDate = formatDate(message.createdAt)

      const showDate =
        !isLastMessage &&
        index > 0 &&
        previousMessage &&
        messageDate !== formatDate(previousMessage.createdAt)

      // if top message, put a ref to scroll to it
      if (index === 0) {
        currentDate = messageDate
        return (
          <Box
            key={message.id}
            ref={topMessageRef}
            display={'flex'}
            flexDirection={'column'}
          >
            <Text textAlign="center" mt={2} mb={2} fontSize="small">
              {currentDate}
            </Text>
            <MessageItem
              key={message.id}
              content={message.content}
              isLastMessage={isLastMessage}
              isOwnMessage={isOwnMessage}
              seenText={seenText}
              image={(!isSameSender && image) || ''}
              timestamp={''}
            />
          </Box>
        )
      }

      if (showDate) {
        currentDate = messageDate
      }

      return (
        <React.Fragment key={message.id}>
          {showDate && (
            <Text textAlign="center" mt={2} mb={2} fontSize="small">
              {currentDate}
            </Text>
          )}
          <MessageItem
            key={message.id}
            content={message.content}
            isLastMessage={isLastMessage}
            isOwnMessage={isOwnMessage}
            seenText={seenText}
            image={(!isSameSender && image) || ''}
            hasPreviousSameSender={hasPreviousSameSender}
            hasNextSameSender={hasNextSameSender}
            timestamp={message.createdAt}
          />
          {otherUserIsTyping && isLastMessage && (
            <MessageIsWriting image={image} />
          )}
        </React.Fragment>
      )
    })
  }, [
    sortedMessages,
    user?.id,
    t,
    appData?.chatData?.userChat?.image,
    appData?.chatData?.userChat?.avatarNumber,
    genderFolder,
    otherUserIsTyping,
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

    const handleIsTyping = (data: UserTypingEventDto) => {
      if (!data.isTyping) {
        setOtherUserIsTyping(false)
      } else {
        if (data.userId !== appData?.chatData?.userChat?.id) return
        clearTimeout(typingTimeout as NodeJS.Timeout)
        setOtherUserIsTyping(true)

        const newTimeout = setTimeout(() => {
          setOtherUserIsTyping(false)
        }, 3000)

        setTypingTimeout(newTimeout)
      }
    }

    onIsTyping(appData.socket, handleIsTyping)

    return () => {
      appData?.socket?.off(SocketEvents.IsTyping)
      appData?.socket?.off(SocketEvents.StopIsTyping)
    }
  }, [appData.socket, appData?.chatData?.userChat?.id, typingTimeout])

  const clickOnArrowNewMessage = () => {
    setArrowDisplay(false)
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
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

      {isNewChat && (
        <EmptyChatMessages
          image={
            appData?.chatData?.userChat?.image ||
            `/images/avatar/${genderFolder}/${appData?.chatData?.userChat?.avatarNumber}.png`
          }
          name={appData?.chatData?.userChat?.name || ''}
        />
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
          {t('chat.newMessage')}
        </Button>
      )}
    </Box>
  )
}

export default ChatMessages
