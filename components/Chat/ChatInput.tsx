import { Box, Button, FormControl, IconButton, Input } from '@chakra-ui/react'
import { set, useForm } from 'react-hook-form'
import { Message, MessageInput, Room } from '../../types'
import { SetStateAction, useContext, useEffect } from 'react'
import { createMessage, getMessages } from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { Socket } from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

type Props = {
    room: Room | null
    setRoom: any
    senderId: string
    addMessage: any
    socket: Socket | null
}

const ChatInput = ({ room, setRoom, senderId, addMessage, socket }: Props) => {
    const { register, handleSubmit, setValue } = useForm<MessageInput>()
    const [appData] = useContext(AppContext)

    useEffect(() => {
        setValue('roomId', room?.id)
        setValue('senderId', senderId)
        setValue('receiverId', appData?.userTarget?.id)
    }, [appData?.userTarget?.id, room?.id, senderId, setValue])

    const onSubmitHandler = async (data: MessageInput) => {
        const newMessage: Message = await createMessage(data)

        socket?.emit('NEW_CHAT_MESSAGE_EVENT', data)
        addMessage(newMessage)
        setValue('content', '')
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl display={'flex'} alignItems={'center'} p={2}>
                <Input
                    background={'gray.100'}
                    borderRadius={'full'}
                    mr={2}
                    type="text"
                    fontSize={'small'}
                    placeholder="Type your message"
                    {...register('content', {
                        required: 'Message is empty',
                    })}
                />
                {/* <Button colorScheme="blue" type="submit">
                    Send
                </Button> */}
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
