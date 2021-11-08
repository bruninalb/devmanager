import React, {ChangeEvent, useEffect} from 'react';
import styles from './styles.module.scss';
import DeveloperItem from "../components/DeveloperItem";

import Input from "../components/Input";
import {useDeveloper} from "../hooks/Developers";
import Button from "../components/Button";
import Filters from "../components/Filters";
import {useSearch} from "../hooks/Search";
import {useModals} from "../hooks/Modals";
import RegisterDeveloper from "../modals/RegisterDeveloper";
import EditDeveloper from "../modals/EditDeveloper";

function App() {
    const {developers, show, scroll} = useDeveloper();
    const {setSearch, search} = useSearch();
    const {setRegisterDeveloperModal} = useModals();

    // RENDER DEVELOPERS LIST
    useEffect(() => {
        show()
    }, []);


    // DETECTA O MOVIMENTO DO USUÁRIO E CHAMA A FUNÇÃO DE RENDERIZAÇÃO
    function handleScroll(target: EventTarget & HTMLDivElement) {
        scroll(target)
    }

    return (
        <main className={styles.Container}>
            <RegisterDeveloper />
            <EditDeveloper />

            <article className={styles.TitleContainer}>
                <h1 className={styles.Title}><span>DEV</span> MANAGER</h1>
            </article>

            <nav className={`globalContainer ${styles.NavContainer}`}>

                <Input type={"text"} value={search.name} placeholder={"Digite aqui sua busca"}
                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                           setSearch({...search, name: e.currentTarget.value, hobby: e.currentTarget.value})
                       }}/>
                <Filters/>
                <Button title={"Buscar"} onClick={show}/>

                <Button title={"Novo"} onClick={() => setRegisterDeveloperModal(true)}/>

            </nav>

            <div onScroll={(e) => handleScroll(e.currentTarget)}
                 className={`globalContainer ${styles.DevelopersContainer}`}>
                {developers &&
                developers.map((developer, k) => {
                    return (<DeveloperItem key={k} developer={developer}/>)

                })
                }
            </div>

        </main>
    );
}

export default App;
