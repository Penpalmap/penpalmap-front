import {
    Box,
    ButtonGroup,
    Circle,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    FormControl,
    FormLabel,
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
import { useMemo, useRef, useState } from 'react'
import { deleteProfileImage } from '../../api/profileApi'
import { useSession } from 'next-auth/react'
import { UserImage } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCheck,
    faHome,
    faMapMarker,
    faTrash,
    faXmark,
} from '@fortawesome/free-solid-svg-icons'
import useUploadUserImage from '../../hooks/useUploadUserImage'

type Props = {
    isOpen: boolean
    onClose: () => void
}

type Profile = {
    images: Array<UserImage | null>
}

const MyProfile = ({ isOpen, onClose }: Props) => {
    const [profile, setProfile] = useState<Profile>({
        images: [null, null, null, null],
    })
    const { data: session, update: updateSession } = useSession()
    const { uploadImage } = useUploadUserImage()

    const refInputFile = useRef<HTMLInputElement>(null)

    const [isEditing, setIsEditing] = useState<boolean>(false)

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
        const handleAddImage = () => {
            if (refInputFile.current) {
                refInputFile.current.click()
            }
        }

        const handleFileChange = async (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = e.target?.files?.[0]

            if (file && session?.user?.id) {
                uploadImage(
                    file,
                    session?.user?.userImages?.length,
                    session?.user.id
                )

                updateSession()
            }
        }

        const handleDeleteImage = async (position: number) => {
            const images = [...profile.images]
            images[position] = null

            if (session?.user?.id) {
                await deleteProfileImage(position, session?.user.id)
                setProfile({
                    ...profile,
                    images,
                })
            }
        }

        return (
            <>
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
                        {[0, 1, 2, 3].map((index) => {
                            const image = session?.user?.userImages?.find(
                                (img: UserImage) => img.position === index
                            )
                            return (
                                <Box
                                    key={index}
                                    w={170}
                                    h={170}
                                    position="relative"
                                >
                                    {image ? (
                                        <>
                                            <Image
                                                src={image.src}
                                                alt={`Photo ${index}`}
                                                borderRadius="xl"
                                            />
                                            <Circle
                                                bg="red.400"
                                                size={6}
                                                position="absolute"
                                                top={-2}
                                                right={-2}
                                                cursor="pointer"
                                                onClick={() =>
                                                    handleDeleteImage(
                                                        image.position
                                                    )
                                                }
                                                boxShadow="dark-lg"
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
                                            w="full"
                                            h="full"
                                            bgColor="red.100"
                                            borderRadius="xl"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            cursor="pointer"
                                            onClick={() => handleAddImage()}
                                        >
                                            <FontAwesomeIcon
                                                icon={faMapMarker}
                                            />
                                        </Box>
                                    )}
                                </Box>
                            )
                        })}
                        <Input
                            type="file"
                            ref={refInputFile}
                            display="none"
                            onChange={handleFileChange}
                        />
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
    }, [
        profile,
        session?.user?.id,
        session?.user?.userImages,
        updateSession,
        uploadImage,
    ])

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

export default MyProfile
