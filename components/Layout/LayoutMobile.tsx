import Head from 'next/head'
import NavigationBar from '../Elements/NavigationBar'
import { Box } from '@chakra-ui/react'
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
        <title>PenpalMap</title>
      </Head>
      <Box w={'full'} h={'full'} display={'flex'} position={'relative'}>
        <Box flex={1}>
          {mobileView === 'home' && <Map />}
          {mobileView === 'conversations' && <ConversationList />}
          {mobileView === 'profile' && user && appData?.userTarget?.id && (
            <Profile profileId={appData.userTarget.id} />
          )}
          {mobileView === 'settings' && <Settings />}
          <Chat visible={mobileView === 'chat'} />
        </Box>
        <NavigationBar />
      </Box>
    </>
  )
}

export default LayoutMobile
