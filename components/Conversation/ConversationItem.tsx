import { Flex, Avatar, AvatarBadge, Icon, Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Message, User } from '../../types'
import useLocation from '../../hooks/useLocation'

type ConversationItemProps = {
    clickOnRoom: (members: User[]) => void
    members: User[]
    lastMessage: Message | undefined
    countUnreadMessages: string
    sessionUserId: string | undefined
}

const ConversationItem = ({
    clickOnRoom,
    members,
    lastMessage,
    countUnreadMessages,
    sessionUserId,
}: ConversationItemProps) => {
    const user = members?.find((member) => member.id !== sessionUserId)
    const { flag } = useLocation(user?.latitude, user?.longitude)

    return (
        <Flex
            p={2}
            w={'full'}
            onClick={() => clickOnRoom(members)}
            cursor={'pointer'}
            _hover={{
                background: 'gray.200',
            }}
            borderRadius={'md'}
        >
            <Flex position="relative" mr={2}>
                <Avatar
                    src={user?.image}
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
                        border="1px solid white"
                        borderRadius="4px"
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
                    <Text
                        fontSize={'sm'}
                        fontWeight={'bold'}
                        color={'gray.700'}
                    >
                        {user?.name}
                    </Text>
                </Box>
                <Box>
                    <Text
                        fontSize={'.8em'}
                        whiteSpace={'nowrap'}
                        textOverflow={'ellipsis'}
                    >
                        {lastMessage?.senderId === sessionUserId && 'Vous : '}
                        {lastMessage?.content} -{' '}
                        {dayjs(lastMessage?.createdAt).format('D MMM')}
                    </Text>
                </Box>
            </Flex>

            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                flex={1}
                pl={2}
            >
                {parseInt(countUnreadMessages) > 0 && (
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
