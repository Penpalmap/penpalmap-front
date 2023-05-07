import axios from 'axios'
import { Message, MessageInput } from '../types'

const createMessage = async (message: MessageInput) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages`,
        message
    )

    return response.data
}

const getMessages = async (roomId: string) => {
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
