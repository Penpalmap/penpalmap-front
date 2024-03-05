import { UserImage } from '../../types'
import { useSession } from './../../hooks/useSession'
import { useState, useEffect } from 'react'
import ImagesUploadGrid from './ImagesUploadGrid'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { Alert, Text, VStack, useDisclosure } from '@chakra-ui/react'
import {
  deleteProfileImage,
  reorderProfileImages,
} from '../../api/user/userApi'

type Props = {
  images: UserImage[]
}

const ProfileImage = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [croppedImages, setCroppedImages] = useState<Array<UserImage>>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSession()

  const { uploadImage, isLoading, error } = useUploadUserImage()
  useEffect(() => {
    images.sort((a, b) => a.position - b.position)
    setCroppedImages(images)
  }, [images])

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event?.target?.files?.[0]
    if (!file) return
    setSelectedImage(file)
    onOpen()
  }

  const handleDeleteImage = async (index: number) => {
    if (!user) return
    let newImages
    setCroppedImages((prevImages) => {
      newImages = [...prevImages]
      newImages.splice(index, 1)

      newImages.forEach((image, index) => {
        image.position = index + 1
      })
      return newImages
    })
    const newOrder: number[] = newImages.map((image) => image.position)
    await deleteProfileImage(index + 1, user.id)
    await reorderProfileImages(user.id, { order: newOrder })
  }

  const handleImageCrop = async (croppedImage: Blob) => {
    if (!selectedImage) return
    const croppedImageFile = new File([croppedImage], selectedImage?.name, {
      type: selectedImage?.type,
    })

    const position = croppedImages.length + 1
    if (user) {
      const userImage = await uploadImage(croppedImageFile, position, user.id)

      if (userImage) {
        setCroppedImages((prevImages) => [...prevImages, userImage])
      }
      onClose()
    }
  }

  return (
    <VStack>
      <ModalImageCropped
        isOpen={isOpen}
        onClose={onClose}
        originalImg={selectedImage}
        setImgCrop={handleImageCrop}
        isLoading={isLoading}
      />
      <ImagesUploadGrid
        handleUploadImage={handleUploadImage}
        setImages={setCroppedImages}
        images={croppedImages}
        handleDeleteImage={handleDeleteImage}
      />

      {error && (
        <Alert status="error" mt={4}>
          <Text fontSize="sm">{error}</Text>
        </Alert>
      )}
    </VStack>
  )
}

export default ProfileImage
