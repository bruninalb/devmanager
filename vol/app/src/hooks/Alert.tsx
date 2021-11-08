import React, {createContext, ReactNode, useContext, useEffect, useState} from "react";

type AlertContextData = {
    title: string
    subtitle: string
    type: "success" | "error" | "warning" | "confirm"
    active: boolean
    showAlert: (title: string, subtitle: string, type: AlertContextData["type"]) => void
    hideAlert: () => void
    response: boolean
    setResponse: (response: boolean) => void

}
type AlertProviderProps = {
    children: ReactNode
}

const AlertContext = createContext({} as AlertContextData);

function AlertProvider({children}: AlertProviderProps) {

    // ALERT PROPS
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [type, setType] = useState<AlertContextData["type"]>("success");
    const [active, setActive] = useState(false);
    const [response, setResponse] = useState(false);
    const [alertTimeout, setAlertTimeout] = useState({} as NodeJS.Timeout);

    useEffect(() => {
        if(!active){
            clearTimeout(alertTimeout)
        }
    }, [active]);



    // SHOW ALERT FUNCTION
    function showAlert(titleHandle: string, subtitleHandle: string, typeHandle = "success" as AlertContextData["type"]) {
        setTitle(titleHandle)
        setSubtitle(subtitleHandle)
        setType(typeHandle)
        setActive(true)

        if (typeHandle !== "confirm")
            setAlertTimeout(setTimeout(() => {
                hideAlert()
            }, 3000))
    }

    // HIDE ALERT FUNCTION
    function hideAlert() {
        setTitle("")
        setSubtitle("")
        setType("success")
        setActive(false)
    }

    return (
        <AlertContext.Provider value={{title, subtitle, type, active, response, setResponse, showAlert, hideAlert}}>
            {children}
        </AlertContext.Provider>
    )
}

function useAlert() {
    return useContext(AlertContext);
}

export {
    AlertProvider,
    useAlert
}
