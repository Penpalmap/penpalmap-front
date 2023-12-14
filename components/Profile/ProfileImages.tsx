import { UserImage } from '../../types'
import { useSession } from './../../hooks/useSession'
import { useState, useEffect } from 'react'
import ImagesUploadGrid from './ImagesUploadGrid'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useDisclosure } from '@chakra-ui/react'
import { deleteProfileImage } from '../../api/profileApi'

type Props = {
    images: UserImage[]
}

const ProfileImage = ({ images }: Props) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [croppedImages, setCroppedImages] = useState<Array<UserImage>>([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user } = useSession()

    const { uploadImage } = useUploadUserImage()
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
        setCroppedImages((prevImages) => {
            const newImages = [...prevImages]
            newImages.splice(index, 1)

            newImages.forEach((image, index) => {
                image.position = index
            })
            return newImages
        })

        await deleteProfileImage(index, user.id)

        // updateSession()
    }

    const handleImageCrop = async (croppedImage: Blob) => {
        if (!selectedImage) return
        const croppedImageFile = new File([croppedImage], selectedImage?.name, {
            type: selectedImage?.type,
        })

        const position = croppedImages.length
        if (user) {
            const userImage = await uploadImage(
                croppedImageFile,
                position,
                user.id
            )

            setCroppedImages((prevImages) => [...prevImages, userImage])

            // updateSession()

            onClose()
        }
    }

    return (
        <>
            <ModalImageCropped
                isOpen={isOpen}
                onClose={onClose}
                originalImg={selectedImage}
                setImgCrop={handleImageCrop}
            />
            <ImagesUploadGrid
                handleUploadImage={handleUploadImage}
                setImages={setCroppedImages}
                images={croppedImages}
                handleDeleteImage={handleDeleteImage}
            />
        </>
    )
}

export default ProfileImage
