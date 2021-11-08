import {createContext, ReactNode, useContext, useState} from "react";

type LoadingContextData = {
    isActive: boolean
    hideLoading: () => void
    showLoading: () => void
}

type LoadingProviderProps = {
    children: ReactNode
}

const LoadingContext = createContext({} as LoadingContextData)

function LoadingProvider({children} : LoadingProviderProps) {
    const [isActive, setIsActive] = useState(false);
    function hideLoading (){
        setIsActive(false)
    }
    function showLoading (){
        setIsActive(true)
    }
    return (
        <LoadingContext.Provider value={{isActive, showLoading,hideLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}

function useLoading(){
    return useContext(LoadingContext);
}

export {
    useLoading,
    LoadingProvider
}