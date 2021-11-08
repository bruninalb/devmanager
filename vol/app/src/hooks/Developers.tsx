import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import * as queryString from "querystring";
import {api} from "../services/api";
import {useSearch} from "./Search";
import {useAlert} from "./Alert";
import {useLoading} from "./Loading";
import {useModals} from "./Modals";

type DeveloperContextData = {
    developers: DeveloperProps[]
    setDevelopers: (developers: DeveloperProps[]) => void
    developer: DeveloperProps
    setDeveloper: (developer: DeveloperProps) => void
    show: () => void
    register: () => void
    edit: () => void
    del: () => void
    scroll: (e: EventTarget & HTMLDivElement) => void
}
type DeveloperProviderProps = {
    children: ReactNode
}

export type DeveloperProps = {
    id: number
    name: string
    hobby: string
    gender: "M" | "F"
    age: number
    birth_date: Date
    created_at?: Date
    updated_at?: Date
}

type AxiosProps = {
    data: PaginateResponseProps
}
type ResponseAxiosProps = {
    data: ResponseProps
}

type ResponseProps = {
    message: string
    developer: DeveloperProps
}

type PaginateResponseProps = {
    data: DeveloperProps[]
    current_page: number
    last_page: number
}

const DeveloperContext = createContext({} as DeveloperContextData);

function DeveloperProvider({children}: DeveloperProviderProps) {
    const {search} = useSearch();
    const {showAlert} = useAlert();
    const {hideLoading, showLoading} = useLoading();
    const {setEditDeveloperModal, setRegisterDeveloperModal} = useModals();

    const [developers, setDevelopers] = useState<DeveloperProps[]>([] as DeveloperProps[]);
    const [developer, setDeveloper] = useState<DeveloperProps>({} as DeveloperProps)

    // SISTEMA DE PAGINAÇÃO
    const [lastPage, setLastPage] = useState<number>();
    const [currentPage, setCurrentPage] = useState<number>();
    const [lastScroll, setLastScroll] = useState<number>(0);

    const [searchTimer, setSearchTimer] = useState({} as NodeJS.Timeout);

    // BUSCA OS DEVELOPERS DE FORMA PERSONALIZADA APÓS A DIGITAÇÃO SER PAUSADA POR 3 SEGUNDOS
    // ATIVANDO O SISTEMA DE PAGINAÇÃO TAMBÉM PARA BUSCA PERSONALIZADA
    useEffect(() => {

        clearTimeout(searchTimer)
        setSearchTimer(setTimeout(async () => {
            show()
        }, 2000))

    }, [search]);

    // RENDERIZA OS DEVS AO ENTRAR PELA PRIMEIRA VEZ NA PAGE
    useEffect(() => {
        show()
    }, []);
    function del() {
        const {id} = developer

        api.delete("/developers/" + id).then(({data}: AxiosProps) => {
            showAlert(`DELETADO COM SUCESSO`, `O DEV de ID - ${id} foi deletado com sucesso`, "success")
            setDevelopers(developers.filter((item) => item.id !== id));

        }).catch((error) => {
            console.log(error)
        })
        setDeveloper({} as DeveloperProps)
    }

    function edit() {
        const diffTime = Math.abs(new Date().getTime() - new Date(developer.birth_date).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 360));
        if (diffYears < 4) {
            return showAlert(`ERROR`, `Você precisa ter mais de 4 anos para ser um DEV kkkk`, "error")
        }

        const {name, hobby, gender, birth_date, id} = developer

        api.put("/developers/" + id, {name, hobby, gender, birth_date}).then(({data}: ResponseAxiosProps) => {

            showAlert(`EDITADO COM SUCESSO`, `O DEV de ID - ${id} foi editado com sucesso`, "success")

            setDevelopers(developers.map(response => (
                response.id === id ? data.developer : response
            )))
        }).catch((error) => {
            showAlert("ERROR", "Erro ao se comunicar com o servidor", "error")
        })
        setEditDeveloperModal(false)
        setDeveloper({} as DeveloperProps)
    }

    // REGISTRA UM DEVELOPER
    function register() {
        const diffTime = Math.abs(new Date().getTime() - new Date(developer.birth_date).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 360));
        if (diffYears < 4) {
            return showAlert(`ERROR`, `Você precisa ter mais de 4 anos para ser um DEV kkkk`, "error")
        }

        const {name, hobby, gender, birth_date} = developer

        showLoading()
        api.post("/developers", {name, hobby, gender, birth_date}).then(({data}: ResponseAxiosProps) => {

            showAlert(`REGISTRADO COM SUCESSO`, `O DEV de ID - ${data.developer.id} foi registrado com sucesso`, "success")
            const newDevelopers = developers
            newDevelopers.unshift(data.developer)
            setDevelopers(newDevelopers)
            hideLoading()

        }).catch((error) => {

            console.log(error)
            showAlert("ERROR", "Erro ao se comunicar com o servidor", "error")
            hideLoading()

        })
        setRegisterDeveloperModal(false)
        setDeveloper({} as DeveloperProps)
    }

    // HANDLE SHOW
    function show() {

        const querySend = queryString.stringify(search)

        showLoading()
        api.get("/developers?" + querySend).then(({data}: AxiosProps) => {
            setDevelopers(data.data)
            setLastPage(data.last_page)
            setCurrentPage(data.current_page)
            setLastScroll(0)
            hideLoading()

        }).catch((error) => {
            console.log(error)
            setDevelopers([])
            hideLoading()
        })
    }

    // SISTEMA DE AUTO-RENDERIZAÇÃO AO ROLAR O CONTAINER DE DEVELOPERS ATÉ O FINAL
    function scroll(e: EventTarget & HTMLDivElement) {
        let scroll = (e.scrollTop)
        let maxScroll = (e.scrollHeight - e.clientHeight)

        if (lastScroll < scroll)
            if (scroll === maxScroll) {

                if (currentPage && lastPage)
                    if (currentPage < lastPage) {
                        const nextPage = currentPage + 1
                        showLoading()
                        const querySend = queryString.stringify(search)
                        api.get("/developers?page=" + nextPage + "&" + querySend).then(({data}: AxiosProps) => {

                            setDevelopers(developers.concat(data.data))
                            setLastScroll(maxScroll)
                            setCurrentPage(currentPage + 1)
                            hideLoading()

                        }).catch((error) => {
                            console.log(error)
                            hideLoading()
                        })
                    }
            }
    }

    return (
        <DeveloperContext.Provider
            value={{developers, setDevelopers, developer, setDeveloper, register, edit, del, scroll, show}}>
            {children}
        </DeveloperContext.Provider>
    )
}

function useDeveloper() {
    return useContext(DeveloperContext);
}

export {
    DeveloperProvider,
    useDeveloper
}
