import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'

export const useSession = () => {
    const session = useContext(SessionContext)

    return session
}
