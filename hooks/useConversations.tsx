import { getConversations } from '../api/conversationApi'
import { AppContext } from '../context/AppContext'
import { useCallback, useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'

const useConversations = () => {
    const [data, setData] = useContext(AppContext)

    const { conversations } = data

    const { data: session } = useSession()

    const fetchConversations = useCallback(async () => {
        if (session?.user?.id) {
            const { rooms } = await getConversations(session?.user?.id)
            setData((prevData) => ({
                ...prevData,
                conversations: rooms,
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
