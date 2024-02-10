import { useState } from 'react'
import { uploadProfileImage } from '../api/profileApi'

const useUploadUserImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const uploadImage = async (file: File, position: number, userId: string) => {
    setIsLoading(true)
    const formData = new FormData()
    formData.append('profileImage', file as Blob)
    formData.append('position', `${position}`)

    //API
    const image = await uploadProfileImage(formData, userId)

    setIsLoading(false)

    return image
  }

  return { uploadImage, isLoading }
}

export default useUploadUserImage
