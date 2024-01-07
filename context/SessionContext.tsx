import React, { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, User } from '../types'
import axios from 'axios'
import axiosInstance from '../axiosInstance'
import { jwtDecode } from 'jwt-decode'
import Router, { useRouter } from 'next/router'

export const SessionContext = createContext<AuthContextType | undefined>(
    undefined
)

export const SessionProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [status, setStatus] = useState<
        'loading' | 'authenticated' | 'unauthenticated'
    >('loading')
    const router = useRouter()

    // Fonction pour se connecter
    const login = async (tokens: {
        accessToken: string
        refreshToken: string
    }) => {
        localStorage.setItem('accessToken', tokens.accessToken)
        localStorage.setItem('refreshToken', tokens.refreshToken)

        const decoded = jwtDecode(tokens.accessToken) as {
            userId: string
            iat: number
            exp: number
            email
        }

        const response = await axiosInstance.get(`/api/users/${decoded.userId}`)
        setUser(response.data)
        setStatus('authenticated')
    }

    // Fonction pour se déconnecter
    const logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setUser(null)
        setStatus('unauthenticated')
    }

    // Fonction pour rafraîchir le token
    const refreshTokenFunc = useCallback(async (): Promise<boolean> => {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
            logout()
            return false
        }

        // if token is expired logout
        const decoded = jwtDecode(refreshToken) as {
            userId: string
            iat: number
            exp: number
            email
        }
        if (decoded.exp * 1000 < Date.now()) {
            logout()
            return false
        }

        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh-token`,
                {
                    refreshToken,
                }
            )

            if (response.status === 200) {
                const { accessToken } = response.data
                localStorage.setItem('accessToken', accessToken)
                const decoded = jwtDecode(accessToken) as {
                    userId: string
                    iat: number
                    exp: number
                    email
                }
                const responseDecoded = (await axiosInstance.get(
                    `/api/users/${decoded.userId}`
                )) as any
                setUser(responseDecoded.data)
                setStatus('authenticated')
                return true
            } else {
                logout()
                return false
            }
        } catch (error) {
            console.error('Error refreshing token:', error)
            logout()
            return false
        }
    }, [])

    const fetchUser = async () => {
        if (user) {
            const response = (await axiosInstance.get(
                `/api/users/${user.id}`
            )) as any
            setUser(response.data)
        }
    }

    useEffect(() => {
        debugger
        if (status === 'loading') {
            refreshTokenFunc().then((success) => {
                if (!success) {
                    if (
                        router.pathname === '/auth/signin' ||
                        router.pathname === '/auth/signup' ||
                        router.pathname === '/auth/forgot-password' ||
                        router.pathname === '/auth/reset-password'
                    ) {
                        return
                    } else {
                        Router.push('/auth/signin')
                    }
                }
            })
        } else if (status === 'unauthenticated') {
            if (
                router.pathname === '/auth/signin' ||
                router.pathname === '/auth/signup' ||
                router.pathname === '/auth/forgot-password' ||
                router.pathname === '/auth/reset-password'
            ) {
                return
            } else {
                Router.push('/auth/signin')
            }
        } else if (status === 'authenticated' && user?.isNewUser) {
            Router.push('/create-profile')
        } else if (status === 'authenticated' && !user?.isNewUser) {
            Router.push('/')
        }
    }, [refreshTokenFunc, router.pathname, status, user?.isNewUser])

    return (
        <SessionContext.Provider
            value={{
                user,
                status,
                login,
                logout,
                refreshTokenFunc,
                fetchUser,
            }}
        >
            {children}
        </SessionContext.Provider>
    )
}
