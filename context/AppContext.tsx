import React, { useState, createContext, ReactNode } from 'react'
import { ContextStateData } from '../types'

export const AppContext = createContext<
  [ContextStateData, React.Dispatch<React.SetStateAction<ContextStateData>>]
>([
  {
    userTarget: null,
    userChat: null,
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
    userChat: null,
    rooms: [],
    chatOpen: false,
    socket: null,
  })

  return (
    <AppContext.Provider value={[data, setData]}>
      {children}
    </AppContext.Provider>
  )
}
