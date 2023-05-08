import React, { useState } from 'react';
import styles from './AllOptions.module.css';
import { testArr } from '../list/array';
import Dropdown from '../list/list';
import DateInput from '../datePicker/datePicker';
import TimeForm from '../timePicker/timePicker';
import { Button } from '../button/button';

export const AllOptions = () => {

    const [selectedTower, setSelectedTower] = useState('');
    const [selectedFloor, setSelectedFloor] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedStartTime, setSelectedStartTime] = useState('');
    const [selectedEndTime, setSelectedEndTime] = useState('');
    const [isAllDay, setIsAllDay] = useState(false);

    const handleTowerSelect = (option: any) => {
        setSelectedTower(option);
    };

    const handleFloorSelect = (option: any) => {
        setSelectedFloor(option);
    };

    const handleRoomSelect = (option: any) => {
        setSelectedRoom(option);
    };

    const handleDateSelect = (date: any) => {
        setSelectedDate(date);
    };

    const handleStartTimeSelect = (time: any) => {
        setSelectedStartTime(time);
    };

    const handleEndTimeSelect = (time: any) => {
        setSelectedEndTime(time);
    };

    const handleAllDayCheck = (e: any) => {
        setIsAllDay(e.target.checked);
    };

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        const timeObj = {
            tower: selectedTower,
            floor: selectedFloor,
            room: selectedRoom,
            date: selectedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
            isAllDay: isAllDay,
        };
        console.log(JSON.stringify(timeObj));
    };

    return (
        <div className={styles.AllOptions__container}>
            <h1 className={styles.AllOptions__header}></h1>
            <form className={styles.AllOptions__form} onSubmit={handleFormSubmit}>
                <div className={styles.AllOptions__FormLists}>
                    <Dropdown
                        options={testArr}
                        placeholder={'башня'}
                        onSelect={handleTowerSelect}
                        label={'башня'}
                    />
                    <Dropdown
                        options={testArr}
                        placeholder={'этаж'}
                        onSelect={handleFloorSelect}
                        label={'этаж'}
                    />
                    <Dropdown
                        options={testArr}
                        placeholder={'комната'}
                        onSelect={handleRoomSelect}
                        label={'комната'}
                    />
                </div>
                <div className={styles.AllOptions__formInputs}>
                    <DateInput onSelect={handleDateSelect} />
                    <TimeForm
                        onStartTimeSelect={handleStartTimeSelect}
                        onEndTimeSelect={handleEndTimeSelect}
                        onAllDayCheck={handleAllDayCheck}
                    />
                </div>
                <Button text={'отправить'} type={'blue'} />
                <Button text={'отмена'} type={'white'} />
            </form>
        </div>
    );
};