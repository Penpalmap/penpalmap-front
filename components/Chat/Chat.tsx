import { Box, Text } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import useChat from '../../hooks/useChat'
import { useContext, useEffect, useRef } from 'react'
import { Message } from '../../types'
import { Socket, io } from 'socket.io-client'
import useGenderFolder from '../../hooks/useGenderFolder'

const Chat = ({ visible }) => {
    const { user } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { room, sendMessage, messages, offset, setOffset, isLoading } =
        useChat()

    console.log('chat render')

    const socket = useRef<Socket>()

    const { genderFolder } = useGenderFolder(appData?.userChat?.gender || '')

    useEffect(() => {
        if (user?.id) {
            socket.current = io(process.env.NEXT_PUBLIC_API_URL as string)
            // socket.current.emit(SocketEvents.AddUser, user.id)
            setAppData((prevData) => ({
                ...prevData,
                socket: socket.current,
            }))
        }
    }, [user?.id, setAppData])

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
            <Text color={'red.500'} fontWeight={'bold'} px={4} py={2}>
                socket id : {appData?.socket?.id}
            </Text>
            <Text color={'green.500'} fontWeight={'bold'} px={4} py={2}>
                room id : {room?.id}
            </Text>
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
