import { Box, Text } from '@chakra-ui/react'
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
    const { room, sendMessage, messages, offset, setOffset, isLoading } =
        useChat()

    const { genderFolder } = useGenderFolder(appData?.userChat?.gender || '')
    return (
        <Box
            position={{ base: 'initial', md: 'absolute' }}
            right={'10'}
            bottom={'0'}
            background={'white'}
            h={{ base: 'calc(100vh - 7.5rem )', md: 'xl' }}
            flexDirection={'column'}
            w={{ base: 'full', md: 'xl' }}
            display={appData.chatOpen && visible ? 'flex' : 'none'}
            borderTopRadius={'8'}
            zIndex={10000}
        >
            <ChatHeader
                name={appData?.userChat?.name}
                photoUrl={
                    appData?.userChat?.image ||
                    `/images/avatar/${genderFolder}/${appData?.userChat?.avatarNumber}.png`
                }
                isOnline={appData?.userChat?.isOnline}
                userId={appData?.userChat?.id}
            />

            <ChatMessages
                messages={messages}
                isNewChat={!room}
                offset={offset}
                setOffset={setOffset}
                isLoading={isLoading}
            />

            {user?.id && (
                <ChatInput
                    room={room}
                    senderId={user?.id}
                    sendMessage={sendMessage}
                />
            )}
        </Box>
    )
}

export default Chat
