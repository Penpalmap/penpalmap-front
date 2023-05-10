import {
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'
import { getProfile } from '../../api/profileApi'
import { useSession } from 'next-auth/react'
import { Profile } from '../../types'

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
                <Link onClick={() => setIsEditing(true)}>
                    Editer mon profil
                </Link>
                <Text>{profile?.name}</Text>
                <Text>{profile?.age}</Text>
            </>
        )
    }, [profile?.age, profile?.name])

    const renderEditProfile = useMemo(() => {
        return <Text>Editer </Text>
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay bg="rgba(0, 0, 0, 0.3)" />
            <ModalContent>
                <ModalHeader>
                    {/* back button */}
                    <Link onClick={() => setIsEditing(false)}>Retour</Link>
                    Mon profil
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {isEditing ? renderEditProfile : renderProfile}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default Profile
