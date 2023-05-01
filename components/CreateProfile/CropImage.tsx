import { Box, Button } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropImageFunctions'

type Props = {
    imgUrl: string
    setImgsCrop: (imgCrop: any) => void
    onClose: () => void
    position?: number
}

const CropImage = ({ imgUrl, setImgsCrop, onClose, position }: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

    const onCropComplete = useCallback(
        (croppedArea, croppedAreaPixels) => {
            console.log(croppedArea, croppedAreaPixels)
            setCroppedAreaPixels(croppedAreaPixels)
        },
        [setCroppedAreaPixels]
    )

    const updateImageCrop = useCallback(async () => {
        try {
            const croppedImage = (await getCroppedImg(
                imgUrl,
                croppedAreaPixels
            )) as Blob

            console.log('donee', croppedImage)
            setImgsCrop((prevImgsCrop) => [
                ...prevImgsCrop,
                new File([croppedImage], `image${position}.jpeg`, {
                    type: 'image/jpeg',
                }),
            ])

            // add croppedImage to imgsCrop (array of cropped images (type File))

            onClose()
        } catch (e) {
            console.error(e)
        }
    }, [croppedAreaPixels, imgUrl, onClose, position, setImgsCrop])

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
            <Box
                position={'absolute'}
                top={0}
                left={0}
                right={0}
                bottom={'80px'}
            >
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
                    Close
                </Button>
                <Button colorScheme="blue" onClick={updateImageCrop}>
                    Valider
                </Button>
            </Box>
        </>
    )
}

export default CropImage
