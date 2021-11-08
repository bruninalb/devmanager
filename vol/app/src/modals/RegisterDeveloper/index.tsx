import Modal from "../../components/Modal";
import {RiAccountCircleFill} from "react-icons/ri";
import styles from "./styles.module.scss";
import Input from "../../components/Input";
import React, {ChangeEvent, useState} from "react";
import {DeveloperProps, useDeveloper} from "../../hooks/Developers";
import Button from "../../components/Button";
import {useModals} from "../../hooks/Modals";
import {useAlert} from "../../hooks/Alert";

export default function RegisterDeveloper(){
    const {register,developer, setDeveloper} = useDeveloper();
    const {registerDeveloperModal, setRegisterDeveloperModal} = useModals();
    const {showAlert} = useAlert();


    // VALIDA OS CAMPOS DO INPUT E CHAMA A FUNÇÃO DE REGISTRO
    function handleRegister(){
        if (developer.name.length < 1 || developer.hobby.length < 1 || developer.gender.length < 1 || !developer.birth_date) {
            return showAlert(`ERROR`, `Preencher campos obrigatórios antes de enviar`, "error")
        }
        register()
    }
    return (

        <Modal icon={<RiAccountCircleFill/>} title={`REGISTRAR DEV`}
               subtitle={`Preencha o formulário abaixo para continuarmos com a criação do DEV`}
               className={styles.CreateModal}
               active={registerDeveloperModal}
               handleCloseModal={() => setRegisterDeveloperModal(false)}
        >

            <Input type={"text"} placeholder={"Nome do DEV"} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDeveloper({...developer, name: e.currentTarget.value})
            }}/>

            <Input type={"text"} placeholder={"Hobby do DEV"} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setDeveloper({...developer, hobby: e.currentTarget.value})
            }}/>

            <Input select={true} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                setDeveloper({...developer, gender: e.currentTarget.value as DeveloperProps["gender"]})
            }}>
                <option>Gênero do DEV</option>
                <option value={"M"}>Masculino</option>
                <option value={"F"}>Feminino</option>
            </Input>

            <Input placeholder={"Data de nascimento do DEV"} type={"date"}
                   onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                       setDeveloper({...developer, birth_date: new Date(e.currentTarget.value)})
                   }}/>

            <div className={styles.ButtonsContainer}>
                <Button title={"Cancelar"} theme={"red"} onClick={() => setRegisterDeveloperModal(false)}/>
                <Button title={"Cadastrar"} theme={"white"} onClick={handleRegister}/>
            </div>

        </Modal>

    )
}