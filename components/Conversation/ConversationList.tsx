import { useContext, useMemo, useCallback } from 'react'
import { Flex, Image, Text, VStack } from '@chakra-ui/react'
import { AppContext } from '../../context/AppContext'
import { useSession } from '../../hooks/useSession'
import ConversationItem from './ConversationItem'
import { useRoom } from '../../context/RoomsContext'
import { useMobileView } from '../../context/MobileViewContext'
import { useTranslation } from 'next-i18next'

const ConversationList = () => {
  const { user } = useSession()
  const [appData, setAppData] = useContext(AppContext)
  const { rooms, resetCountUnreadMessagesOfRoom } = useRoom()
  const { t } = useTranslation()

  const { setMobileView } = useMobileView()

  const clickOnConversation = useCallback(
    async (roomId: string) => {
      const room = rooms.find((room) => room.id === roomId)
      if (room) {
        setAppData({
          ...appData,
          chatData: {
            roomChatId: room.id,
            userChat:
              room?.members?.find((member) => member.id !== user?.id) || null,
          },
          chatOpen: true,
        })
        resetCountUnreadMessagesOfRoom(roomId)

        setMobileView('chat')
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
        .filter((room) => {
          return !user?.blockedUsers?.some((blockedUser) =>
            room.members?.some((member) => member.id === blockedUser.id)
          )
        })
        .sort((a, b) => {
          return (
            new Date(b.lastMessage?.createdAt ?? 0).getTime() -
            new Date(a.lastMessage?.createdAt ?? 0).getTime()
          )
        })
        .map((room, index) => (
          <ConversationItem
            clickOnRoom={clickOnConversation}
            room={room}
            sessionUserId={user?.id}
            isUnreadMessages={room.isUnreadMessages}
            key={index}
          />
        )),
    [clickOnConversation, rooms, user?.blockedUsers, user?.id]
  )

  return (
    <Flex
      flex={1}
      flexDirection={'column'}
      w={{ base: 'full', md: 'xs' }}
      left={0}
      zIndex={1}
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
