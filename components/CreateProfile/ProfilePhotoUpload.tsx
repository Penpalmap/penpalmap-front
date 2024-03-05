import { Box, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useSession } from '../../hooks/useSession'
import ImagesUploadGrid from '../Profile/ImagesUploadGrid'
import { UserImage } from '../../types'
import { deleteProfileImage } from '../../api/user/userApi'

const ProfilePhotoUpload = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [croppedImages, setCroppedImages] = useState<Array<UserImage>>([])
  const { user } = useSession()

  const { uploadImage, isLoading } = useUploadUserImage()

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0]
    if (!file) return
    setSelectedImage(file)
    onOpen()
  }

  const handleImageCrop = async (croppedImage: Blob) => {
    if (!selectedImage) return
    const croppedImageFile = new File([croppedImage], selectedImage?.name, {
      type: selectedImage?.type,
    })
    const position = croppedImages.length
    if (user?.id) {
      const userImage = await uploadImage(croppedImageFile, position, user?.id)

      setCroppedImages((prevImages) => [...prevImages, userImage])

      onClose()
    }
  }

  const handleDeleteImage = async (index: number) => {
    if (!user) return
    setCroppedImages((prevImages) => {
      const newImages = [...prevImages]
      newImages.splice(index, 1)
      return newImages
    })

    await deleteProfileImage(index + 1, user.id)
  }

  return (
    <Box>
      <ModalImageCropped
        isOpen={isOpen}
        onClose={onClose}
        originalImg={selectedImage}
        setImgCrop={handleImageCrop}
        isLoading={isLoading}
      />

      <ImagesUploadGrid
        images={croppedImages}
        setImages={setCroppedImages}
        handleUploadImage={handleUploadImage}
        handleDeleteImage={handleDeleteImage}
      />
    </Box>
  )
}

export default ProfilePhotoUpload
