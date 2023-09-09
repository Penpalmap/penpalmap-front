import { Flex, Avatar, AvatarBadge, Icon, Box, Text } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { Message, User } from '../../types'

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
            <Avatar
                src={
                    members?.find((member) => member.id !== sessionUserId)
                        ?.image
                }
                name={
                    members?.find((member) => member.id !== sessionUserId)?.name
                }
                size={'md'}
                mr={2}
                borderWidth={'medium'}
                borderColor={'white'}
            >
                <AvatarBadge
                    bg="green.400"
                    boxSize=".8em"
                    borderWidth={'2px'}
                />
            </Avatar>
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
                        {
                            members?.find(
                                (member) => member.id !== sessionUserId
                            )?.name
                        }
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
