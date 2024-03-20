import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import useChat from '../../hooks/useChat'
import { useContext } from 'react'
import useGenderFolder from '../../hooks/useGenderFolder'

const Chat = ({ visible }) => {
  const { user } = useSession()
  const [appData] = useContext(AppContext)
  const { room, sendMessage, messages, offset, setOffset } = useChat()

  const { genderFolder } = useGenderFolder(
    appData?.chatData?.userChat?.gender || ''
  )
  return (
    <Box
      position={{ base: 'initial', md: 'absolute' }}
      right={'10'}
      bottom={'0'}
      background={'white'}
      h={{ base: '100vh', md: 'xl' }}
      flexDirection={'column'}
      w={{ base: 'full', md: 'xl' }}
      display={appData.chatOpen && visible ? 'flex' : 'none'}
      borderTopRadius={'8'}
      zIndex={9000}
      boxShadow={'md'}
    >
      <ChatHeader
        name={appData?.chatData?.userChat?.name}
        photoUrl={
          appData?.chatData?.userChat?.image ||
          `/images/avatar/${genderFolder}/${appData?.chatData?.userChat?.avatarNumber}.png`
        }
        isOnline={appData?.chatData?.userChat?.isOnline}
        userId={appData?.chatData?.userChat?.id}
      />

      <ChatMessages
        messages={messages}
        isNewChat={!room}
        offset={offset}
        setOffset={setOffset}
      />

      {user?.id && <ChatInput room={room} sendMessage={sendMessage} />}
    </Box>
  )
}

export default Chat
