import { useBreakpointValue } from '@chakra-ui/react'
import React, {
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react'

type MobileViewContextType = {
  mobileView: 'home' | 'conversations' | 'profile' | 'chat' | 'settings'
  setMobileView: React.Dispatch<
    React.SetStateAction<
      'home' | 'conversations' | 'profile' | 'chat' | 'settings'
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
    'home' | 'conversations' | 'profile' | 'chat' | 'settings'
  >('home')

  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false

  const contextValue = useMemo(
    (): MobileViewContextType => ({ mobileView, setMobileView, isMobile }),
    [mobileView, setMobileView, isMobile]
  )

  return (
    <MobileViewContext.Provider value={contextValue}>
      {children}
    </MobileViewContext.Provider>
  )
}
