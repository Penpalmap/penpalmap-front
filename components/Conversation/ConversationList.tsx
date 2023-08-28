import { useContext } from 'react'
import {
    Avatar,
    AvatarBadge,
    Box,
    Divider,
    Flex,
    Text,
    VStack,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { AppContext } from '../../context/AppContext'
import { useSession } from 'next-auth/react'
import { updateMessageIsReadByRoom } from '../../api/chatApi'
import useRooms from '../../hooks/useRooms'

const ConversationList = () => {
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { rooms } = useRooms()

    console.log('rooms', rooms)

    //  TODO : mettre dans le hook useConversations
    const clickOnConversation = async (members) => {
        const user = members?.find((member) => member.id !== session?.user?.id)
        if (user) {
            const room = rooms.find((room) => room.members.includes(user))
            if (room) {
                setAppData({
                    ...appData,
                    userChat: user,
                    chatOpen: true,
                    rooms: rooms.map((room) => {
                        if (room.id === room.id) {
                            return {
                                ...room,
                                countUnreadMessages: '0',
                            }
                        }
                        return room
                    }),
                })

                await updateMessageIsReadByRoom(room.id, user.id)
            }
        }
    }

    return (
        <VStack
            position={'absolute'}
            w={'280px'}
            left={0}
            zIndex={1}
            bg={'white'}
            h={'full'}
            px={2}
            py={4}
            gap={2}
            overflowY={'auto'}
            background={'whiteAlpha.600'}
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
            <Box my={2}>
                <FontAwesomeIcon icon={faBars} />
            </Box>
            <Divider />
            <Box w={'full'}>
                {rooms.map((room, index) => {
                    return (
                        <Flex
                            key={index}
                            p={2}
                            w={'full'}
                            onClick={() => clickOnConversation(room.members)}
                            cursor={'pointer'}
                            _hover={{
                                background: 'gray.200',
                            }}
                            borderRadius={'md'}
                        >
                            <Avatar
                                src={
                                    room?.members?.find(
                                        (member) =>
                                            member.id !== session?.user?.id
                                    )?.image
                                }
                                name={
                                    room?.members?.find(
                                        (member) =>
                                            member.id !== session?.user?.id
                                    )?.name
                                }
                                size={'md'}
                                mr={2}
                                borderWidth={'medium'}
                                borderColor={'white'}
                            >
                                {parseInt(room.countUnreadMessages) > 0 && (
                                    <AvatarBadge
                                        borderColor="papayawhip"
                                        bg="red.400"
                                        boxSize="1.2em"
                                    >
                                        <Text
                                            fontSize={'x-small'}
                                            color={'white'}
                                        >
                                            {room.countUnreadMessages}
                                        </Text>
                                    </AvatarBadge>
                                )}
                            </Avatar>
                            <Flex
                                flex={3}
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
                                            room?.members?.find(
                                                (member) =>
                                                    member.id !==
                                                    session?.user?.id
                                            )?.name
                                        }
                                    </Text>
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={'small'}
                                        whiteSpace={'nowrap'}
                                    >
                                        {room?.lastMessage}
                                    </Text>
                                </Box>
                            </Flex>
                        </Flex>
                    )
                })}
            </Box>
        </VStack>
    )
}

export default ConversationList
