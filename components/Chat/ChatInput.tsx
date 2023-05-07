import { Box, Button, FormControl, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MessageInput } from '../../types'
import { useContext, useEffect } from 'react'
import { createMessage } from '../../api/chatApi'
import { AppContext } from '../../context/AppContext'

type Props = {
    roomId: string
    senderId: string
}

const ChatInput = ({ roomId, senderId }: Props) => {
    const { register, handleSubmit, setValue } = useForm<MessageInput>()
    const [appData] = useContext(AppContext)

    useEffect(() => {
        setValue('roomId', roomId)
        setValue('senderId', senderId)
        setValue('receiverId', appData?.userTarget?.user_id)
    }, [appData?.userTarget?.user_id, roomId, senderId, setValue])

    const onSubmitHandler = async (data: MessageInput) => {
        console.log(data)
        debugger
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
