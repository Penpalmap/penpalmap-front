import { Box } from '@chakra-ui/react'
import Chat from '../Chat/Chat'
import Head from 'next/head'
import Map from '../Map/Map'
import ConversationList from '../Conversation/ConversationList'
import { useRoom } from '../../context/RoomsContext'
import Header from './header'
import { useRouter } from 'next/router'

const LayoutDesktop = () => {
  const { isUnreadMessages } = useRoom()
  const router = useRouter()
  console.log('isUnreadMessages')
  return (
    <>
      <Head>
        <title>
          {!isUnreadMessages ? `MeetMapper` : `New Message! MeetMapper`}
        </title>
      </Head>
      {router.pathname !== '/auth/signup' &&
        router.pathname !== '/auth/signin' &&
        router.pathname !== '/create-profile' && <Header />}
      <Box
        w={'full'}
        h={'calc(100vh - 4rem)'}
        overflow={'hidden'}
        display={'flex'}
        position={'relative'}
      >
        <ConversationList />
        <Box flex={3}>
          <Map />
        </Box>
        <Chat visible={true} />
      </Box>
    </>
  )
}

export default LayoutDesktop
