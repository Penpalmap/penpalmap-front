import { Box, useDisclosure } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import { Socket } from 'socket.io-client'
import useChat from '../../hooks/useChat'
import { useContext, useEffect, useState } from 'react'

const Chat = () => {
    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    const [socket, setSocket] = useState<Socket | null>(null)
    const { room, connectToRoom, disconnectFromRoom, sendMessage } = useChat()

    useEffect(() => {
        appData?.conversations.forEach((conversation) => {
            connectToRoom(conversation.id)
        })
    }, [appData?.conversations, connectToRoom])

    return (
        <Box
            position={'absolute'}
            right={'10'}
            bottom={'0'}
            background={'white'}
            h={'sm'}
            flexDirection={'column'}
            w={'80'}
            display={appData.chatOpen ? 'flex' : 'none'}
            borderTopRadius={'8'}
        >
            <ChatHeader
                name={appData?.userTarget?.name}
                photoUrl={
                    appData?.userTarget?.image ||
                    'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg'
                }
                status="online"
            />
            <ChatMessages messages={room?.messages} />

            {session?.user?.id && (
                <ChatInput
                    room={room}
                    socket={socket}
                    senderId={session?.user?.id}
                    sendMessage={sendMessage}
                />
            )}
        </Box>
    )
}

export default Chat
