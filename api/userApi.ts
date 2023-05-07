import axios from 'axios'

const getUserByEmail = async (email: string) => {
    try {
        const userInfos = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/email/${email}`
        )

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by email', error)
        throw error
    }
}

const getUserById = async (id: string) => {
    try {
        const userInfos = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
        )

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by id', error)
        throw error
    }
}

const getUsersInMap = async () => {
    try {
        const users = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/map/users`
        )

        return users.data
    } catch (error) {
        console.error('Error while getting users in map', error)
        throw error
    }
}

export { getUserByEmail, getUserById, getUsersInMap }
