import {createContext, ReactNode, useContext, useState} from "react";

type SearchContextData = {
    search: SearchProps
    setSearch: (search:SearchProps) => void
}

export type SearchProps = {
    minAge?: number
    maxAge?: number
    gender?: "M" | "F"
    name?: string
    hobby?: string
}

type SearchProviderProps = {
    children: ReactNode
}

const SearchContext = createContext({} as SearchContextData)


function SearchProvider({children} : SearchProviderProps) {
    const [search, setSearch] = useState({} as SearchProps);

    return (
        <SearchContext.Provider value={{search, setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}

function useSearch(){
    return useContext(SearchContext);
}

export {
    useSearch,
    SearchProvider
}