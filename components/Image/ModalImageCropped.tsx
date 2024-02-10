import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Spinner,
} from '@chakra-ui/react'
import CropImage from '../CreateProfile/CropImage'
import { useTranslation } from 'next-i18next'

type ModalImageCroppedProps = {
  isOpen: boolean
  onClose: () => void
  originalImg: File | null
  setImgCrop: (croppedImage: Blob) => void
  isLoading?: boolean
}

const ModalImageCropped = ({
  isOpen,
  onClose,
  originalImg,
  setImgCrop,
  isLoading,
}: ModalImageCroppedProps) => {
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
                isLoading={isLoading}
              />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ModalImageCropped
