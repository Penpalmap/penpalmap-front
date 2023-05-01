import axios from 'axios'

const uploadProfileImage = async (formData: FormData, userId: string) => {
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}/profile/images`,
        formData
    )

    return response.data
}

export { uploadProfileImage }
