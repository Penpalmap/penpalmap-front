import {
    Box,
    ButtonGroup,
    CheckboxIcon,
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
import { useEffect, useMemo, useState } from 'react'
import { getProfile } from '../../api/profileApi'
import { useSession } from 'next-auth/react'
import { Profile } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

type Props = {
    isOpen: boolean
    onClose: () => void
}

const Profile = ({ isOpen, onClose }: Props) => {
    const [profile, setProfile] = useState({} as Profile)
    const { data: session } = useSession()

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
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls()

        return isEditing ? (
            <ButtonGroup
                justifyContent="center"
                size="sm"
                position="absolute"
                bottom={0}
                right={0}
            >
                <IconButton
                    icon={<FontAwesomeIcon icon={faHome} />}
                    {...getSubmitButtonProps()}
                />
                <IconButton
                    icon={<CheckboxIcon />}
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        ) : (
            <Flex
                justifyContent="center"
                position="absolute"
                bottom={0}
                right={0}
            >
                <IconButton
                    size="sm"
                    icon={<FontAwesomeIcon icon={faHome} />}
                    {...getEditButtonProps()}
                />
            </Flex>
        )
    }

    const renderProfile = useMemo(() => {
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
                            <Box key={index} bgColor="blue.300" w={170} h={170}>
                                {photo.src ? (
                                    <Image
                                        src={photo.src}
                                        alt={`Photo ${index + 1}`}
                                    />
                                ) : (
                                    <Text>Ajouter une photo</Text>
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
                        <Editable defaultValue="Take some chakra">
                            <EditablePreview />
                            <EditableInput />
                            <EditableControls />
                        </Editable>
                    </FormControl>
                </Box>
            </>
        )
    }, [profile?.images, profile?.name])

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
                >
                    {!isEditing ? renderProfile : renderEditProfile}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Profile
