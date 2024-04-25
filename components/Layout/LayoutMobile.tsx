import Head from 'next/head'
import NavigationBar from '../Elements/NavigationBar'
import { Box, Flex } from '@chakra-ui/react'
import { useMobileView } from '../../context/MobileViewContext'
import Map from '../Map/Map'
import ConversationList from '../Conversation/ConversationList'
import Profile from '../Profile'
import { useSession } from './../../hooks/useSession'
import Chat from '../Chat/Chat'
import Settings from '../Settings/settings'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const LayoutMobile = () => {
  const { mobileView } = useMobileView()

  const { user } = useSession()

  const [appData] = useContext(AppContext)

  return (
    <>
      <Head>
        <title>MeetMapper</title>
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no"
        ></meta>
      </Head>
      <Flex
        w={'full'}
        h={'calc(100vh - 4rem)'}
        position={'relative'}
        flexDir={'column'}
      >
        <Box flex={1} overflowY={'auto'}>
          {mobileView === 'home' && <Map />}
          {mobileView === 'conversations' && <ConversationList />}
          {mobileView === 'profile' && user && appData?.userTarget?.id && (
            <Profile userId={appData.userTarget.id} />
          )}
          {mobileView === 'settings' && <Settings />}
          <Chat visible={mobileView === 'chat'} />
        </Box>
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
