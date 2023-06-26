import { FormControl, IconButton, Input } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { MessageInput, Room } from '../../types'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Socket } from 'socket.io-client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

type Props = {
    room: Room | null
    senderId: string
    socket: Socket | null
    sendMessage: (data: MessageInput) => void
}

const ChatInput = ({ room, senderId, sendMessage }: Props) => {
    const { register, handleSubmit, setValue } = useForm<MessageInput>()
    const [appData] = useContext(AppContext)

    useEffect(() => {
        setValue('roomId', room?.id)
        setValue('senderId', senderId)
        setValue('receiverId', appData?.userTarget?.id)
    }, [appData?.userTarget?.id, room?.id, senderId, setValue])

    const onSubmitHandler = async (data: MessageInput) => {
        sendMessage(data)
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
