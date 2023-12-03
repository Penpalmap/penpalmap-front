import React, { ReactNode, createContext, useContext, useState } from 'react'

type MobileViewContextType = {
    mobileView: 'home' | 'conversations' | 'profile' | 'chat' | 'settings'
    setMobileView: React.Dispatch<
        React.SetStateAction<
            'home' | 'conversations' | 'profile' | 'chat' | 'settings'
        >
    >
}

interface MobileProviderProps {
    children: ReactNode
}

const MobileViewContext = createContext<MobileViewContextType>({
    mobileView: 'home',
    setMobileView: () => {
        return
    },
})

export const useMobileView = () => useContext(MobileViewContext)

export const MobileViewProvider = ({ children }: MobileProviderProps) => {
    const [mobileView, setMobileView] = useState<
        'home' | 'conversations' | 'profile' | 'chat' | 'settings'
    >('home')

    return (
        <MobileViewContext.Provider value={{ mobileView, setMobileView }}>
            {children}
        </MobileViewContext.Provider>
    )
}
