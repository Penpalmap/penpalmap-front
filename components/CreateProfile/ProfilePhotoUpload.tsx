import { Box, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useSession } from 'next-auth/react'
import ImagesUploadGrid from '../Profile/ImagesUploadGrid'
import { deleteProfileImage } from '../../api/profileApi'
import { UserImage } from '../../types'

const ProfileUploadPhoto = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [croppedImages, setCroppedImages] = useState<Array<UserImage>>([])
    const { data: session } = useSession()

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
        console.log(croppedImage)

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
            console.log('userImage', userImage)
            setCroppedImages((prevImages) => [...prevImages, userImage])

            onClose()
        }
    }

    const clickOnBtn = (index: number) => {
        const fileInput = document.getElementById(
            `file-upload-${index}`
        ) as HTMLInputElement
        fileInput.click()
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

            {/* <HStack spacing="24px" alignItems="center">
                {[0, 1, 2, 3].map((index) => (
                    <Box
                        key={index}
                        onClick={() => clickOnBtn(index)}
                        cursor="pointer"
                        w={['80px', '180px']}
                        h={['80px', '180px']}
                        borderRadius="lg"
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        bg={'gray.100'}
                        position={'relative'}
                    >
                        {croppedImages[index] ? (
                            <Image
                                src={URL.createObjectURL(
                                    croppedImages[index] as Blob
                                )}
                                alt={`Profile Image ${index + 1}`}
                                w="100%"
                                h="100%"
                                borderRadius="lg"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faPlus} size="2x" />
                        )}
                        <input
                            type="file"
                            id={`file-upload-${index}`}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                        {croppedImages[index] && (
                            <IconButton
                                onClick={() => handleDeleteImage(index)}
                                position={'absolute'}
                                bottom={2}
                                right={2}
                                aria-label="Send email"
                                bg={'blackAlpha.400'}
                                border={'2px solid white'}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faClose}
                                        color="white"
                                    />
                                }
                            />
                        )}
                    </Box>
                ))}
            </HStack> */}
        </Box>
    )
}

export default ProfileUploadPhoto
