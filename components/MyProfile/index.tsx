import {
    Box,
    ButtonGroup,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useEditableControls,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { useSession } from 'next-auth/react'
import { UserImage } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import ProfileImage from '../Profile/ProfileImages'
import { useTranslation } from 'next-i18next'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const MyProfile = ({ isOpen, onClose }: Props) => {
    const { data: session } = useSession()

    const [images, setImages] = useState<UserImage[]>([])

    const { t } = useTranslation('common')

    useEffect(() => {
        if (session?.user?.userImages) {
            setImages(session?.user?.userImages)
        }
    }, [session?.user?.userImages])

    function EditableControls() {
        const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
            useEditableControls()

        return isEditing ? (
            <ButtonGroup
                justifyContent="center"
                size="sm"
                position="absolute"
                bottom={-30}
                right={0}
            >
                <IconButton
                    aria-label="Valider"
                    icon={<FontAwesomeIcon icon={faCheck} />}
                    {...getSubmitButtonProps()}
                />
                <IconButton
                    aria-label="Annuler"
                    icon={<FontAwesomeIcon icon={faXmark} />}
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        ) : null
    }

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
    }, [images])

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
