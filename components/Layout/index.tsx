import { Box, Flex } from '@chakra-ui/react'
import Footer from './footer'
import { useRouter } from 'next/router'
import Header from './header'
import { useMobileView } from '../../context/MobileViewContext'

const Layout = ({ children }) => {
  const router = useRouter()
  const { mobileView, isMobile } = useMobileView()

  return (
    <Flex direction={'column'} h={'100vh'}>
      {router.pathname !== '/auth/signup' &&
        router.pathname !== '/auth/signin' &&
        !(isMobile && mobileView === 'chat') &&
        router.pathname !== '/create-profile' && (
          <Box h={'4rem'}>
            <Header />
          </Box>
        )}

      <Box style={{ flexGrow: 1 }}>{children}</Box>
      {router.pathname !== '/home' &&
        router.pathname !== '/auth/signup' &&
        router.pathname !== '/auth/signin' &&
        router.pathname !== '/create-profile' && <Footer />}
    </Flex>
  )
}

export default Layout
