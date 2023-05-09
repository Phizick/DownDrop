import React, { useEffect, FC } from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import stylesModal from "./Modal.module.css";
import ReactDOM from "react-dom";
import closeIcon from '../../Images/close_modal.png';

interface IModalProps {
    activeModal: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}

const Modal: FC<IModalProps> = ({ activeModal, closeModal, children }) => {
    const modalContainer: Element = document.getElementById(
        "modal-root"
    ) as Element;

    useEffect(() => {
        const handleEscClose = (e: KeyboardEvent) => {
            e.key === "Escape" && closeModal();
        };
        if (activeModal) {
            document.addEventListener("keydown", handleEscClose);
        }
        return () => {
            document.removeEventListener("keydown", handleEscClose);
        };
    }, [activeModal, closeModal]);

    return ReactDOM.createPortal(
        <ModalOverlay closeModal={closeModal} isActive={activeModal}>
            <div className={stylesModal.modal__container}>
                <div className={`${stylesModal.modal__containerHeader}`}>
                    <h2 className={stylesModal.modal__containerHeaderTitle}>Бронируем</h2>
                    <div className={stylesModal.closeIcon} onClick={closeModal}>
                        <img src={closeIcon} alt={'иконка закрытия модального окна'}/>
                    </div>
                </div>
                <div className={`${stylesModal.container}`}>{children}</div>
            </div>
        </ModalOverlay>,
        modalContainer
    );
};

export default Modal;