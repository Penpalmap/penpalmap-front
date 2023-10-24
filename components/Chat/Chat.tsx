import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import useChat from '../../hooks/useChat'
import { useContext, useEffect, useRef } from 'react'
import { Message } from '../../types'
import { Socket, io } from 'socket.io-client'
import { SocketEvents } from '../../constants/socketEnum'

const Chat = () => {
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { room, sendMessage, messages, offset, setOffset, isLoading } =
        useChat()

    const socket = useRef<Socket>()

    useEffect(() => {
        if (session?.user?.id) {
            socket.current = io(process.env.NEXT_PUBLIC_API_URL as string)
            socket.current.emit(SocketEvents.AddUser, session.user.id)
            setAppData((prevData) => ({
                ...prevData,
                socket: socket.current,
            }))
        }
    }, [session?.user.id, setAppData])

    const sortByDate = (a: Message, b: Message) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }

    return (
        <Box
            position={'absolute'}
            right={'10'}
            bottom={'0'}
            background={'white'}
            h={'xl'}
            flexDirection={'column'}
            w={'lg'}
            display={appData.chatOpen ? 'flex' : 'none'}
            borderTopRadius={'8'}
        >
            <ChatHeader
                name={appData?.userChat?.name}
                photoUrl={
                    appData?.userChat?.image ||
                    'https://t4.ftcdn.net/jpg/02/89/59/55/360_F_289595573_wCKO1nxxx7HGk69z5szjvSOqPnZVTfTG.jpg'
                }
                isOnline={appData?.userChat?.isOnline}
                userId={appData?.userChat?.id}
            />
            <ChatMessages
                messages={messages.sort(sortByDate)}
                isNewChat={!room}
                offset={offset}
                setOffset={setOffset}
                isLoading={isLoading}
            />

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
