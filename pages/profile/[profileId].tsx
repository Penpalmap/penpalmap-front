import { useRouter } from 'next/router'
import Profile from '../../components/Profile'

const ProfilePage = () => {
    const router = useRouter()
    const { profileId } = router.query as { profileId: string }

    return profileId ? <Profile profileId={profileId} /> : <></>
}

export default ProfilePage
