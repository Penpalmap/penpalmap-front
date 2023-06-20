import axios from 'axios'

const getConversations = async (userId: string) => {
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

export { getConversations }
