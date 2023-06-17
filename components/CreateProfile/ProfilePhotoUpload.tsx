import { Box, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react'
import ModalImageCropped from '../Image/ModalImageCropped'
import useUploadUserImage from '../../hooks/useUploadUserImage'
import { useSession } from 'next-auth/react'

const ProfileUploadPhoto = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [croppedImages, setCroppedImages] = useState<Array<File>>([])
    const { data: session } = useSession()

    const { uploadImage } = useUploadUserImage()

    const handleImageUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files[0]
        setSelectedImage(file)
        onOpen()
    }

    const handleImageCrop = (croppedImage: File) => {
        setCroppedImages((prevImages) => [...prevImages, croppedImage])

        const position = croppedImages.length
        uploadImage(croppedImage, position, session?.user?.id)
        onClose()
    }

    return (
        <Box>
            <ModalImageCropped
                isOpen={isOpen}
                onClose={onClose}
                originalImg={selectedImage}
                setImgCrop={handleImageCrop}
            />

            <h1>Create Profile Photo</h1>
            <HStack spacing="24px" alignItems="center">
                {[0, 1, 2].map((index) => (
                    <Box
                        key={index}
                        borderWidth={2}
                        borderColor="gray.400"
                        p={4}
                        mb={4}
                        w="100px"
                        onClick={() => {
                            const fileInput = document.getElementById(
                                `file-upload-${index}`
                            ) as HTMLInputElement
                            fileInput.click()
                        }}
                        cursor="pointer"
                    >
                        {croppedImages[index] ? (
                            <Image
                                src={URL.createObjectURL(croppedImages[index])}
                                alt={`Profile Image ${index + 1}`}
                            />
                        ) : (
                            <Text color="gray.500">Add photo</Text>
                        )}
                        <input
                            type="file"
                            id={`file-upload-${index}`}
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                            accept="image/*"
                        />
                    </Box>
                ))}
            </HStack>
        </Box>
    )
}

export default ProfileUploadPhoto
