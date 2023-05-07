import { Box, Button, FormControl, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MessageInput } from '../../types'
import { useEffect } from 'react'
import { createMessage } from '../../api/chatApi'

type Props = {
    roomId: string
    senderId: string
}

const ChatInput = ({ roomId, senderId }: Props) => {
    const { register, handleSubmit } = useForm<MessageInput>()

    useEffect(() => {
        register('roomId', { value: roomId })
        register('senderId', { value: senderId })
    }, [register, roomId, senderId])

    const onSubmitHandler = async (data: MessageInput) => {
        console.log(data)
        const response = await createMessage(data)
        console.log(response)
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <FormControl display={'flex'} alignItems={'center'} p={2}>
                <Input
                    type="text"
                    name="message"
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
