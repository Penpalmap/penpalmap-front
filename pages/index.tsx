import { useSession } from './../hooks/useSession'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'

import { useBreakpointValue } from '@chakra-ui/react'
import { useEffect } from 'react'
import Router from 'next/router'
Modal.setAppElement('#__next')

export default function Home() {
    const { status, user, refreshTokenFunc } = useSession()
    const isMobile = useBreakpointValue({ base: true, md: false })

    return status === 'loading' || user?.isNewUser ? (
        <Loading />
    ) : isMobile ? (
        <LayoutMobile />
    ) : (
        <LayoutDesktop />
    )
}

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}
