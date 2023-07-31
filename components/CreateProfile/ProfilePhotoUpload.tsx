import { Box, HStack, IconButton, Image, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useSession } from 'next-auth/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faCross, faPlus } from '@fortawesome/free-solid-svg-icons'

const ProfileUploadPhoto = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [croppedImages, setCroppedImages] = useState<Array<File>>([])
    const { data: session } = useSession()

    const { uploadImage } = useUploadUserImage()

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event?.target?.files?.[0]
        if (!file) return
        setSelectedImage(file)
        onOpen()
    }

    const handleImageCrop = (croppedImage: File) => {
        setCroppedImages((prevImages) => [...prevImages, croppedImage])
        const position = croppedImages.length
        if (session?.user?.id) {
            uploadImage(croppedImage, position, session?.user?.id)
            onClose()
        }
    }

    const clickOnBtn = (index: number) => {
        const fileInput = document.getElementById(
            `file-upload-${index}`
        ) as HTMLInputElement
        fileInput.click()
    }

    const handleDeleteImage = (index: number) => {
        setCroppedImages((prevImages) => {
            const newImages = [...prevImages]
            newImages.splice(index, 1)
            return newImages
        })
    }

    return (
        <Box>
            <ModalImageCropped
                isOpen={isOpen}
                onClose={onClose}
                originalImg={selectedImage}
                setImgCrop={handleImageCrop}
            />

            <HStack spacing="24px" alignItems="center">
                {[0, 1, 2, 3].map((index) => (
                    <Box
                        key={index}
                        onClick={() => clickOnBtn(index)}
                        cursor="pointer"
                        w="180px"
                        h="180px"
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
            </HStack>
        </Box>
    )
}

export default ProfileUploadPhoto
