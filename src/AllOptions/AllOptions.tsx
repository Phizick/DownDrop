import React, { useState, FormEvent, useRef } from 'react';
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
    const [comment, setComment] = useState('');
    const datePickerRef = useRef<any>(null);
    const timePickerRef = useRef<any>(null);
    const buildingPickerRef = useRef<any>(null);
    const floorPickerRef = useRef<any>(null);
    const roomPickerRef = useRef<any>(null);

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

    const handleAllDayCheck = (time: any) => {
        setIsAllDay(time);
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const timeObj = {
            tower: selectedTower,
            floor: selectedFloor,
            room: selectedRoom,
            date: selectedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
            isAllDay: isAllDay,
            comment: comment
        };
        console.log(JSON.stringify(timeObj));
    };

    const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
        setSelectedTower('');
        setSelectedFloor('');
        setSelectedRoom('');
        setSelectedDate('');
        setSelectedStartTime('');
        setSelectedEndTime('');
        setIsAllDay(false);
        setComment('');
        datePickerRef.current?.reset();
        timePickerRef.current?.reset();
        buildingPickerRef.current?.reset();
        floorPickerRef.current?.reset();
        roomPickerRef.current?.reset()

        document.querySelectorAll<HTMLInputElement>('input[type=text]').forEach((input) => {
            input.value = '';
        });
        console.log(document.querySelectorAll<HTMLInputElement>('input[type=text]'))
    };

    const isFormValid = () => {
        return !!selectedTower && !!selectedFloor && !!selectedRoom && !!selectedDate && !!selectedStartTime && !!selectedEndTime;
    }

    return (
        <div className={styles.AllOptions__container}>
            <form className={styles.AllOptions__form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className={styles.AllOptions__FormLists}>
                    <Dropdown
                        options={testArr}
                        placeholder={'башня'}
                        onSelect={handleTowerSelect}
                        label={'башня'}
                        required
                        ref={buildingPickerRef}
                    />
                    <Dropdown
                        options={testArr}
                        placeholder={'этаж'}
                        onSelect={handleFloorSelect}
                        label={'этаж'}
                        required
                        ref={floorPickerRef}
                    />
                    <Dropdown
                        options={testArr}
                        placeholder={'комната'}
                        onSelect={handleRoomSelect}
                        label={'комната'}
                        required
                        ref={roomPickerRef}
                    />
                </div>
                <div className={styles.AllOptions__formInputs}>
                    <DateInput onSelect={handleDateSelect} required ref={datePickerRef}/>
                    <TimeForm
                        onStartTimeSelect={handleStartTimeSelect}
                        onEndTimeSelect={handleEndTimeSelect}
                        onAllDayCheck={handleAllDayCheck}
                        required
                        ref={timePickerRef}
                    />
                </div>
                <div className={styles.AllOptions__commentField}>
                    <label>Комментарий:</label>
                    <input className={styles.AllOptions__formComment} type="text" value={comment} onChange={handleCommentChange} required/>
                </div>
                <Button text={'отправить'} color={'blue'} disabled={!isFormValid} type={'submit'}/>
                <Button text={'отмена'} color={'white'} type={'button'}/>

                <button type="reset">clear</button>
            </form>
        </div>
    );
};