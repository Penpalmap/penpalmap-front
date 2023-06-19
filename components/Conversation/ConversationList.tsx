import { useContext, useEffect, useState } from 'react'
import { Conversation, User } from '../../types'
import { getConversations } from '../../api/conversationApi'
import { useSession } from 'next-auth/react'
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

const ConversationList = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])

    const { data: session } = useSession()
    const [appData, setAppData] = useContext(AppContext)

    useEffect(() => {
        async function fetchConversationsData() {
            try {
                const data = await getConversations(session?.user?.id as string)
                setConversations(data.rooms)
            } catch (error) {
                // Gérer les erreurs
            }
        }

        fetchConversationsData()
    }, [session?.user?.id])

    // const clickOnConversation = (user: User) => {
    //     setAppData({
    //         userTarget: user,
    //     })
    // }

    const clickOnConversation = (members: User[]) => {
        const user = members?.find((member) => member.id !== session?.user?.id)
        if (user) {
            setAppData({
                userTarget: user,
            })
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
        >
            <Box my={2}>
                <FontAwesomeIcon icon={faBars} />
            </Box>
            <Divider />
            {conversations?.map((conversation, index) => {
                console.log(conversation)
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
                                bg="tomato"
                                boxSize="1.2em"
                            >
                                <Text fontSize={'xs'} color={'white'}>
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
