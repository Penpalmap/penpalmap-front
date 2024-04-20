import React, { createContext, useCallback, useEffect, useState } from 'react'
import { AuthContextType, User } from '../types'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/router'
import { getUserById } from '../api/user/userApi'

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

    const decoded: { userId: string } = jwtDecode(tokens.accessToken)
    const user = await getUserById(decoded.userId)
    setUser(user)
    setStatus('authenticated')
  }

  // Fonction pour se déconnecter
  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setUser(null)
    setStatus('unauthenticated')
    router.push('/auth/signin')
  }, [router])

  const fetchUser = async () => {
    if (user) {
      const data = await getUserById(user.id)
      setUser(data)
    }
  }

  const isAuthRoute = (pathname) => {
    const paths = [
      '/auth/signin',
      '/auth/signup',
      '/auth/forgot-password',
      '/auth/reset-password',
      '/about',
      '/contact',
      '/terms',
      '/legalnotice',
      '/',
    ]
    return !paths.includes(pathname)
  }

  useEffect(() => {
    const setAuthStatus = async () => {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (accessToken && refreshToken) {
        const decoded: { exp: number; userId: string } = jwtDecode(accessToken)

        if (decoded.exp * 1000 < Date.now()) {
          setStatus('unauthenticated')
        } else {
          try {
            const userData = await getUserById(decoded.userId)
            setUser(userData)
            setStatus('authenticated')
          } catch (err) {
            logout()
          }
        }
      } else {
        setStatus('unauthenticated')
      }
    }

    setAuthStatus()

    if (status === 'unauthenticated' && isAuthRoute(router.pathname)) {
      router.push('/auth/signin')
    } else if (
      status === 'authenticated' &&
      user?.isNewUser &&
      router.pathname !== '/create-profile'
    ) {
      router.push('/create-profile')
    }
  }, [logout, router, status, user?.isNewUser])

  return (
    <SessionContext.Provider
      value={{
        user,
        status,
        login,
        logout,
        fetchUser,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}
