import { Box, Flex } from '@chakra-ui/react'
import Header from './header'
import Footer from './footer'
import { useSession } from '../../hooks/useSession'

const Layout = ({ children }) => {
  const { status } = useSession()

  return (
    <Flex direction={'column'} h={'100vh'}>
      {/* <Box height={'4rem'}>
        <Header />
      </Box> */}
      <Box style={{ flexGrow: 1 }}>{children}</Box>
      {status === 'unauthenticated' && <Footer />}
    </Flex>
  )
}

export default Layout
