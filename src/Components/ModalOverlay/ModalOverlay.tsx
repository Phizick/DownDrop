import React, { MouseEvent, ReactNode, FC } from "react";
import stylesModalOverlay from "./ModalOverlay.module.css";

interface IModalOverlayProps {
    isActive: boolean;
    closeModal: () => void;
    children: ReactNode;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ isActive, closeModal, children }) => {
    const handleOverlay = (e: MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <section className={isActive ? `${stylesModalOverlay.overlay} ${stylesModalOverlay.overlay_active}` : `${stylesModalOverlay.overlay}`} onClick={handleOverlay}>
            <div className={stylesModalOverlay.content}>{children}</div>
        </section>
    );
};

export default ModalOverlay;
