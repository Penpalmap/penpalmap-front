import { useContext, useMemo, useCallback } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import { updateMessageIsReadByRoom } from '../../api/chatApi'
import { sendMessageSeen } from '../../sockets/socketManager'
import ConversationItem from './ConversationItem'
import { useRoom } from '../../context/RoomsContext'
import { sortRoomsByLastMessageDate } from '../../utils/messageFunction'
import { useMobileView } from '../../context/MobileViewContext'

const ConversationList = () => {
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { rooms, resetCountUnreadMessagesOfRoom } = useRoom()

    const { setMobileView } = useMobileView()

    const clickOnConversation = useCallback(
        async (members) => {
            const user = members?.find(
                (member) => member.id !== session?.user?.id
            )
            if (user) {
                const roomIncludeUser = rooms.find((room) =>
                    room.members.includes(user)
                )
                if (roomIncludeUser) {
                    setAppData({
                        ...appData,
                        userChat: user,
                        chatOpen: true,
                    })
                    resetCountUnreadMessagesOfRoom(roomIncludeUser.id)

                    await updateMessageIsReadByRoom(roomIncludeUser.id, user.id)
                    const lastMessage =
                        roomIncludeUser.messages[
                            roomIncludeUser.messages.length - 1
                        ]

                    if (lastMessage) {
                        sendMessageSeen(appData.socket, lastMessage)
                    }

                    setMobileView('chat')
                }
            }
        },
        [
            appData,
            resetCountUnreadMessagesOfRoom,
            rooms,
            session?.user?.id,
            setAppData,
            setMobileView,
        ]
    )

    const conversationsRender = useMemo(
        () =>
            rooms
                .sort(sortRoomsByLastMessageDate)
                .map((room, index) => (
                    <ConversationItem
                        clickOnRoom={clickOnConversation}
                        lastMessage={room.messages[0]}
                        members={room.members}
                        sessionUserId={session?.user?.id}
                        countUnreadMessages={room.countUnreadMessages}
                        key={index}
                    />
                )),
        [clickOnConversation, rooms, session?.user?.id]
    )

    return (
        <VStack
            w={'280px'}
            left={0}
            zIndex={1}
            h={'full'}
            px={2}
            py={4}
            gap={2}
            overflowY={'auto'}
            background={'whiteAlpha.900'}
            backdropFilter={'blur(4px)'}
            sx={{
                '&::-webkit-scrollbar': {
                    width: '4px',
                },
                '&::-webkit-scrollbar-track': {
                    width: '6px',
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'gray.500',
                    borderRadius: '24px',
                },
            }}
        >
            <Box w={'full'}>{conversationsRender}</Box>
        </VStack>
    )
}

export default ConversationList
