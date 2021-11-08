import React, {useEffect, useState} from "react";
import {MdArrowDropDown} from "react-icons/md"
import styles from "./styles.module.scss";
import {useAlert} from "../../hooks/Alert";
import {useModals} from "../../hooks/Modals";
import {DeveloperProps, useDeveloper} from "../../hooks/Developers";

type DeveloperItemProps = React.HTMLProps<HTMLDivElement> & {
    developer: DeveloperProps
}

export default function DeveloperItem({developer}: DeveloperItemProps) {

    // FORMAT TIMESTAMP FIELDS
    if(developer.created_at)
        developer.created_at = new Date(developer.created_at)

    if(developer.updated_at)
        developer.updated_at = new Date(developer.updated_at)


    // IMPORT ALERT HOOK
    const {showAlert, response, setResponse} = useAlert();

    // IMPORT DEVELOPERS HOOK
    const {del, setDeveloper} = useDeveloper();
    const {setEditDeveloperModal} = useModals();


    // COMPONENT ACTIVE
    const [active, setActive] = useState(false);

    // EDIT MODAL

    const [deleteResponse, setDeleteResponse] = useState(false);

    // DELETE DEVELOPER AFTER CONFIRM
    useEffect(() => {
        if (deleteResponse) {

            del()
            setDeleteResponse(false)
            setResponse(false)
            setDeveloper({} as DeveloperProps)

        }
    }, [response]);

    // SHOW HIDDEN CONTENT IN DEVELOPER
    async function handleShowHidden() {
        setActive(oldValue => !oldValue)
    }

    // HANDLE CONFIRM DELETE AND CALL API FUNCTION USING STATE
    async function handleDelete() {
        showAlert(`EXCLUIR DEVELOPER`, `Você confirma a exclusão do DEV de ID - ${developer.id} ?`, "confirm")
        setDeleteResponse(true)
        setDeveloper(developer)
    }

    return (
        <>
            <article className={styles.DeveloperContainer} onClick={handleShowHidden}>

                <div className={styles.HeaderContainer}>
                    <div>
                        <h2>{developer.name} | ID:{developer.id} | <span>{developer.age} Anos | {developer.hobby}</span>
                        </h2>
                    </div>
                    <span className={`${styles.ShowHiddenContainer} ${active ? styles.Active : ""}`}>
                        <MdArrowDropDown/>
                    </span>
                </div>

                <div className={`${styles.HiddenContainer} ${active ? styles.Active : ""}`}>

                    {developer.created_at && (<h3>Data de Criação : <span>{new Date(developer.created_at).toLocaleDateString("pt-BR")}</span></h3>)}
                    {developer.updated_at && (<h3>Data de Atualização : <span>{new Date(developer.updated_at).toLocaleDateString("pt-BR")}</span></h3>) }

                    <h3>Data de Nascimento : <span>{new Date(developer.birth_date).toLocaleDateString("pt-BR")}</span></h3>
                    <h3>Hobby : <span>{developer.hobby}</span></h3>
                    <h3>Gênero : <span>{developer.gender === "M" ? "Masculino" : "Feminino"}</span></h3>

                    <div className={styles.ButtonsContainer}>

                        <button onClick={() => {
                            setDeveloper(developer)
                            setEditDeveloperModal(true)
                        }
                        }>Editar
                        </button>

                        <button onClick={handleDelete}>Excluir
                        </button>

                    </div>

                </div>
            </article>
        </>
    )
}