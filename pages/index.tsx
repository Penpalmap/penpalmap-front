import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'
import Chat from '../components/Chat/Chat'
import { useEffect } from 'react'
import ConversationList from '../components/Conversation/ConversationList'
import Loading from '../components/Layout/loading'

const Home = () => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        }
    }, [router, status])
    return status === 'loading' || status === 'unauthenticated' ? (
        <Loading />
    ) : (
        <>
            <Box w={'full'} h={'full'} display={'flex'}>
                <Box position={'relative'}>
                    <ConversationList />
                </Box>
                <Box flex={3}>
                    <Map />
                </Box>
                <Box flex={1}>
                    <Chat />
                </Box>
            </Box>
        </>
    )
}

export default Home
