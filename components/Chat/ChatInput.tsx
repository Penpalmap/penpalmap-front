import {
  Box,
  FormControl,
  IconButton,
  Input,
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
  const inputRef = useRef<HTMLInputElement | null>(null)
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
      <FormControl display={'flex'} alignItems={'center'} p={2}>
        <Input
          background={'gray.100'}
          borderRadius={'full'}
          mr={2}
          type="text"
          fontSize={'small'}
          placeholder={t('chat.typeMessage')}
          {...register('content', {
            required: 'Message is empty',
          })}
          ref={(e) => {
            ref(e)
            inputRef.current = e
          }}
          autoComplete="off"
        />

        <IconButton
          ref={btnRef}
          borderRadius={'full'}
          colorScheme="gray"
          color={'gray.300'}
          size={'sm'}
          variant={'outline'}
          aria-label="Open emoji picker"
          icon={<FontAwesomeIcon icon={faFaceSmile} />}
          onClick={onToggle}
          marginRight={2}
        />

        {isOpen && (
          <Box
            position="absolute"
            zIndex="popover"
            bottom="60px"
            right={'10px'}
          >
            <EmojiPicker
              onEmojiSelect={(emoji) => {
                const newValue = content + emoji.native
                setValue('content', newValue)
              }}
              previewPosition="none"
            />
          </Box>
        )}

        <IconButton
          borderRadius={'full'}
          colorScheme="blue"
          type="submit"
          aria-label="Search database"
          icon={<FontAwesomeIcon icon={faPaperPlane} />}
        />
      </FormControl>
    </form>
  )
}

export default ChatInput
