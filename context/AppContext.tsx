import React, { useState } from 'react'
import { ContextStateData } from '../types'

export const AppContext = React.createContext([] as any)

export const AppProvider = ({ children }) => {
    const [data, setData] = useState<ContextStateData>({
        userTarget: null,
        conversations: [],
        chatOpen: false,
    })

    return (
        <AppContext.Provider value={[data, setData]}>
            {children}
        </AppContext.Provider>
    )
}
