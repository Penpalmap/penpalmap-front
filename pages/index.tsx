import { useRouter } from 'next/router'
import { Box, useDisclosure } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'
import Chat from '../components/Chat/Chat'
import { useEffect } from 'react'
import ConversationList from '../components/Conversation/ConversationList'

const Home = () => {
    const { status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        }
    }, [router, status])
    return status === 'loading' ? (
        <div>Loading...</div>
    ) : (
        <>
            <Box w="100%" h="calc(100vh - 64px)" display={'flex'}>
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
