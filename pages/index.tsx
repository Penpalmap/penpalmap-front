import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'
import Chat from '../components/Chat/Chat'

const Home = () => {
    // const { user } = useAuth();
    const router = useRouter()

    const { data: session } = useSession()

    return (
        <Box w="100%" h="calc(100vh - 64px)" display={'flex'}>
            <Box flex={3}>
                <Map />
            </Box>
            <Box flex={1}>
                <Chat />
            </Box>
        </Box>
    )
}

export default Home
