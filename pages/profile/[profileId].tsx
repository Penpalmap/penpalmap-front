import { useRouter } from 'next/router'

const Profile = () => {
    const router = useRouter()
    const { profileId } = router.query

    return <div>Profile: {profileId}</div>
}

export default Profile
