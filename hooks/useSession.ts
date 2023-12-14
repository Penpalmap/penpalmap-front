import { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'
import { AuthContextType } from '../types'

export const useSession = (): AuthContextType => {
    const context = useContext(SessionContext)

    if (!context) {
        throw new Error(
            'useSession doit être utilisé à l’intérieur d’un SessionProvider'
        )
    }

    return context
}
