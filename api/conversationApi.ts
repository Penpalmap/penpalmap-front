import axios from 'axios'
import { Room } from '../types'

type ConversationResponse = {
    rooms: Array<Room>
}

const getRooms = async (
    userId: string
): Promise<ConversationResponse | null> => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/rooms`
        )
        return response.data
    } catch (error) {
        console.error(error)
        return null
    }
}

export { getRooms }
