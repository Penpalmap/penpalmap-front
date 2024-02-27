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
  const {
    room,
    sendMessage,
    messages,
    offset,
    setOffset,
    isLoading,
    otherUser,
  } = useChat()

  const { genderFolder } = useGenderFolder(otherUser?.gender || '')
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
      zIndex={1000}
    >
      <ChatHeader
        name={otherUser?.name}
        photoUrl={
          otherUser?.image ||
          `/images/avatar/${genderFolder}/${otherUser?.avatarNumber}.png`
        }
        isOnline={otherUser?.isOnline}
        userId={otherUser?.id}
      />

      <ChatMessages
        messages={messages}
        isNewChat={!room}
        offset={offset}
        setOffset={setOffset}
        isLoading={isLoading}
        otherUser={otherUser}
      />

      {user?.id && (
        <ChatInput room={room} senderId={user?.id} sendMessage={sendMessage} />
      )}
    </Box>
  )
}

export default Chat
