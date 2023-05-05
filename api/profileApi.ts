import axios from 'axios'
import { ProfileFormData } from '../types'

const uploadProfileImage = async (formData: FormData, userId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile/images`,
        formData
    )

    return response.data
}

const createProfile = async (profile: ProfileFormData, userId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`,
        profile
    )

    return response.data
}

const updateProfile = async (profile: ProfileFormData, userId: string) => {
    const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile`,
        profile
    )

    return response.data
}

export { uploadProfileImage, updateProfile, createProfile }
