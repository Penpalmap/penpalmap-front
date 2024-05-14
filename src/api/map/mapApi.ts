import axiosInstance from '../axiosInstance'
import { UserMap } from '../../types'

const getUsersInMap = async (): Promise<UserMap[]> => {
  try {
    // const users = await axiosInstance.get(`/api/map/users/${userId}`)
    const users = await axiosInstance.get(`/api/map/users`)

    return users.data
  } catch (error) {
    console.error('Error while getting users in map', error)
    throw error
  }
}

export { getUsersInMap }
