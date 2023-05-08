import React, { useEffect, FC} from "react";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import stylesModal from "../Modal/Modal.module.css";
import ReactDOM from "react-dom";


const Modal  = (props: any) => {

    const modalContainer: Element = (document.getElementById('modal-root') as Element);
    const isOpened = props.activeModal;

    useEffect(() => {
        const handleEscClose = (e: any) => {
            e.key === 'Escape' && props.closeModal();
        };
        if (isOpened) {
            document.addEventListener('keydown', handleEscClose);
        }
        return () => {
            document.removeEventListener('keydown', handleEscClose)
        };
    }, [isOpened]);


    return ReactDOM.createPortal (
        <ModalOverlay closeModal={props.closeModal} isActive={true}>
            <div className={`${stylesModal.modal} pt-10 pb-10 pl-10 pr-10`}>
                <div className={`${stylesModal.header}`}>Бронируем

                    <div className={stylesModal.closeIcon} onClick={props.closeModal}>

                    </div>
                </div>
                <div className={`${stylesModal.container}`}>
                    {props.children}
                </div>
            </div>
        </ModalOverlay>
        , modalContainer
    )
};


export default Modal;