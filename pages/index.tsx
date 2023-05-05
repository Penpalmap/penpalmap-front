import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'

const Home = () => {
    // const { user } = useAuth();
    const router = useRouter()

    const { data: session } = useSession()

    return (
        <Box>
            <Box w="100%" h="calc(100vh - 64px)">
                <Map />
            </Box>
        </Box>
    )
}

export default Home
