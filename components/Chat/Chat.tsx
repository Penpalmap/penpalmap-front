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

    const genderFolder = appData?.userChat?.gender || 'other'

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
            position={{ base: 'initial', md: 'absolute' }}
            right={'10'}
            bottom={'0'}
            background={'white'}
            h={{ base: 'calc(100vh - 7.5rem )', md: 'xl' }}
            flexDirection={'column'}
            w={{ base: 'full', md: 'xl' }}
            display={appData.chatOpen ? 'flex' : 'none'}
            borderTopRadius={'8'}
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

            {/* <Box flex={1}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Deleniti velit, perspiciatis ipsa voluptatum voluptate in, sint
                animi iusto dolor id illo possimus ex enim assumenda vel error.
                Nemo, natus corporis!
            </Box> */}
            {/* <Box background={'facebook.300'} overflowY={'scroll'} flex={2}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Impedit odio ipsam dolorum nulla, expedita mollitia rem deserunt
                ipsum corporis illum temporibus dicta facilis quos, distinctio
                quas, unde repudiandae exercitationem accusantium?Lorem, ipsum
                dolor sit amet consectetur adipisicing elit. Impedit odio ipsam
                dolorum nulla, expedita mollitia rem deserunt ipsum corporis
                illum temporibus dicta facilis quos, distinctio quas, unde
                repudiandae exercitationem accusantium?Lorem, ipsum dolor sit
                amet consectetur adipisicing elit. Impedit odio ipsam dolorum
                nulla, expedita mollitia rem deserunt ipsum corporis illum
                temporibus dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium?Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Impedit odio ipsam dolorum nulla,
                expedita mollitia rem deserunt ipsum corporis illum temporibus
                dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium?Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Impedit odio ipsam dolorum nulla,
                expedita mollitia rem deserunt ipsum corporis illum temporibus
                dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium?Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Impedit odio ipsam dolorum nulla,
                expedita mollitia rem deserunt ipsum corporis illum temporibus
                dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium?Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Impedit odio ipsam dolorum nulla,
                expedita mollitia rem deserunt ipsum corporis illum temporibus
                dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium? Lorem, ipsum dolor sit amet
                consectetur adipisicing elit. Impedit odio ipsam dolorum nulla,
                expedita mollitia rem deserunt ipsum corporis illum temporibus
                dicta facilis quos, distinctio quas, unde repudiandae
                exercitationem accusantium?
            </Box> */}

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
