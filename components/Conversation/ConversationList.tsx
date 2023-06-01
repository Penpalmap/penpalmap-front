import { useEffect, useState } from 'react'
import { Conversation } from '../../types'
import { getConversations } from '../../api/conversationApi'
import { useSession } from 'next-auth/react'
import { Avatar, VStack } from '@chakra-ui/react'

const ConversationList = ({}) => {
    const [conversations, setConversations] = useState<Conversation[]>([])

    const { data: session } = useSession()

    useEffect(() => {
        async function fetchConversationsData() {
            try {
                const data = await getConversations(
                    session?.user?.userId as string
                )
                debugger
                setConversations(data.rooms)
            } catch (error) {
                // Gérer les erreurs
            }
        }

        fetchConversationsData()
    }, [session?.user?.userId])

    return (
        <VStack>
            <h1>Conversations</h1>
            {conversations?.map((conversation) => (
                // take the member (not the current user) and display it
                <Avatar
                    key={conversation.room_id}
                    src={
                        conversation?.members?.find(
                            (member) => member !== session?.user?.userId
                        )?.userImg
                    }
                    name={
                        conversation?.members?.find(
                            (member) => member !== session?.user?.userId
                        )?.userName
                    }
                />
            ))}
        </VStack>
    )
}

export default ConversationList
