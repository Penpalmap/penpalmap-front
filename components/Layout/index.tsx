import { Box, Flex } from '@chakra-ui/react'
import Footer from './footer'
import { useRouter } from 'next/router'
import Header from './header'
import { useMobileView } from '../../context/MobileViewContext'
import { useEffect, useState } from 'react'

const Layout = ({ children }) => {
  const router = useRouter()
  const { mobileView, isMobile } = useMobileView()

  const [viewportHeight, setViewportHeight] = useState('100vh')

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(`${window.innerHeight}px`)
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Flex direction={'column'} h={viewportHeight}>
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
