import React, { useState, useImperativeHandle, forwardRef} from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IProps extends Omit<ReactDatePickerProps, 'onChange'> {
    onSelect: (date: Date | null) => void;
}

export interface IDateInputRef {
    reset: () => void;
}

function DateInput(props: IProps, ref: React.Ref<IDateInputRef>) {
    const [startDate, setStartDate] = useState<Date | null>(null);

    const onSelect = (date: Date | null) => {
        setStartDate(date);
        props.onSelect(date);
    };

    const reset = () => {
        setStartDate(null);
    };

    useImperativeHandle(ref, () => ({
        reset,
    }));

    return (
        <div className="datePicker">
            <label className="datePicker__label" htmlFor="datepicker">
                дата
            </label>
            <DatePicker
                selected={startDate}
                onSelect={onSelect}
                dateFormat="dd.MM.yyyy"
                placeholderText="Введите дату"
                id="datepicker"
                onChange={() => {}}
            />
            <style>
                {`
          .datePicker {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 10px;
          }
          .datePicker__label {
            color: #B1B5C4;
            font-weight: 700;
            font-size: 16px;
            line-height: 12px;
            margin-left: 7px;
            margin-bottom: 7px;
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
        </div>
    );
}

export default forwardRef(DateInput);