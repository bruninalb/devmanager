import styles from "./styles.module.scss"
import React from "react";
import {IoMdCloseCircle} from "react-icons/io"
type ModalProps = React.HTMLProps<HTMLDivElement> & {
    icon: React.HTMLProps<HTMLOrSVGImageElement>
    title: string
    subtitle?: string
    active?: boolean
    handleCloseModal?: () => void
    zIndex?: number
}

export default function Modal({icon,title,subtitle,children,handleCloseModal,zIndex,active = false, ...rest}: ModalProps) {

    return (
        <div className={`${styles.Filter} ${active && styles.Active} ${rest.className}`} style={{zIndex: zIndex}}>
            <article className={`globalContainer ${styles.Container}`}>
                <header>
                    <div>

                        {icon}

                        <h1 className={styles.Title}>{title}</h1>

                    </div>
                    <span className={styles.CloseButton} onClick={handleCloseModal}>
                        <IoMdCloseCircle />
                    </span>

                    {subtitle && (
                        <p className={styles.SubTitle}>{subtitle}</p>
                    )}

                </header>
                <main>
                    {children}
                </main>
            </article>

        </div>
    )
}
