import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Box,
} from '@chakra-ui/react'
import CropImage from '../CreateProfile/CropImage'

const ModalImageCropped = ({ isOpen, onClose, originalImg, setImgCrop }) => (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Editer votre image</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Box position={'relative'} height={'sm'}>
                    {originalImg && (
                        <CropImage
                            imgUrl={URL.createObjectURL(originalImg)}
                            setImgCrop={setImgCrop}
                            onClose={onClose}
                        />
                    )}
                </Box>
            </ModalBody>
        </ModalContent>
    </Modal>
)

export default ModalImageCropped
