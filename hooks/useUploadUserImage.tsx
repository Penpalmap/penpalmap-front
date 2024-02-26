import { useState } from 'react'
import { uploadProfileImage } from '../api/user/userApi'

const useUploadUserImage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const uploadImage = async (file: File, position: number, userId: string) => {
    setError(null)
    setIsLoading(true)
    const formData = new FormData()
    formData.append('profileImage', file as Blob)
    formData.append('position', `${position}`)

    const image = await uploadProfileImage(formData, userId)

    if (!image) {
      setError('Error uploading image')
      setIsLoading(false)
      return
    }
    setIsLoading(false)

    return image
  }

  return { uploadImage, isLoading, error }
}

export default useUploadUserImage
