import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types'

export const SessionContext = createContext<{
    session: {
        user: User
        token: string
    } | null
    status: string
    setStatus: (status: string) => void
}>({
    session: null,
    status: 'loading',
    setStatus: () => {
        // do nothing
    },
})

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState<{
        user: User
        token: string
    } | null>(null)
    const [status, setStatus] = useState('loading')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                const { user } = decoded as { user: User }
                setSession({ user: user as User, token })
                setStatus('authenticated')
            } catch (error) {
                console.error('Erreur de décodage du JWT', error)
                setStatus('unauthenticated')
            }
        } else {
            setStatus('unauthenticated')
        }
    }, [])

    return (
        <SessionContext.Provider value={{ session, status, setStatus }}>
            {children}
        </SessionContext.Provider>
    )
}
