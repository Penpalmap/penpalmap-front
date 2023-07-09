import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import { Socket } from 'socket.io-client'
import useChat from '../../hooks/useChat'
import { useContext, useState } from 'react'
import { Message } from '../../types'

const Chat = () => {
    const { data: session } = useSession()
    const [appData] = useContext(AppContext)
    const { room, sendMessage } = useChat()

    const sortByDate = (a: Message, b: Message) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }

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
            <ChatMessages messages={room?.messages.sort(sortByDate)} />

            {session?.user?.id && (
                <ChatInput
                    room={room}
                    senderId={session?.user?.id}
                    sendMessage={sendMessage}
                />
            )}
        </Box>
    )
}

export default Chat
