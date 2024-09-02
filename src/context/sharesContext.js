import { createContext } from "react"
import { useState } from "react"

export const SharesContext = createContext()

export const SharesContextProvider = ({children}) => {
    const [isUpdated, setIsUpdated] = useState(false)

    return(
        <SharesContext.Provider value={{isUpdated, setIsUpdated}} >
            {children}
        </SharesContext.Provider>    
    )
}