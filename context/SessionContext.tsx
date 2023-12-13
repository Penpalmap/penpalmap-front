import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { User } from '../types'
import axiosInstance from '../axiosInstance'
import { refreshToken as refreshT } from '../utils/auth'
export const SessionContext = createContext<{
    session: {
        user: User
        accessToken: string
        refreshToken: string
    } | null
    status: string
    setStatus: (status: string) => void
    fetchUser: () => void
    setSession: (session: {
        user: User
        accessToken: string
        refreshToken: string
    }) => void
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
        accessToken: string
        refreshToken: string
    } | null>(null)
    const [status, setStatus] = useState('loading')

    const fetchUser = async () => {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        if (accessToken && refreshToken) {
            const decoded = jwtDecode(accessToken) as {
                userId: string
                iat: number
                exp: number
                email
            }

            const response = (await axiosInstance.get(
                `/api/users/${decoded.userId}`
            )) as any

            if (response) {
                setSession({
                    user: response.data,
                    accessToken,
                    refreshToken,
                })
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
