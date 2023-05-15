import {
    Box,
    Button,
    CloseButton,
    Divider,
    HStack,
    Icon,
    IconButton,
    Image,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    StepSeparator,
    Text,
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

    const renderProfile = useMemo(() => {
        return (
            <>
                <CloseButton
                    position="absolute"
                    top="20px"
                    right="20px"
                    aria-label="Search database"
                />

                <Image
                    borderTopRadius={'2xl'}
                    w={350}
                    h={350}
                    src={
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                    }
                    alt="premiere photo de profil"
                />
                <HStack p={'4'} justifyContent={'space-between'}>
                    <Box>
                        <HStack>
                            <Text>Louise,</Text> <Text>25 ans</Text>
                        </HStack>

                        <HStack>
                            <Icon name="location" />
                            <Text>Paris</Text>
                        </HStack>
                    </Box>
                    <Box>
                        <Button
                            variant="outline"
                            colorScheme="teal"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                        >
                            Modifier
                        </Button>
                    </Box>
                </HStack>
                <Divider />
                <Box p={4}>
                    <Text>A PROPOS</Text>
                    <Text>Je suis une femme qui cherche un homme</Text>
                </Box>

                <Image
                    w={350}
                    h={350}
                    borderBottomRadius={'2xl'}
                    src={
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80'
                    }
                    alt="Deuxieme photo de profil"
                />
            </>
        )
    }, [])

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
            <ModalOverlay bg="rgba(0, 0, 0, 0.3)" />
            <ModalContent w={350} borderRadius={'2xl'}>
                {/* <ModalHeader> */}
                {/* back button */}
                {/* <Link onClick={() => setIsEditing(false)}>Retour</Link> */}
                {/* Mon profil
                </ModalHeader> */}
                {/* <ModalCloseButton /> */}
                <ModalBody p={0}>
                    {!isEditing ? renderProfile : renderEditProfile}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Profile
