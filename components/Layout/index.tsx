import { Box, Flex } from '@chakra-ui/react'
import Footer from './footer'
import { useRouter } from 'next/router'
import Header from './header'

const Layout = ({ children }) => {
  const router = useRouter()

  return (
    <Flex direction={'column'} h={'100vh'}>
      <Box h={'4rem'}>
        {router.pathname !== '/auth/signup' &&
          router.pathname !== '/auth/signin' && <Header />}
      </Box>
      <Box style={{ flexGrow: 1 }}>{children}</Box>
      {router.pathname !== '/home' &&
        router.pathname !== '/auth/signup' &&
        router.pathname !== '/auth/signin' &&
        router.pathname !== '/create-profile' && <Footer />}
    </Flex>
  )
}

export default Layout
