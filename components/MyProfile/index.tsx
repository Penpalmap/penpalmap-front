import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { UserImage } from '../../types'
import ProfileImage from '../Profile/ProfileImages'
import { useTranslation } from 'next-i18next'
import { useSession } from '../../hooks/useSession'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const MyProfile = ({ isOpen, onClose }: Props) => {
    const { user } = useSession()

    const [images, setImages] = useState<UserImage[]>([])

    const { t } = useTranslation('common')

    useEffect(() => {
        if (user?.userImages) {
            setImages(user?.userImages)
        }
    }, [user?.userImages])

    const renderProfile = useMemo(() => {
        return (
            <>
                <Box mb={4}>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        {t('profil.photos')}
                    </Text>
                    <Text mb={2} fontSize={'small'}>
                        {t('profil.addPhotos')}
                    </Text>
                    <ProfileImage images={images} />
                </Box>

                {/* <Box mb={4}>
                    <FormControl>
                        <FormLabel fontWeight={'semibold'}>
                            {t('profil.description')}
                        </FormLabel>
                        <Editable
                            defaultValue="Take some chakra"
                            border={'2px solid black'}
                        >
                            <EditablePreview w={'full'} />
                            <EditableInput />
                            <EditableControls />
                        </Editable>
                    </FormControl>
                </Box> */}
            </>
        )
    }, [images, t])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg="blackAlpha.600"
                backdropFilter="auto"
                backdropBlur="10px"
            />
            <ModalContent
                w={500}
                h={'container.sm'}
                overflow={'hidden'}
                alignSelf={'center'}
                borderRadius={'2xl'}
            >
                <ModalHeader borderBottom={'1px solid #ededed'}>
                    <Text>{t('menu.myProfile')}</Text>
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody
                    overflowY="scroll"
                    css={{
                        '&::-webkit-scrollbar': {
                            display: 'none',
                        },
                    }}
                    mb={4}
                >
                    {renderProfile}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default MyProfile
