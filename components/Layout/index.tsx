import { Box, Flex, VStack } from '@chakra-ui/react'
import Header from './header'
import { useRouter } from 'next/router'
import ProfilePage from '../../pages/profile/[profileId]'
import Footer from './footer'
// import { useSession } from '../../hooks/useSession'
import SettingsPage from '../../pages/settings'
import { useSession } from '../../hooks/useSession'
import Profile from '../Profile'
import { Modal } from '../Elements/Modal'

// Modal.setAppElement('#__next')
const Layout = ({ children }) => {
    const router = useRouter()

    const { status } = useSession()

    console.log('router.query.profileId', router.query.profileId)

    return (
        <>
            <Flex direction={'column'} h={'100vh'}>
                <Box height={'4rem'}>
                    <Header />
                </Box>
                <Box style={{ flexGrow: 1 }}>{children}</Box>
                {status === 'unauthenticated' && <Footer />}
            </Flex>
        </>
    )
}

export default Layout
