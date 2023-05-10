import { Box, Button, FormControl, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Message, MessageInput } from '../../types'
import { SetStateAction, useContext, useEffect } from 'react'
import { createMessage, getMessages } from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'
import { Socket } from 'socket.io-client'

type Props = {
    roomId: string
    setRoomId: any
    senderId: string
    setMessages: any
    socket: Socket
}

const ChatInput = ({
    roomId,
    setRoomId,
    senderId,
    setMessages,
    socket,
}: Props) => {
    const { register, handleSubmit, setValue } = useForm<MessageInput>()
    const [appData] = useContext(AppContext)

    useEffect(() => {
        setValue('roomId', roomId)
        setValue('senderId', senderId)
        setValue('receiverId', appData?.userTarget?.user_id)
    }, [appData?.userTarget?.user_id, roomId, senderId, setValue])

    const onSubmitHandler = async (data: MessageInput) => {
        const messageResult = await createMessage(data)

        if (!roomId) {
            setRoomId(messageResult.roomId)
            socket?.emit('join-room', messageResult.roomId)
            // const { messages } = await getMessages(messageResult.roomId)
            // messages && setMessages(messages as Message[])
        } else {
            socket?.emit('join-room', roomId)
            socket?.emit('NEW_CHAT_MESSAGE_EVENT', data)
            const { messages } = await getMessages(roomId)
            messages && setMessages(messages as Message[])
        }
        setValue('text', '')
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl display={'flex'} alignItems={'center'} p={2}>
                <Input
                    type="text"
                    name="message"
                    placeholder="Type your message here..."
                    {...register('text', {
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
