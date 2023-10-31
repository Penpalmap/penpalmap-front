import { useState } from 'react'
import { uploadProfileImage } from '../api/profileApi'

const useUploadUserImage = () => {
    const [uploading, setUploading] = useState(false)

    const uploadImage = async (
        file: File,
        position: number,
        userId: string
    ) => {
        const formData = new FormData()
        formData.append('profileImage', file as Blob)
        formData.append('position', `${position}`)
        setUploading(true)

        //API
        const image = await uploadProfileImage(formData, userId)

        setUploading(false)

        return image
    }

    return { uploadImage, uploading }
}

export default useUploadUserImage
