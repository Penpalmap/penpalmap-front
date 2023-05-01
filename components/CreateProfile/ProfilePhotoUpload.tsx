import {
    Box,
    Button,
    HStack,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form'
import { ProfileFormData } from '../../types'
import Cropper from 'react-easy-crop'
import CropImage from './CropImage'
import { uploadProfileImage } from '../../api/profileApi'
import { useSession } from 'next-auth/react'

type Props = {
    onNextStep?: () => void
    onPreviousStep?: () => void
    register?: UseFormRegister<ProfileFormData>
    setValue?: UseFormSetValue<ProfileFormData>
    getValues?: UseFormGetValues<ProfileFormData>
}

const ProfilePhotoUpload = () => {
    const { data: session } = useSession()

    const fileInputRef = useRef<HTMLInputElement>(null)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [img, setImg] = useState<File>(null)
    const [imgsCrop, setImgsCrop] = useState<Array<File>>([])

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        onOpen()
        const file = e.target.files[0]
        setImg(file)
    }

    useEffect(() => {
        const uploadCroppedImage = async () => {
            console.log('uploadCroppedImage', imgsCrop)
            try {
                const formData = new FormData()

                // take the last photo in imgsCrop
                const imgCrop = imgsCrop[imgsCrop.length - 1]
                formData.append('profileImage', imgCrop as Blob)
                formData.append('position', `${imgsCrop.length}`)
                const response = await uploadProfileImage(
                    formData,
                    session?.user?.userId
                )
                console.log('response', response)
            } catch (error) {
                console.log(error)
            }
        }

        if (imgsCrop.length > 0) {
            uploadCroppedImage()
        }
    }, [imgsCrop, session?.user?.userId])

    return (
        <Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editer votre image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box position={'relative'} height={'sm'}>
                            {img && (
                                <CropImage
                                    imgUrl={URL.createObjectURL(img)}
                                    setImgsCrop={setImgsCrop}
                                    position={imgsCrop.length}
                                    onClose={onClose}
                                />
                            )}
                        </Box>
                    </ModalBody>

                    {/* <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme="blue">Valider</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
            <h1>create profile Photo</h1>
            <HStack spacing="24px">
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>{' '}
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                    <Text color="gray.500">Add photo </Text>
                </Box>{' '}
            </HStack>
        </Box>
    )
}

export default ProfilePhotoUpload
