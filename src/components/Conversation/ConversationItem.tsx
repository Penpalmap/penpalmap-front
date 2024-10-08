import { Flex, Avatar, AvatarBadge, Icon, Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Room } from '../../types'
import useLocation from '../../hooks/useLocation'
import { useTranslation } from 'next-i18next'
import useGenderFolder from '../../hooks/useGenderFolder'

type ConversationItemProps = {
  clickOnRoom: (roomId: string) => void
  room: Room
  isUnreadMessages: boolean
  sessionUserId: string | undefined
}

const ConversationItem = ({
  clickOnRoom,
  room,
  isUnreadMessages,
  sessionUserId,
}: ConversationItemProps) => {
  const user = room.members?.find((member) => member.id !== sessionUserId)
  const { flag } = useLocation(
    user?.geom?.coordinates?.[1] ?? 0,
    user?.geom?.coordinates?.[0] ?? 0
  )
  const { t } = useTranslation('common')
  const { genderFolder } = useGenderFolder(user?.gender || ' ')

  return (
    <Flex
      p={2}
      w={'full'}
      onClick={() => clickOnRoom(room.id)}
      cursor={'pointer'}
      _hover={{
        background: 'gray.200',
      }}
      borderRadius={'md'}
    >
      <Flex position="relative" mr={2}>
        <Avatar
          src={
            user?.image
              ? user?.image
              : `/images/avatar/${genderFolder}/${user?.avatarNumber}.png`
          }
          name={user?.name}
          size={'md'}
          borderWidth={'medium'}
          borderColor={'white'}
        >
          <AvatarBadge
            bg={user?.isOnline ? 'green.500' : 'gray.200'}
            boxSize=".8em"
            borderWidth={'2px'}
          />
        </Avatar>
        {flag && (
          <Box
            background={`url(${flag}) center/cover`}
            width="20px"
            height="15px"
            position="absolute"
            bottom="-1px"
            left="-1px"
            borderRadius="2px"
            backgroundColor={'white'}
          />
        )}
      </Flex>

      <Flex
        flex={4}
        flexDirection={'column'}
        justifyContent={'center'}
        overflow={'hidden'}
      >
        <Box>
          <Text fontSize={'sm'} fontWeight={'bold'} color={'gray.700'}>
            {user?.name}
          </Text>
        </Box>
        <Flex gap={1}>
          <Text
            fontSize={'.8em'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
          ></Text>
          <Text
            fontSize={'.8em'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
          >
            {room.lastMessage?.sender?.id === sessionUserId
              ? t('chat.you')
              : ''}{' '}
          </Text>
          <Text
            fontSize={'.8em'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
            fontWeight={isUnreadMessages ? 'bold' : 'normal'}
          >
            {room.lastMessage?.content}
          </Text>

          <Text
            fontSize={'.8em'}
            whiteSpace={'nowrap'}
            textOverflow={'ellipsis'}
          >
            - {dayjs(room.lastMessage?.createdAt).format('D MMM')}
          </Text>
        </Flex>
      </Flex>

      <Flex justifyContent={'center'} alignItems={'center'} flex={1} pl={2}>
        {isUnreadMessages && (
          <Icon viewBox="0 0 200 200" color="red.400">
            <path
              fill="currentColor"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
        )}
      </Flex>
    </Flex>
  )
}

export default ConversationItem
