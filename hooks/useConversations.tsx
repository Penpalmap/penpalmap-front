import { getConversations } from '../api/conversationApi'
import { AppContext } from '../context/AppContext'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Conversation } from '../types'

const useConversations = () => {
    const [data, setData] = useContext(AppContext)

    const [conversations, setConversations] = useState<Conversation[]>([])

    const { data: session } = useSession()

    useEffect(() => {
        if (data.conversations) {
            setConversations(data.conversations)
        }
    }, [data.conversations])

    const fetchConversations = useCallback(async () => {
        if (session?.user?.id) {
            const conversationsData = await getConversations(session?.user?.id)
            setData((prevData) => ({
                ...prevData,
                conversations: conversationsData?.rooms,
            }))
        }
    }, [session?.user?.id, setData])

    useEffect(() => {
        fetchConversations()
    }, [fetchConversations])

    const refetch = () => {
        fetchConversations()
    }

    return {
        conversations,
        refetch,
    }
}

export default useConversations
