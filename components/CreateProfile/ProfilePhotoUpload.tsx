import { Box, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useSession } from 'next-auth/react'
import ImagesUploadGrid from '../Profile/ImagesUploadGrid'
import { deleteProfileImage } from '../../api/profileApi'
import { UserImage } from '../../types'

const ProfilePhotoUpload = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [croppedImages, setCroppedImages] = useState<Array<UserImage>>([])
    const { session } = useSession()

    const { uploadImage } = useUploadUserImage()

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
        if (session?.user?.id) {
            const userImage = await uploadImage(
                croppedImageFile,
                position,
                session?.user?.id
            )

            setCroppedImages((prevImages) => [...prevImages, userImage])

            onClose()
        }
    }

    const handleDeleteImage = async (index: number) => {
        if (!session?.user?.id) return
        setCroppedImages((prevImages) => {
            const newImages = [...prevImages]
            newImages.splice(index, 1)
            return newImages
        })

        await deleteProfileImage(index, session.user.id)
    }

    return (
        <Box>
            <ModalImageCropped
                isOpen={isOpen}
                onClose={onClose}
                originalImg={selectedImage}
                setImgCrop={handleImageCrop}
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
