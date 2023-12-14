import { useContext, useMemo, useCallback } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { updateMessageIsReadByRoom } from '../../api/chatApi'
import { sendMessageSeen } from '../../sockets/socketManager'
import ConversationItem from './ConversationItem'
import { useRoom } from '../../context/RoomsContext'
import { sortRoomsByLastMessageDate } from '../../utils/messageFunction'
import { useMobileView } from '../../context/MobileViewContext'

const ConversationList = () => {
    const { user } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { rooms, resetCountUnreadMessagesOfRoom } = useRoom()

    const { setMobileView } = useMobileView()

    const clickOnConversation = useCallback(
        async (members) => {
            const userMember = members?.find((member) => member.id !== user?.id)
            if (userMember) {
                const roomIncludeUser = rooms.find((room) =>
                    room.members.includes(userMember)
                )
                if (roomIncludeUser) {
                    setAppData({
                        ...appData,
                        userChat: userMember,
                        chatOpen: true,
                    })
                    resetCountUnreadMessagesOfRoom(roomIncludeUser.id)

                    await updateMessageIsReadByRoom(
                        roomIncludeUser.id,
                        userMember.id
                    )
                    const lastMessage =
                        roomIncludeUser.messages[
                            roomIncludeUser.messages.length - 1
                        ]

                    if (lastMessage && lastMessage.isSeen === false) {
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
            setAppData,
            setMobileView,
            user?.id,
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
                        sessionUserId={user?.id}
                        countUnreadMessages={room.countUnreadMessages}
                        key={index}
                    />
                )),
        [clickOnConversation, rooms, user?.id]
    )

    return (
        <VStack
            w={{ base: 'full', md: 'xs' }}
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
