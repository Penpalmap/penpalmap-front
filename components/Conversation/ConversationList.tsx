import { useContext } from 'react'
import {
    Avatar,
    AvatarBadge,
    Box,
    Divider,
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
            {rooms.map((room, index) => {
                return (
                    <Avatar
                        key={index}
                        src={
                            room?.members?.find(
                                (member) => member.id !== session?.user?.id
                            )?.image
                        }
                        name={
                            room?.members?.find(
                                (member) => member.id !== session?.user?.id
                            )?.name
                        }
                        size={'md'}
                        onClick={() => clickOnConversation(room.members)}
                        cursor={'pointer'}
                        borderWidth={'medium'}
                        borderColor={'white'}
                    >
                        {parseInt(room.countUnreadMessages) > 0 && (
                            <AvatarBadge
                                borderColor="papayawhip"
                                bg="red.400"
                                boxSize="1.2em"
                            >
                                <Text fontSize={'x-small'} color={'white'}>
                                    {room.countUnreadMessages}
                                </Text>
                            </AvatarBadge>
                        )}
                    </Avatar>
                )
            })}
        </VStack>
    )
}

export default ConversationList
