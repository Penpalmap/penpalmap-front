import { Message, MessageInput, Room } from '../types'
import axiosInstance from '../axiosInstance'

const createMessage = async (message: MessageInput) => {
    try {
        const response = await axiosInstance.post(`/api/messages`, message)

        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getMessages = async (roomId: string): Promise<Message[]> => {
    try {
        const response = await axiosInstance.get(
            `/api/rooms/${roomId}/messages`
        )

        return response.data
    } catch (error) {
        return error
    }
}

const getRoomOfTwoUsers = async (
    user1Id: string,
    user2Id: string
): Promise<Room> => {
    try {
        const response = await axiosInstance.get(
            `/api/rooms/${user1Id}/${user2Id}`
        )

        return response.data
    } catch (error) {
        return error
    }
}

const updateMessage = async (messageId: string, message: Message) => {
    try {
        const response = await axiosInstance.put(
            `/api/messages/${messageId}`,
            message
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

const updateMessageIsReadByRoom = async (roomId: string, userId: string) => {
    try {
        const response = await axiosInstance.put(
            `/api/rooms/${roomId}/messages/users/${userId}/read`
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

const getMessagesByRoomId = async (
    roomId: string,
    limit: number,
    offset: number
) => {
    try {
        const response = await axiosInstance.get(
            `/api/rooms/${roomId}/messages?limit=${limit}&offset=${offset}`
        )

        return response.data
    } catch (error) {
        console.error(error)
    }
}

export {
    createMessage,
    getMessages,
    getRoomOfTwoUsers,
    updateMessage,
    updateMessageIsReadByRoom,
    getMessagesByRoomId,
}
