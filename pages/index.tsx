import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'
import Chat from '../components/Chat/Chat'
import { useEffect } from 'react'
import ConversationList from '../components/Conversation/ConversationList'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import Head from 'next/head'

Modal.setAppElement('#__next')

const Home = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session?.user?.isNewUser) {
            router.push('/create-profile')
        }

        if (status === 'unauthenticated') {
            router.push('/auth/signin')
        }
    }, [router, session, status])
    return status === 'loading' || session?.user?.isNewUser ? (
        <Loading />
    ) : (
        <>
            <Head>
                <title>PenpalMap</title>
            </Head>
            <Box w={'full'} h={'full'} display={'flex'} position={'relative'}>
                <Box position={'relative'}>
                    <ConversationList />
                </Box>
                <Box flex={3}>
                    <Map />
                </Box>
                <Chat />
            </Box>
        </>
    )
}

export default Home
