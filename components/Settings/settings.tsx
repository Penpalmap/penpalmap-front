import { Link } from '@chakra-ui/react'

const Settings = () => {
    return (
        <div>
            <h1>Settings</h1>

            <Link href="/terms" color="blue.600" fontWeight="medium">
                Terms of Use
            </Link>
            <Link href="/legalnotice" color="blue.600" fontWeight="medium">
                Mentions Légales
            </Link>
        </div>
    )
}

export default Settings
