import {
    Box,
    ButtonGroup,
    CheckboxIcon,
    Circle,
    CloseButton,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    FormControl,
    FormLabel,
    HStack,
    Heading,
    IconButton,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useEditableControls,
} from '@chakra-ui/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { deleteProfileImage, getProfile } from '../../api/profileApi'
import { useSession } from 'next-auth/react'
import { Profile } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faHome,
    faMapMarker,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { uploadProfileImage } from '../../api/profileApi'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const Profile = ({ isOpen, onClose }: Props) => {
    const [profile, setProfile] = useState({} as Profile)
    const { data: session } = useSession()

    const refInputFile = useRef<HTMLInputElement>(null)

    const [isEditing, setIsEditing] = useState<boolean>(false)
    useEffect(() => {
        const getProfileData = async () => {
            const profileData = await getProfile(session.user.userId)
            console.log(profileData)
            setProfile(profileData)
        }

        if (session?.user?.userId) getProfileData()
    }, [session?.user?.userId])

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
        const handleFileChange = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target?.files?.[0]

            if (file) {
                const formData = new FormData()
                formData.append('profileImage', file)

                const nullSrcIndex = profile.images.findIndex(
                    (image) => image.src === null
                )

                formData.append('position', nullSrcIndex.toString())

                try {
                    // Effectuer la requête API pour télécharger l'image
                    const uploadedImage = await uploadProfileImage(
                        formData,
                        session?.user.userId
                    )

                    // Mettre à jour le profil avec l'image téléchargée et la position
                    const images = [...profile.images]
                    images[nullSrcIndex].src = uploadedImage.uploadImgSrc

                    setProfile({
                        ...profile,
                        images,
                    })
                } catch (error) {
                    console.error(
                        "Une erreur s'est produite lors de la requête API pour télécharger l'image",
                        error
                    )
                }
            }
        }

        const handleDeleteImage = async (position: number) => {
            const images = [...profile.images]
            images[position].src = null

            await deleteProfileImage(position, session?.user.userId)
            setProfile({
                ...profile,
                images,
            })
        }

        return (
            <>
                <Box mb={4}>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>
                        {profile?.name}
                    </Text>
                </Box>
                <Box mb={4}>
                    <Text fontWeight={'semibold'} fontSize={'lg'}>
                        Photos
                    </Text>
                    <Text mb={2} fontSize={'small'}>
                        Ajouter des photos
                    </Text>
                    <Flex
                        flexWrap="wrap"
                        gap={3}
                        justifyContent="space-between"
                        mb={4}
                    >
                        {profile?.images?.map((photo, index) => (
                            <Box
                                key={index}
                                w={170}
                                h={170}
                                position={'relative'}
                            >
                                {photo?.src ? (
                                    <>
                                        <Image
                                            src={photo.src}
                                            alt={`Photo ${index + 1}`}
                                            borderRadius={'xl'}
                                        />
                                        <Circle
                                            bg={'red.400'}
                                            size={6}
                                            position="absolute"
                                            top={-2}
                                            right={-2}
                                            cursor="pointer"
                                            onClick={() =>
                                                handleDeleteImage(index)
                                            }
                                            boxShadow={'dark-lg'}
                                            _hover={{
                                                bgColor: 'red.500',
                                            }}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                color="white"
                                                size="xs"
                                            />
                                        </Circle>
                                    </>
                                ) : (
                                    <Box
                                        w={'full'}
                                        h={'full'}
                                        bgColor={'red.100'}
                                        borderRadius={'xl'}
                                        display={'flex'}
                                        justifyContent={'center'}
                                        alignItems={'center'}
                                        cursor={'pointer'}
                                        // Ouvrir la modal d'ajout de photo
                                        onClick={() =>
                                            refInputFile?.current?.click()
                                        }
                                    >
                                        <FontAwesomeIcon icon={faMapMarker} />
                                        <Input
                                            type={'file'}
                                            display={'none'}
                                            ref={refInputFile}
                                            onChange={handleFileChange}
                                            accept={'image/*'}
                                        />
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Flex>
                </Box>

                <Box mb={4}>
                    <FormControl>
                        <FormLabel fontWeight={'semibold'}>
                            Description
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
                </Box>
            </>
        )
    }, [profile, session?.user.userId])

    const renderEditProfile = useMemo(() => {
        return (
            <>
                <IconButton
                    aria-label="Retour"
                    icon={<FontAwesomeIcon icon={faHome} />}
                    onClick={() => setIsEditing(false)}
                />
                <Text>Editer </Text>
            </>
        )
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay
                bg="blackAlpha.600"
                backdropFilter="auto"
                backdropBlur="10px"
            />
            <ModalContent
                w={400}
                h={'container.sm'}
                overflow={'hidden'}
                alignSelf={'center'}
                borderRadius={'2xl'}
            >
                <ModalHeader borderBottom={'1px solid #ededed'}>
                    <Text>Mon profil</Text>
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
                    {!isEditing ? renderProfile : renderEditProfile}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Profile
