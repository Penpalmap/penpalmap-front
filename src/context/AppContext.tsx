import React, { useState, createContext, ReactNode, useMemo } from 'react'
import { ContextStateData } from '../types'

type AppContextType = [
  ContextStateData,
  React.Dispatch<React.SetStateAction<ContextStateData>>
]

export const AppContext = createContext<AppContextType>([
  {
    userTarget: null,
    chatData: { roomChatId: null, userChat: null },
    rooms: [],
    chatOpen: false,
    socket: null,
  },
  () => {
    return
  },
])

type AppProviderProps = {
  children: ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [data, setData] = useState<ContextStateData>({
    userTarget: null,
    chatData: { roomChatId: null, userChat: null },
    rooms: [],
    chatOpen: false,
    socket: null,
  })

  const contextValue = useMemo(
    (): AppContextType => [data, setData],
    [data, setData]
  )

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}
