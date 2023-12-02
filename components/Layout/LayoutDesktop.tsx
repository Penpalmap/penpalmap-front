import { Box } from '@chakra-ui/react'
import Chat from '../Chat/Chat'
import Head from 'next/head'
import Map from '../Map/Map'
import ConversationList from '../Conversation/ConversationList'

const LayoutDesktop = () => {
    return (
        <>
            <Head>
                <title>PenpalMap</title>
            </Head>
            <Box w={'full'} h={'full'} display={'flex'} position={'relative'}>
                <Box>
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

export default LayoutDesktop
