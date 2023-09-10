import { useContext, useMemo, useCallback } from 'react'
import { Box, VStack } from '@chakra-ui/react'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import { updateMessageIsReadByRoom } from '../../api/chatApi'
import useRooms from '../../hooks/useRooms'
import { Room } from '../../types'
import { sendMessageSeen } from '../../sockets/socketManager'
import ConversationItem from './ConversationItem'

const ConversationList = () => {
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { rooms } = useRooms()

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
                        rooms: rooms.map((room) => {
                            if (room.id === roomIncludeUser.id) {
                                return {
                                    ...room,
                                    countUnreadMessages: '0',
                                }
                            }
                            return room
                        }),
                    })

                    await updateMessageIsReadByRoom(roomIncludeUser.id, user.id)
                    const lastMessage =
                        roomIncludeUser.messages[
                            roomIncludeUser.messages.length - 1
                        ]

                    if (lastMessage) {
                        sendMessageSeen(appData.socket, lastMessage)
                    }
                }
            }
        },
        [appData, rooms, session?.user?.id, setAppData]
    )

    const sortByLastMessageDate = (a: Room, b: Room) => {
        if (
            a.messages.length > 0 &&
            b.messages.length > 0 &&
            a.messages[0] &&
            b.messages[0]
        ) {
            return (
                new Date(b.messages[0].createdAt).getTime() -
                new Date(a.messages[0].createdAt).getTime()
            )
        } else if (a.messages.length > 0) {
            return -1
        } else if (b.messages.length > 0) {
            return 1
        } else {
            return 0
        }
    }

    const conversationsRender = useMemo(
        () =>
            rooms
                .sort(sortByLastMessageDate)
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
            // position={'absolute'}
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
