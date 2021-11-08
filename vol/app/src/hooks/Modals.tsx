import React, {createContext, ReactNode, useContext, useState} from "react";
type ModalsContextData = {
    registerDeveloperModal: boolean
    setRegisterDeveloperModal: (active:boolean) => void
    editDeveloperModal: boolean
    setEditDeveloperModal: (active:boolean) => void
}

const ModalsContext = createContext({} as ModalsContextData)

class ModalsProviderProps {
    children: ReactNode
}

function ModalsProvider({children} : ModalsProviderProps) {
    const [registerDeveloperModal, setRegisterDeveloperModal] = useState(false);
    const [editDeveloperModal, setEditDeveloperModal] = useState(false);

    return (
        <ModalsContext.Provider value={{registerDeveloperModal, setRegisterDeveloperModal, editDeveloperModal, setEditDeveloperModal}}>
            {children}
        </ModalsContext.Provider>
    )
}

function useModals(){
    return useContext(ModalsContext);
}

export {
    useModals,
    ModalsProvider
}