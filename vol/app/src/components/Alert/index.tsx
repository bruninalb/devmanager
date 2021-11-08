import Modal from "../Modal";
import {RiErrorWarningFill} from "react-icons/ri"
import {useAlert} from "../../hooks/Alert";
import styles from "./styles.module.scss"
import Button from "../Button";

export default function Alert() {
    const {title, subtitle, type, active, hideAlert, setResponse} = useAlert();

    return (
        <Modal icon={<RiErrorWarningFill/>} title={title} subtitle={subtitle} handleCloseModal={hideAlert}
               active={active} zIndex={999}>
            <div className={styles.ButtonsContainer}>
                {type === "confirm" ? (
                        <>
                            <Button title={"CANCELAR"} theme={"red"} onClick={hideAlert}/>
                            <Button title={"CONFIRMAR"} theme={"white"} onClick={() => {setResponse(true); hideAlert()}}/>
                        </>
                    ) :
                    (
                        <Button title={"OK"} theme={"white"} onClick={hideAlert}/>
                    )
                }

            </div>

        </Modal>
    )
}