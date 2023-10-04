import { Link } from '@chakra-ui/react'

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>

            <Link href="/terms" color="blue.600" fontWeight="medium">
                Conditions d&apos;utilisation
            </Link>
            <Link href="/rgpd" color="blue.600" fontWeight="medium">
                Respect du RGPD
            </Link>
        </div>
    )
}

export default Settings
