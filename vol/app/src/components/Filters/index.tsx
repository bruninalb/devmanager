import styles from "./styles.module.scss";
import React, {ChangeEvent, useEffect, useState} from "react";
import {MdArrowDropDown} from "react-icons/md"
import Input from "../Input";
import {useSearch} from "../../hooks/Search";
import {AiOutlineClear} from "react-icons/ai"
import Button from "../Button";

export default function Filters() {
    const {search, setSearch} = useSearch();
    const [activeM, setActiveM] = useState("");
    const [activeF, setActiveF] = useState("");


    useEffect(() => {
        switch (search.gender) {
            case"M":
                setActiveM(styles.Active)
                setActiveF("")
                break;
            case"F":
                setActiveF(styles.Active)
                setActiveM("")
                break;
            default :
                setActiveM("")
                setActiveF("")
                break;
        }
    }, [search.gender]);

    function handleResetFilters(){
        let newSearch = {...search}

        delete newSearch.minAge
        delete newSearch.maxAge
        delete newSearch.gender

        setSearch(newSearch)

        setActiveM("")
        setActiveF("")
    }

    return (
        <div className={styles.FiltersContainer}>
            <span>Filtros</span>
            <MdArrowDropDown/>
            <div className={styles.FiltersHidden}>
                <section className={styles.AgeFilter}>
                    <h3>Idade</h3>
                    <div>
                        <Input type={"number"} placeholder={"De"} min="4"
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setSearch(
                                       {...search, minAge: parseInt(e.currentTarget.value)}
                                   )
                               }}/>
                        <Input type={"number"} placeholder={"Até"} min="4"
                               onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                   setSearch(
                                       {...search, maxAge: parseInt(e.currentTarget.value)}
                                   )
                               }}/>
                    </div>
                </section>
                <section className={styles.GenderFilter}>
                    <h3>Gênero</h3>
                    <div>
                        <span className={activeM} onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                            if (search.gender === "M") {
                                const newSearch = {...search}
                                delete newSearch["gender"]
                                setSearch(newSearch);
                            } else {
                                setSearch(
                                    {...search, gender: "M"}
                                )
                            }
                        }}>Masculino</span>
                        <span className={activeF} onClick={(e: React.MouseEvent<HTMLSpanElement>) => {
                            if (search.gender === "F") {
                                const newSearch = {...search}
                                delete newSearch["gender"]
                                setSearch(newSearch);
                            } else {
                                setSearch(
                                    {...search, gender: "F"}
                                )
                            }
                        }}>Feminino</span>
                    </div>
                </section>
                <Button title={"Limpar Filtros"} theme={"red"} icon={<AiOutlineClear />} onClick={handleResetFilters}/>

            </div>
        </div>

    )
}