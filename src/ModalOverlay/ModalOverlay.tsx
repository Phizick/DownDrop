import React, { MouseEvent } from "react";
import stylesModalOverlay from "../ModalOverlay/ModalOverlay.module.css";


const ModalOverlay = (props: any) => {

    const handleOverlay = (e: MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            props.closeModal();
        }
    };

    return (
        <section className={props.isActive ? `${stylesModalOverlay.overlay} ${stylesModalOverlay.overlay_active}` : `${stylesModalOverlay.overlay}`} onClick={handleOverlay}>
            <div className={stylesModalOverlay.content}>{props.children}</div>
        </section>
    );
};


export default ModalOverlay;