import { useRouter } from 'next/router'
import { useBreakpointValue } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import Loading from '../components/Layout/loading'
import Modal from 'react-modal'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import LayoutMobile from '../components/Layout/LayoutMobile'
import LayoutDesktop from '../components/Layout/LayoutDesktop'
Modal.setAppElement('#__next')

export default function Home() {
    const { data: session, status } = useSession()
    const router = useRouter()

    const isMobile = useBreakpointValue({ base: true, md: false })

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
