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
import { useTranslation } from 'next-i18next'

const ModalImageCropped = ({ isOpen, onClose, originalImg, setImgCrop }) => {
  const { t } = useTranslation('common')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('connect.editImage')}</ModalHeader>
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
}

export default ModalImageCropped
