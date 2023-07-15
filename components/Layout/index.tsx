import { Box } from '@chakra-ui/react'
import Header from './header'
import Modal from 'react-modal'
import { useRouter } from 'next/router'
import ProfilePage from '../../pages/profile/[profileId]'

Modal.setAppElement('#__next')
const Layout = ({ children }) => {
    const router = useRouter()
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
        },
    }

    return (
        <>
            <Box>
                <Header />
                <Box w={'100%'} h={'calc(100vh - 70px)'}>
                    {children}
                </Box>
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
        </>
    )
}

export default Layout
