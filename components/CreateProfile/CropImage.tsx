import { Box, Button } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropImageFunctions'
import { useTranslation } from 'next-i18next'

type Props = {
  imgUrl: string
  setImgCrop: (imgCrop: Blob) => void
  onClose: () => void
  isLoading?: boolean
}

const CropImage = ({ imgUrl, setImgCrop, onClose, isLoading }: Props) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const { t } = useTranslation('common')
  const onCropComplete = useCallback(
    (_croppedArea, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    [setCroppedAreaPixels]
  )

  const updateImageCrop = useCallback(async () => {
    try {
      const croppedImage = (await getCroppedImg(
        imgUrl,
        croppedAreaPixels
      )) as File

      setImgCrop(croppedImage)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels, imgUrl, setImgCrop])

  const renderCrop = useMemo(
    () => (
      <Cropper
        image={imgUrl}
        crop={crop}
        zoom={zoom}
        aspect={4 / 4}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    ),
    [imgUrl, crop, zoom, onCropComplete]
  )

  return (
    <>
      <Box position={'absolute'} top={0} left={0} right={0} bottom={'80px'}>
        {renderCrop}
      </Box>

      {/* Modal footer */}
      <Box
        bottom={0}
        position={'absolute'}
        width={'100%'}
        display={'flex'}
        justifyContent={'right'}
        py={'1rem'}
      >
        <Button mr={3} onClick={onClose}>
          {t('connect.close')}
        </Button>
        <Button
          colorScheme="blue"
          onClick={updateImageCrop}
          isLoading={isLoading}
        >
          {t('connect.confirm')}
        </Button>
      </Box>
    </>
  )
}

export default CropImage
