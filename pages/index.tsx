import Router from 'next/router'
import { useBreakpointValue } from '@chakra-ui/react'
import { useSession } from './../hooks/useSession'
import { use, useCallback, useEffect } from 'react'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'
import { jwtDecode } from 'jwt-decode'
import { refreshToken } from '../api/authApi'
Modal.setAppElement('#__next')

export default function Home() {
    const { session, status } = useSession()

    const isMobile = useBreakpointValue({ base: true, md: false })
    const checkTokenExpiration = useCallback(async () => {
        const token = localStorage.getItem('acccessToken')
        if (token) {
            const decoded = jwtDecode(token)
            if (decoded.exp) {
                if (decoded.exp < Date.now() / 1000) {
                    await refreshToken(session?.refreshToken)
                }
            }
        }
    }, [session?.refreshToken])

    useEffect(() => {
        checkTokenExpiration()
        if (session?.user?.isNewUser) {
            Router.push('/create-profile')
        }

        if (status === 'unauthenticated') {
            Router.push('/auth/signin')
        }

        if (status === 'authenticated') {
            Router.push('/')
        }
    }, [checkTokenExpiration, session, status])

    return status === 'loading' || session?.user?.isNewUser ? (
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
