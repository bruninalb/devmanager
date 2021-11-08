import styles from "./styles.module.scss"
import {AiOutlineLoading3Quarters} from "react-icons/ai"
import {useLoading} from "../../hooks/Loading";
export default function Loading(){
    const {isActive} = useLoading();
    return (
        <div className={`${styles.Filter} filter ${isActive ? styles.Active : styles.Inactive}`}>
            <AiOutlineLoading3Quarters />
        </div>
    )
}