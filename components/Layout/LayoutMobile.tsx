import Head from 'next/head'
import NavigationBar from '../Elements/NavigationBar'
import { Box, useBreakpointValue } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'
import Map from '../Map/Map'
import ConversationList from '../Conversation/ConversationList'
import Profile from '../Profile'
import { useSession } from 'next-auth/react'
import Chat from '../Chat/Chat'

const LayoutMobile = () => {
    const { mobileView } = useMobileView()

    const { data: session } = useSession()
    return (
        <>
            <Head>
                <title>PenpalMap</title>
            </Head>
            <Box w={'full'} h={'full'} display={'flex'} position={'relative'}>
                <Box flex={1}>
                    {mobileView === 'home' && <Map />}
                    {mobileView === 'conversations' && <ConversationList />}
                    {mobileView === 'profile' && session?.user && (
                        <Profile profileId={session.user.id} />
                    )}
                    {mobileView === 'chat' && <Chat />}
                </Box>
                <NavigationBar />
            </Box>
        </>
    )
}

export default LayoutMobile
