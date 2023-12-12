import { Box } from '@chakra-ui/react'
import Header from './header'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfilePage from '../../pages/profile/[profileId]'
import Footer from './footer'
// import { useSession } from '../../hooks/useSession'
import SettingsPage from '../../pages/settings'
import { useSession } from '../../hooks/useSession'

Modal.setAppElement('#__next')
const Layout = ({ children }) => {
    const router = useRouter()

    const { status } = useSession()
    // if (
    //     status === 'authenticated' &&
    //     (router.pathname === '/auth/signup' ||
    //         router.pathname === '/auth/signin')
    // ) {
    //     router.push('/')
    // }

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '90%',
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '0',
        },
    }

    return (
        <>
            <Box>
                <Header />
                <Box w={'100%'}>{children}</Box>
                {status === 'unauthenticated' && <Footer />}
            </Box>
            <Modal
                isOpen={!!router.query.profileId}
                onRequestClose={() => {
                    router.push('/')
                }}
                style={customStyles}
            >
                <ProfilePage />
            </Modal>
            <Modal
                isOpen={!!router.query.settings}
                onRequestClose={() => {
                    router.push('/')
                }}
                style={customStyles}
            >
                <SettingsPage />
            </Modal>
        </>
    )
}

export default Layout
