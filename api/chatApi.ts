import axios from 'axios'
import { MessageInput, Room } from '../types'

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

const getMessages = async (roomId: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}/messages`
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getRoomOfTwoUsers = async (
    user1Id: string,
    user2Id: string
): Promise<Room> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${user1Id}/${user2Id}`
        )

        return response.data
    } catch (error) {
        return error
    }
}

const updateMessage = async (messageId: string, message: any) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/messages/${messageId}`,
            message
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export { createMessage, getMessages, getRoomOfTwoUsers, updateMessage }
