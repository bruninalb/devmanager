import Modal from "../../components/Modal";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import React, {ChangeEvent, useEffect, useState} from "react";
import {DeveloperProps, useDeveloper} from "../../hooks/Developers";
import Button from "../../components/Button";
import {MdEdit} from "react-icons/md";
import {useModals} from "../../hooks/Modals";
import {useAlert} from "../../hooks/Alert";

export default function EditDeveloper(){
    const {edit, developer, setDeveloper} = useDeveloper();
    const {editDeveloperModal,setEditDeveloperModal} = useModals();
    const {showAlert, setResponse, response} = useAlert();

    // DEVELOPER

    // CONFIRM RESPONSES FROM ALERT USING IN USE EFFECT
    const [editResponse, setEditResponse] = useState(false);

    // EDIT DEVELOPER BEFORE CONFIRM
    useEffect(() => {
        if (editResponse) {

            edit()
            setEditResponse(false)
            setResponse(false)
        }
    }, [response]);

    // HANDLE CONFIRM EDIT AND CALL API FUNCTION USING STATE
    async function handleEdit() {
        if(developer.name.length < 1 || developer.hobby.length < 1 || developer.gender.length < 1 || !developer.birth_date){
            return showAlert(`ERROR`, `Preencher campos obrigatórios antes de enviar`, "error")
        }
        showAlert(`EDITAR DEV`, `Você confirma a edição do DEV de ID - ${developer.id} ?`, "confirm")
        setEditResponse(true)
    }

    if (developer.id)
        return (

        <Modal icon={<MdEdit/>} title={`EDITAR DEVELOPER`}
               subtitle={`Preencha o formulário abaixo para continuarmos com a edição do DEV - ${developer.id}`}
               className={styles.EditModal}
               active={editDeveloperModal}
               handleCloseModal={() => setEditDeveloperModal(false)}
        >
            <Input type={"text"} value={developer.name} onChange={(e:ChangeEvent<HTMLInputElement>) => {setDeveloper({...developer, name: e.currentTarget.value})}}/>
            <Input type={"text"} value={developer.hobby} onChange={(e:ChangeEvent<HTMLInputElement>) => {setDeveloper({...developer, hobby: e.currentTarget.value})}}/>
            <Input select={true} onChange={(e:ChangeEvent<HTMLSelectElement>) => {setDeveloper({...developer, gender: e.currentTarget.value as DeveloperProps["gender"]})}}>
                <option value={developer.gender}>{developer.gender === "M" ? "Masculino" : "Feminino"}</option>
                <option value={developer.gender === "F" ? "M" : "F"}>{developer.gender === "F" ? "Masculino" : "Feminino"}</option>
            </Input>
            <Input type={"date"} value={new Date(developer.birth_date).toLocaleDateString('en-US')} onChange={(e:ChangeEvent<HTMLSelectElement>) => {setDeveloper({...developer, birth_date: new Date(e.currentTarget.value)})}}/>
            <div className={styles.ButtonsContainer}>
                <Button title={"Cancelar"} theme={"red"} onClick={() => setEditDeveloperModal(false)}  />
                <Button title={"Editar"} theme={"white"} onClick={handleEdit} />
            </div>
        </Modal>

    )

    return (<></>)
}