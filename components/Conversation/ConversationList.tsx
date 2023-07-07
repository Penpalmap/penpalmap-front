import { useContext, useEffect, useMemo } from 'react'
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
import useConversations from '../../hooks/useConversations'
import { useSession } from 'next-auth/react'
import { updateMessageIsReadByRoom } from '../../api/chatApi'

const ConversationList = () => {
    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)
    const { conversations } = useConversations()

    const clickOnConversation = async (members) => {
        const user = members?.find((member) => member.id !== session?.user?.id)
        if (user) {
            const room = conversations.find((conversation) =>
                conversation.members.includes(user)
            )
            if (room) {
                setAppData({
                    ...appData,
                    userTarget: user,
                    chatOpen: true,
                    conversations: conversations.map((conversation) => {
                        if (conversation.id === room.id) {
                            return {
                                ...conversation,
                                countUnreadMessages: 0,
                            }
                        }
                        return conversation
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
            px={4}
            bg={'white'}
            h={'full'}
            gap={2}
            width={'20'}
            overflowY={'scroll'}
        >
            <Box my={2}>
                <FontAwesomeIcon icon={faBars} />
            </Box>
            <Divider />
            {conversations.map((conversation, index) => {
                return (
                    <Avatar
                        key={index}
                        src={
                            conversation?.members?.find(
                                (member) => member.id !== session?.user?.id
                            )?.image
                        }
                        name={
                            conversation?.members?.find(
                                (member) => member.id !== session?.user?.id
                            )?.name
                        }
                        size={'md'}
                        onClick={() =>
                            clickOnConversation(conversation.members)
                        }
                        cursor={'pointer'}
                    >
                        {conversation.countUnreadMessages > 0 && (
                            <AvatarBadge
                                borderColor="papayawhip"
                                bg="red.400"
                                boxSize="1.2em"
                            >
                                <Text fontSize={'x-small'} color={'white'}>
                                    {conversation.countUnreadMessages}
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
