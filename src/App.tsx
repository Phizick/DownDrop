import React from 'react';

import './App.css';
import Dropdown from './list/list';
import {testArr} from "./list/array";
import DateInput from '../src/datePicker/datePicker'
import TimeForm from '../src/timePicker/timePicker'

function App() {
  const selection = () => {
    console.log(1)
  }
  return (
    <div className="App">
      <Dropdown options={testArr} placeholder={'select'} onSelect={selection}/>
      <Dropdown options={testArr} placeholder={'select'} onSelect={selection}/>
      <Dropdown options={testArr} placeholder={'select'} onSelect={selection}/>
        <DateInput/>
        <TimeForm/>
    </div>
  );
}

export default App;
