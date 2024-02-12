import { Box, Flex } from '@chakra-ui/react'
import Header from './header'
import Footer from './footer'
import { useSession } from '../../hooks/useSession'
import { useMobileView } from '../../context/MobileViewContext'

const Layout = ({ children }) => {
  const { status } = useSession()
  const { mobileView } = useMobileView()

  return (
    <>
      <Flex direction={'column'} h={'100vh'}>
        {mobileView !== 'chat' && (
          <Box height={'4rem'}>
            <Header />
          </Box>
        )}
        <Box style={{ flexGrow: 1 }}>{children}</Box>
        {status === 'unauthenticated' && <Footer />}
      </Flex>
    </>
  )
}

export default Layout
