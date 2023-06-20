import { useEffect, useState, useCallback } from 'react'
import { Conversation } from '../types'
import { getConversations } from '../api/conversationApi'
import { useSession } from 'next-auth/react'

const useConversations = () => {
    const [conversations, setConversations] = useState<Conversation[]>([])
    const { data: session } = useSession()

    const fetchConversationsData = useCallback(async () => {
        try {
            const data = await getConversations(session?.user?.id as string)
            setConversations(data.rooms)
        } catch (error) {
            // Gérer les erreurs
        }
    }, [session?.user?.id])

    useEffect(() => {
        fetchConversationsData()
    }, [fetchConversationsData])

    const refetch = useCallback(() => {
        fetchConversationsData()
    }, [fetchConversationsData])

    return { conversations, refetch }
}

export default useConversations
