import { User, UserImage, UserMap } from '../../types'
import axiosInstance from '../../axiosInstance'
import { OrderImagesDto, UpdatePasswordDto, UpdateUserDto } from './userDto'

const getUserById = async (id: string): Promise<User> => {
  try {
    const userInfos = await axiosInstance.get(`/api/users/${id}`)

    return userInfos.data
  } catch (error) {
    console.error('Error while getting user by id', error)
    throw error
  }
}

const updateUser = async (user: UpdateUserDto, userId: string) => {
  try {
    const response = await axiosInstance.patch(`/api/users/${userId}`, user)

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

const uploadProfileImage = async (formData: FormData, userId: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/users/${userId}/images`,
      formData
    )

    return response.data
  } catch (error) {
    console.error('Error while uploading profile image', error)
  }
}

const deleteProfileImage = async (position: number, userId: string) => {
  try {
    const response = await axiosInstance.delete(
      `/api/users/${userId}/images/${position}`
    )

    return response.data
  } catch (error) {
    console.error('Error while deleting profile image', error)
  }
}

const reorderProfileImages = async (
  userId: string,
  newImagesOrder: OrderImagesDto
) => {
  try {
    const response = await axiosInstance.put(
      `/api/users/${userId}/profile/reorder`,
      {
        newImagesOrder,
      }
    )

    return response.data
  } catch (error) {
    console.error('Error while reordering profile images', error)
  }
}

const changePassword = async (
  { newPassword, oldPassword }: UpdatePasswordDto,
  userId: string
) => {
  try {
    const response = await axiosInstance.post(`/api/users/${userId}/password`, {
      oldPassword,
      newPassword,
    })

    return response.data
  } catch (error) {
    console.error('Error while updating user', error)
    throw error
  }
}

export {
  getUserById,
  updateUser,
  changePassword,
  deleteUser,
  uploadProfileImage,
  deleteProfileImage,
  reorderProfileImages,
}
