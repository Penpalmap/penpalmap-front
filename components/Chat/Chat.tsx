import { Box } from '@chakra-ui/react'
import ChatHeader from './ChatHeader'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import useChat from '../../hooks/useChat'
import { useContext, useEffect, useRef } from 'react'
import { Message } from '../../types'
import { Socket, io } from 'socket.io-client'
import { SocketEvents } from '../../constants/socketEnum'

const Chat = ({ visible }) => {
    const { user } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { room, sendMessage, messages, offset, setOffset, isLoading } =
        useChat()

    const genderFolder =
        appData?.userChat?.gender === 'man' ||
        appData?.userChat?.gender === 'woman'
            ? appData?.userChat?.gender
            : 'other'

    const socket = useRef<Socket>()

    useEffect(() => {
        if (user?.id) {
            socket.current = io(process.env.NEXT_PUBLIC_API_URL as string)
            socket.current.emit(SocketEvents.AddUser, user.id)
            setAppData((prevData) => ({
                ...prevData,
                socket: socket.current,
            }))
        }
    }, [user?.id, setAppData])

    const sortByDate = (a: Message, b: Message) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    }

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
            zIndex={1000}
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
                messages={messages.sort(sortByDate)}
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
