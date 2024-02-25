import {
  Box,
  Flex,
  FormControl,
  IconButton,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MessageInput, Room } from '../../types'
import { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { isTyping } from '../../sockets/socketManager'
import { useTranslation } from 'next-i18next'
import EmojiPicker from '@emoji-mart/react'

type Props = {
  room: Room | null
  senderId: string
  sendMessage: (data: MessageInput) => void
}

const ChatInput = ({ room, senderId, sendMessage }: Props) => {
  const { register, handleSubmit, setValue, watch } = useForm<MessageInput>()
  const [appData] = useContext(AppContext)
  const content = watch('content')
  const { ref } = register('content')
  const inputRef = useRef<HTMLTextAreaElement | null>(null)
  const { t } = useTranslation('common')
  const { isOpen, onToggle } = useDisclosure()
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!appData?.userChat?.id) return

    setValue('roomId', room?.id)
    setValue('senderId', senderId)
    setValue('receiverId', appData?.userChat?.id)
    setValue('content', '')
    inputRef?.current?.focus()
  }, [appData?.userChat?.id, room?.id, senderId, setValue])

  const onSubmitHandler = async (data: MessageInput) => {
    sendMessage(data)
    setValue('content', '')
    if (inputRef.current) {
      inputRef.current.style.minHeight = '10px'
    }
  }

  const [lastTypingTime, setLastTypingTime] = useState<number | null>(null)

  useEffect(() => {
    if (content && appData?.socket && appData?.userChat?.id) {
      const currentTime = Date.now()
      if (!lastTypingTime || currentTime - lastTypingTime >= 3000) {
        isTyping(appData.socket, {
          receiverId: appData.userChat.id,
          senderId: senderId,
          roomId: room?.id,
          content: content,
        })
        setLastTypingTime(currentTime)
      }
    }
  }, [
    appData.socket,
    appData?.userChat?.id,
    content,
    room?.id,
    senderId,
    lastTypingTime,
  ])

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <FormControl display={'flex'} alignItems={'end'} p={2}>
        <Flex
          backgroundColor={'gray.100'}
          flex={1}
          borderRadius={'3xl'}
          alignItems={'end'}
        >
          <Textarea
            className="auto-resizable"
            background={'gray.100'}
            minHeight={'10px'}
            borderRadius={'full'}
            variant="Unstyled"
            backgroundColor={'gray.100'}
            fontSize={'.9em'}
            placeholder={t('chat.typeMessage')}
            {...register('content', {
              required: 'Message is empty',
            })}
            ref={(e) => {
              ref(e)
              inputRef.current = e
            }}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleSubmit(onSubmitHandler)()
              }
            }}
            style={{ resize: 'none' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              const minRows = 1
              const lineHeight = 2
              const scrollHeight = target.scrollHeight

              if (scrollHeight > lineHeight) {
                target.style.height = 'auto'
                target.style.height = `${scrollHeight}px`
              } else {
                target.style.height = `${minRows * lineHeight}px`
              }
            }}
          />

          <IconButton
            ref={btnRef}
            color={'teal'}
            colorScheme="white"
            size={'lg'}
            aria-label="Open emoji picker"
            icon={<FontAwesomeIcon icon={faFaceSmile} />}
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          />

          {isOpen && (
            <Box
              position="absolute"
              zIndex="popover"
              bottom="60px"
              right={'10px'}
            >
              <EmojiPicker
                onClickOutside={onToggle}
                onEmojiSelect={(emoji) => {
                  const newValue = content + emoji.native
                  setValue('content', newValue)
                }}
                previewPosition="none"
              />
            </Box>
          )}
        </Flex>
        <IconButton
          borderRadius={'full'}
          color={'teal'}
          colorScheme="white"
          size={'lg'}
          mr={2}
          type="submit"
          aria-label="Search database"
          icon={<FontAwesomeIcon icon={faPaperPlane} />}
        />
      </FormControl>
    </form>
  )
}

export default ChatInput
