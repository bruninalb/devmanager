import React from "react";
import styles from "./styles.module.scss"

type InputProps =
    (React.HTMLProps<HTMLInputElement> | React.HTMLProps<HTMLSelectElement> | React.HTMLProps<HTMLTextAreaElement>)
    & {
    textarea?: boolean
    select?: boolean
}

export default function Input({select = false, textarea = false,  children, onChange, ...rest}: InputProps) {
    return (
        <div className={styles.Container}>

            {textarea ? (<textarea onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>} placeholder={rest.placeholder} defaultValue={rest.value}/>)
                : select ? (<select onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}>{children}</select>)
                    : (<input onChange={onChange as React.ChangeEventHandler<HTMLInputElement>} type={rest.type} placeholder={rest.placeholder} defaultValue={rest.value} min={rest.min} max={rest.max} />)}

        </div>
    )
}