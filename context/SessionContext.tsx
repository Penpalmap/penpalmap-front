import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types'
import axiosInstance from '../axiosInstance'

export const SessionContext = createContext<{
    session: {
        user: User
        token: string
    } | null
    status: string
    setStatus: (status: string) => void
    fetchUser: () => void
    setSession: (session: { user: User; token: string }) => void
}>({
    session: null,
    status: 'loading',
    setStatus: () => {
        // do nothing
    },
    fetchUser: () => {
        // do nothing
    },
    setSession: () => {
        // do nothing
    },
})

export const SessionProvider = ({ children }) => {
    const [session, setSession] = useState<{
        user: User
        token: string
    } | null>(null)
    const [status, setStatus] = useState('loading')

    const fetchUser = async () => {
        const token = localStorage.getItem('token')

        if (token) {
            const decoded = jwtDecode(token) as {
                id: string
                iat: number
                exp: number
                email
            }
            const response = (await axiosInstance.get(
                `/api/users/${decoded.id}`
            )) as any

            if (response) {
                setSession({ token: token, user: response.data })
                setStatus('authenticated')
            }
        } else {
            setStatus('unauthenticated')
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <SessionContext.Provider
            value={{ session, status, setStatus, fetchUser, setSession }}
        >
            {children}
        </SessionContext.Provider>
    )
}
