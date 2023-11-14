import { useRouter } from 'next/router'
import { Box, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Map from '../components/Map/Map'
import Chat from '../components/Chat/Chat'
import { useEffect } from 'react'
import ConversationList from '../components/Conversation/ConversationList'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import Head from 'next/head'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
Modal.setAppElement('#__next')

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { t } = useTranslation('common')

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

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}
