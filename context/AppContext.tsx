import React, { useState } from 'react'
import { ContextStateData } from '../types'

export const AppContext = React.createContext(null)

export const AppProvider = ({ children }) => {
    const [data, setData] = useState<ContextStateData>({
        userTarget: null,
        user: null,
    })

    return (
        <AppContext.Provider value={[data, setData]}>
            {children}
        </AppContext.Provider>
    )
}
