import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput() {
    const [startDate, setStartDate] = useState(null);

    const handleDateChange = (date: any) => {
        setStartDate(date);
    };

    return (
        <div>
            <style>
                {`
        .datePicker {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 10px;          
        }
        
        .react-datepicker-wrapper {
        padding-top: 100px;
        }   
        
        .react-datepicker__input-container {
          position: relative;
        }
        
        .react-datepicker__input-container input {
          padding: 12px;
          font-weight: bold;
          color: #333;
          cursor: pointer;
          background: #FCFCFD;
          border: 2px solid #E6E8EC;
          border-radius: 12px;
        }
        
        .react-datepicker__input-container input:focus {         
          outline: none;
          border: 2px solid #3772FF;
        }
        
        .react-datepicker__input-container i {
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
          font-size: 20px;
          cursor: pointer;
        } 
      `}
            </style>
            <DatePicker
                className="datePicker"
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="dd.MM.yyyy"
                placeholderText="Введите дату"
            />
        </div>
    );
}

export default DateInput;