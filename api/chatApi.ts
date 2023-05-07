import axios from 'axios'
import { Message, MessageInput } from '../types'

const createMessage = async (message: MessageInput) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
            message
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getMessages = async (roomId: string): Promise<Message[] | void> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/room/${roomId}/messages`
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export { createMessage, getMessages }
