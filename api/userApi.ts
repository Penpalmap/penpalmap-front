import axios from 'axios'
import { User } from '../types'

const getUserByEmail = async (email: string): Promise<User> => {
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

const getUserByGoogleId = async (googleId: string): Promise<User> => {
    try {
        const userInfos = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/googleId/${googleId}`
        )

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by googleId', error)
        throw error
    }
}

const getUserById = async (id: string): Promise<User> => {
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

const getUsersInMap = async (): Promise<User[]> => {
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

const updateUser = async (user: any, userId: string) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
            user
        )

        return response.data
    } catch (error) {
        console.error('Error while updating user', error)
        throw error
    }
}

export {
    getUserByEmail,
    getUserById,
    getUsersInMap,
    getUserByGoogleId,
    updateUser,
}
