import { useSession } from './../hooks/useSession'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'

import { useBreakpointValue } from '@chakra-ui/react'
import Head from 'next/head'
Modal.setAppElement('#__next')

export default function Home() {
    const { status, user } = useSession()
    const isMobile = useBreakpointValue({ base: true, md: false })

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content="Connect with friends from all over the world, wherever you are. Make friends, learn languages and discover new cultures whatever your location"
                ></meta>
            </Head>
            {status === 'loading' || user?.isNewUser ? (
                <Loading />
            ) : isMobile ? (
                <LayoutMobile />
            ) : (
                <LayoutDesktop />
            )}
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
