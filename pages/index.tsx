import Router from 'next/router'
import { useBreakpointValue } from '@chakra-ui/react'
import { useSession } from './../hooks/useSession'
import { useEffect } from 'react'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'
import { jwtDecode } from 'jwt-decode'
Modal.setAppElement('#__next')

export default function Home() {
    const { session, status } = useSession()

    const isMobile = useBreakpointValue({ base: true, md: false })
    const checkTokenExpiration = () => {
        const token = localStorage.getItem('token')
        if (token) {
            const decoded = jwtDecode(token)
            if (decoded.exp) {
                if (decoded.exp < Date.now() / 1000) {
                    localStorage.removeItem('token')
                    Router.push('/auth/signin')
                }
            }
        }
    }
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
    }, [session, status])

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
