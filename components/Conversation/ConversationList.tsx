import { useContext, useMemo, useCallback } from 'react'
import { Flex, Image, Text, VStack } from '@chakra-ui/react'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import { updateMessageIsReadByRoom } from '../../api/chatApi'
import { sendMessageSeen } from '../../sockets/socketManager'
import ConversationItem from './ConversationItem'
import { useRoom } from '../../context/RoomsContext'
import { sortRoomsByLastMessageDate } from '../../utils/messageFunction'
import { useMobileView } from '../../context/MobileViewContext'
import { useTranslation } from 'next-i18next'

const ConversationList = () => {
    const { user } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { rooms, resetCountUnreadMessagesOfRoom } = useRoom()
    const { t } = useTranslation()

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

                    if (
                        lastMessage &&
                        lastMessage.isSeen === false &&
                        appData?.socket
                    ) {
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
        <Flex
            flex={1}
            flexDirection={'column'}
            w={{ base: 'full', md: 'xs' }}
            left={0}
            zIndex={1}
            height={'full'}
            overflowY={'auto'}
            maxH={'calc(100vh - 56px)'}
            px={2}
            py={4}
            gap={2}
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
            <Text
                fontSize={'small'}
                paddingLeft={'2'}
                fontWeight={'bold'}
                marginBottom={'2'}
                color={'gray.500'}
            >
                {t('conversation.conversations')} ({rooms.length})
            </Text>
            {conversationsRender}

            {rooms.length === 0 && (
                <VStack
                    h={'full'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                >
                    <Image
                        src={'/images/begin_chat.svg'}
                        width={'150px'}
                        alt="no conversations"
                    />
                    <Text
                        fontSize={'small'}
                        paddingLeft={'2'}
                        marginBottom={'2'}
                        textAlign={'center'}
                        color={'gray.500'}
                    >
                        {t('conversation.noConversation')}
                        <br />
                        {t('conversation.noConversationText')}
                    </Text>
                    <Text
                        textAlign={'center'}
                        fontSize={'small'}
                        paddingLeft={'2'}
                        marginBottom={'2'}
                        color={'gray.500'}
                    ></Text>
                </VStack>
            )}
        </Flex>
    )
}

export default ConversationList
