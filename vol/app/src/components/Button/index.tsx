import React from "react";
import styles from "./styles.module.scss"

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    title: string
    theme?: "red" | "white" | "primary"
    icon?: React.HTMLProps<HTMLOrSVGImageElement>
}
export default function Button({title ,icon,theme = "primary", ...rest}: ButtonProps){
    let buttonTheme

    switch (theme){
        case "primary":
            buttonTheme = styles.Primary
            break;
        case "red":
            buttonTheme = styles.Red
            break;
        case "white":
            buttonTheme = styles.White
            break;
    }

    return (
        <button onClick={rest.onClick} className={`${styles.Button} ${buttonTheme}`}>
            {title}
            {icon}
        </button>
    )
}