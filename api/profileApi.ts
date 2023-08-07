import axios from 'axios'
import { ProfileFormData } from '../types'

const uploadProfileImage = async (formData: FormData, userId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/image`,
            formData
        )

        return response.data
    } catch (error) {
        console.error('Error while uploading profile image', error)
    }
}

const reorderProfileImages = async (
    userId: string,
    sourceIndex,
    destinationIndex
) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile/reorder`,
            {
                sourceIndex,
                destinationIndex,
            }
        )

        return response.data
    } catch (error) {
        console.error('Error while reordering profile images', error)
    }
}

const deleteProfileImage = async (position: number, userId: string) => {
    try {
        const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile/images/${position}`
        )

        return response.data
    } catch (error) {
        console.error('Error while deleting profile image', error)
    }
}

const createProfile = async (profile: ProfileFormData, userId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/details`,
            profile
        )

        return response.data
    } catch (error) {
        console.error('Error while creating profile', error)
    }
}

const updateProfile = async (profile: ProfileFormData, userId: string) => {
    try {
        const response = await axios.put(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`,
            profile
        )

        return response.data
    } catch (error) {
        console.error('Error while updating profile', error)
    }
}

const getProfile = async (userId: string) => {
    try {
        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`
        )

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
