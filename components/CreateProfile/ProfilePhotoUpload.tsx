import {
    Box,
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import CropImage from './CropImage'
import { uploadProfileImage } from '../../api/profileApi'
import { useSession } from 'next-auth/react'
import 'ol/ol.css'

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
                formData.append('position', `${imgsCrop.length - 1}`)
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
            <HStack spacing="24px" alignItems={'center'}>
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    w={'100px'}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    cursor="pointer"
                >
                    {imgsCrop.length > 0 ? (
                        <Image
                            src={URL.createObjectURL(imgsCrop[0])}
                            alt="First image profile"
                        />
                    ) : (
                        <Text color="gray.500">Add photo </Text>
                    )}
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                </Box>
                <Box
                    borderWidth={2}
                    borderColor="gray.400"
                    p={4}
                    mb={4}
                    onClick={() => {
                        fileInputRef.current.click()
                    }}
                    w={'100px'}
                    cursor="pointer"
                >
                    {imgsCrop.length > 1 ? (
                        <Image
                            src={URL.createObjectURL(imgsCrop[1])}
                            alt="First image profile"
                        />
                    ) : (
                        <Text color="gray.500">Add photo </Text>
                    )}
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
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
                    w={'100px'}
                >
                    {imgsCrop.length > 2 ? (
                        <Image
                            src={URL.createObjectURL(imgsCrop[2])}
                            alt="First image profile"
                        />
                    ) : (
                        <Text color="gray.500">Add photo </Text>
                    )}
                    <input
                        type="file"
                        id="file-upload"
                        style={{ display: 'none' }}
                        onChange={handleUpload}
                        accept="image/*"
                        ref={fileInputRef}
                    />
                </Box>{' '}
            </HStack>
        </Box>
    )
}

export default ProfilePhotoUpload
