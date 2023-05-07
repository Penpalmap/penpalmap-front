import axios from 'axios'
import { ProfileFormData } from '../types'

const uploadProfileImage = async (formData: FormData, userId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile/images`,
            formData
        )

        return response.data
    } catch (error) {
        console.error('Error while uploading profile image', error)
    }
}

const createProfile = async (profile: ProfileFormData, userId: string) => {
    try {
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`,
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

export { uploadProfileImage, updateProfile, createProfile }
