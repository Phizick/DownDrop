import React from "react";
import { useState } from "react";
import "./App.module.css";
import Modal from "../Modal/Modal";
import { AllOptions } from "../AllOptions/AllOptions";
import { Button } from "../Button/Button";
import {FastOptions} from "../FastOptions/FastOptions";

function App() {
    const [isAllOpenedModal, setAllOptionsModalState] = useState(false);
    const [isFastOpenedModal, setFastOptionsModalState] = useState(false);

    const handleAllOptionsModalState = () => {
        setAllOptionsModalState(!isAllOpenedModal);
    };
    const handleFastOptionsModalState = () => {
        setFastOptionsModalState(!isFastOpenedModal);
    };


    return (
        <div className="App">
            <main className={"mainContent"}>
                <div className={"mainContent__container"}>
                    <p className={"mainContent__containerSubtitle"}>Привет!</p>
                    <h1 className={"mainContent__containerTitle"}>Переговорим?</h1>
                    <Button type={"button"} color={"blue"} text={"забронировать переговорную"} onClick={handleAllOptionsModalState} />
                    <Button type={"button"} color={"white"} text={"прямо сейчас!"} onClick={handleFastOptionsModalState} />
                </div>
                <Modal activeModal={isAllOpenedModal} closeModal={handleAllOptionsModalState}>
                    <AllOptions/>
                </Modal>
                <Modal activeModal={isFastOpenedModal} closeModal={handleFastOptionsModalState}>
                    <FastOptions/>
                </Modal>
            </main>
        </div>
    );
}

export default App;
