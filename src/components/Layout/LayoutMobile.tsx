import Head from 'next/head'
import NavigationBar from '../Elements/NavigationBar'
import { Box, Flex } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'
import Map from '../Map/Map'
import ConversationList from '../Conversation/ConversationList'
import Profile from '../Profile'
import { useSession } from '../../hooks/useSession'
import Chat from '../Chat/Chat'
import Settings from '../Settings/settings'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { useRouter } from 'next/router'
import Header from './header'
import Footer from './footer'

const LayoutMobile = () => {
  const { mobileView } = useMobileView()
  const { user } = useSession()
  const [appData] = useContext(AppContext)
  const router = useRouter()

  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    window.addEventListener('resize', setVH)
    setVH() // Set the variable at the initial load

    return () => window.removeEventListener('resize', setVH)
  }, [])

  return (
    <>
      <Head>
        <title>MeetMapper</title>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <Flex
        w={'full'}
        position={'relative'}
        flexDir={'column'}
        h={'calc(var(--vh, 1vh) * 100)'}
      >
        {router.pathname !== '/auth/signup' &&
          router.pathname !== '/auth/signin' &&
          mobileView !== 'chat' &&
          router.pathname !== '/create-profile' && <Header />}
        <Box flex={1} overflowY={'auto'}>
          {mobileView === 'home' && <Map />}
          {mobileView === 'conversations' && <ConversationList />}
          {mobileView === 'profile' && user && appData?.userTarget?.id && (
            <Profile userId={appData.userTarget.id} />
          )}
          {mobileView === 'settings' && <Settings />}
          <Chat visible={mobileView === 'chat'} />
        </Box>
        {router.pathname !== '/home' &&
          router.pathname !== '/auth/signup' &&
          router.pathname !== '/auth/signin' &&
          router.pathname !== '/create-profile' && <Footer />}
        <Box>
          {mobileView !== 'chat' &&
            mobileView !== 'profile' &&
            mobileView !== 'settings' && <NavigationBar />}
        </Box>
      </Flex>
    </>
  )
}

export default LayoutMobile
