import React from 'react';
import { useState } from 'react';

import './App.css';
import Dropdown from './list/list';
import {testArr} from "./list/array";
import DateInput from '../src/datePicker/datePicker'
import TimeForm from '../src/timePicker/timePicker'
import Modal from '../src/Modal/Modal'
import {AllOptions} from "./AllOptions/AllOptions";

function App() {
    const [isOpenedModal, setModalState] = useState(true)

    const handleModalState = () => {
        setModalState(!isOpenedModal)
    };

  return (
    <div className="App">
        <Modal activeModal={isOpenedModal} closeModal={handleModalState}>
            <AllOptions/>
        </Modal>
    </div>
  );
}

export default App;
