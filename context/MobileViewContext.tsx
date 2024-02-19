import { useBreakpointValue } from '@chakra-ui/react'
import React, { ReactNode, createContext, useContext, useState } from 'react'

type MobileViewContextType = {
  mobileView:
    | 'home'
    | 'conversations'
    | 'profile'
    | 'chat'
    | 'settings'
    | 'profile'
  setMobileView: React.Dispatch<
    React.SetStateAction<
      'home' | 'conversations' | 'profile' | 'chat' | 'settings' | 'profile'
    >
  >
  isMobile: boolean
}

interface MobileProviderProps {
  children: ReactNode
}

const MobileViewContext = createContext<MobileViewContextType>({
  mobileView: 'home',
  setMobileView: () => {
    return
  },
  isMobile: false,
})

export const useMobileView = () => useContext(MobileViewContext)

export const MobileViewProvider = ({ children }: MobileProviderProps) => {
  const [mobileView, setMobileView] = useState<
    'home' | 'conversations' | 'profile' | 'chat' | 'settings' | 'profile'
  >('home')

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  return (
    <MobileViewContext.Provider value={{ mobileView, setMobileView, isMobile }}>
      {children}
    </MobileViewContext.Provider>
  )
}
