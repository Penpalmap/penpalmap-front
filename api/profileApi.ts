import { ProfileFormData, UserImage } from '../types'
import axiosInstance from '../axiosInstance'

const uploadProfileImage = async (formData: FormData, userId: string) => {
    try {
        const response = await axiosInstance.post(
            `/api/users/${userId}/image`,
            formData
        )

        return response.data
    } catch (error) {
        console.error('Error while uploading profile image', error)
    }
}

const reorderProfileImages = async (
    userId: string,
    newImagesOrder: UserImage[]
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

const deleteProfileImage = async (position: number, userId: string) => {
    try {
        const response = await axiosInstance.delete(
            `/api/users/${userId}/profile/images/${position}`
        )

        return response.data
    } catch (error) {
        console.error('Error while deleting profile image', error)
    }
}

const createProfile = async (profile: ProfileFormData, userId: string) => {
    try {
        const response = await axiosInstance.post(
            `/api/users/${userId}/details`,
            profile
        )

        return response.data
    } catch (error) {
        console.error('Error while creating profile', error)
    }
}

const updateProfile = async (profile: ProfileFormData, userId: string) => {
    try {
        const response = await axiosInstance.put(
            `/api/users/${userId}/profile`,
            profile
        )

        return response.data
    } catch (error) {
        console.error('Error while updating profile', error)
    }
}

const getProfile = async (userId: string) => {
    try {
        const response = await axiosInstance.get(`/api/users/${userId}/profile`)

        return response.data
    } catch (error) {
        console.error('Error while getting profile', error)
    }
}

export {
    uploadProfileImage,
    updateProfile,
    createProfile,
    getProfile,
    deleteProfileImage,
    reorderProfileImages,
}
