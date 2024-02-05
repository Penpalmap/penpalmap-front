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
    const userInfos = await axiosInstance.get(`/api/users/googleId/${googleId}`)

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

const getUsersInMap = async (userId: string): Promise<UserMap[]> => {
  try {
    const users = await axiosInstance.get(`/api/map/users/${userId}`)

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

const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/api/users/${userId}`)

    return response.data
  } catch (error) {
    console.error('Error while deleting user', error)
    throw error
  }
}

const changePassword = async (
  oldPassword: string,
  newPassword: string,
  userId: string
) => {
  try {
    const response = await axiosInstance.put(`/api/users/${userId}/password`, {
      oldPassword,
      newPassword,
    })

    return response.data
  } catch (error) {
    console.error('Error while updating user', error)
    throw error
  }
}

const blockUser = async (userBlockerId: string, userBlockedId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/${userBlockerId}/block/${userBlockedId}`
    )

    return response.data
  } catch (error) {
    console.error('Error while blocking user', error)
    throw error
  }
}

const unblockUser = async (userBlockerId: string, userBlockedId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/${userBlockerId}/unblock/${userBlockedId}`
    )

    return response.data
  } catch (error) {
    console.error('Error while unblocking user', error)
    throw error
  }
}

const getUserBlocked = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}/blocked`)

    return response.data
  } catch (error) {
    console.error('Error while getting blocked users', error)
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
  deleteUser,
  blockUser,
  unblockUser,
  getUserBlocked,
}
