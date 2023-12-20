import { User, UserMap } from '../types'
import axiosInstance from '../axiosInstance'

const getUserByEmail = async (email: string): Promise<User> => {
    try {
        const userInfos = await axiosInstance.get(`/api/users/email/${email}`)

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by email', error)
        throw error
    }
}

const getUserByGoogleId = async (googleId: string): Promise<User> => {
    try {
        const userInfos = await axiosInstance.get(
            `/api/users/googleId/${googleId}`
        )

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by googleId', error)
        throw error
    }
}

const getUserById = async (id: string): Promise<User> => {
    try {
        const userInfos = await axiosInstance.get(`/api/users/${id}`)

        return userInfos.data
    } catch (error) {
        console.error('Error while getting user by id', error)
        throw error
    }
}

const getUsersInMap = async (): Promise<UserMap[]> => {
    try {
        const users = await axiosInstance.get(`/api/map/users`)

        return users.data
    } catch (error) {
        console.error('Error while getting users in map', error)
        throw error
    }
}

const updateUser = async (user: any, userId: string) => {
    try {
        const response = await axiosInstance.put(`/api/users/${userId}`, user)

        return response.data
    } catch (error) {
        console.error('Error while updating user', error)
        throw error
    }
}

const changePassword = async (
    oldPassword: string,
    newPassword: string,
    userId: string
) => {
    try {
        const response = await axiosInstance.put(
            `/api/users/${userId}/password`,
            { oldPassword, newPassword }
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
    changePassword,
}
