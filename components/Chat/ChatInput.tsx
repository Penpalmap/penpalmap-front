import { Box, Button, FormControl, Input } from '@chakra-ui/react'
import { set, useForm } from 'react-hook-form'
import { Message, MessageInput, Room } from '../../types'
import { SetStateAction, useContext, useEffect } from 'react'
import { createMessage, getMessages } from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { Socket } from 'socket.io-client'

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
                    type="text"
                    placeholder="Type your message here..."
                    {...register('content', {
                        required: 'Message is empty',
                    })}
                />
                <Button colorScheme="blue" type="submit">
                    Send
                </Button>
            </FormControl>
        </form>
    )
}

export default ChatInput
