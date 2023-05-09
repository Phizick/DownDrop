import React, { useState, FormEvent, useRef, FC } from 'react';
import styles from './AllOptions.module.css'
import Dropdown from '../Dropdown/Dropdown';
import DateInput from '../DateInput/DateInput';
import TimeForm from '../TimeForm/TimeForm';
import { Button } from '../Button/Button';
import {FloorsArr} from "../../Constants/Floors";
import {TowersArr} from "../../Constants/Towers";
import {RoomsArr} from "../../Constants/Rooms";

interface IOption {
    value: string;
    label: string;
}
export const AllOptions: FC = () => {
    const [selectedTower, setSelectedTower] = useState<IOption>({value: '', label: ''});
    const [selectedFloor, setSelectedFloor] = useState<IOption>({value: '', label: ''});
    const [selectedRoom, setSelectedRoom] = useState<IOption>({value: '', label: ''});
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
        const optionsObj = {
            tower: selectedTower.value,
            floor: selectedFloor.value,
            room: selectedRoom.value,
            date: selectedDate,
            startTime: selectedStartTime,
            endTime: selectedEndTime,
            comment: comment
        };
        console.log(JSON.stringify(optionsObj));
        handleFormReset(e)
    };

    const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedTower({value:'', label: ''});
        setSelectedFloor({value:'', label: ''});
        setSelectedRoom({value:'', label: ''});
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
    };

    const isFormValid = () => {
        return !!selectedTower && !!selectedFloor && !!selectedRoom && !!selectedDate && !!selectedStartTime && !!selectedEndTime;
    }

    return (
        <div className={styles.AllOptions__container}>
            <form className={styles.AllOptions__form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className={styles.AllOptions__FormLists}>
                    <Dropdown
                        options={TowersArr}
                        placeholder={'выберете башню'}
                        onSelect={handleTowerSelect}
                        label={'башня'}
                        required
                        ref={buildingPickerRef}
                    />
                    <Dropdown
                        options={FloorsArr}
                        placeholder={'выберете этаж'}
                        onSelect={handleFloorSelect}
                        label={'этаж'}
                        required
                        ref={floorPickerRef}
                    />
                    <Dropdown
                        options={RoomsArr}
                        placeholder={'выберете комнату'}
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
                    <input
                        className={styles.AllOptions__formComment}
                        type="text"
                        value={comment || ''}
                        onChange={handleCommentChange}
                        required
                    />
                </div>
                <div className={styles.AllOptions__formBtnContainer}>
                <Button text={'отправить'} color={'blue'} disabled={!isFormValid} type={'submit'}/>
                <Button text={'очистить'} color={'white'} type={"reset"}/>
                </div>
            </form>
        </div>
    );
};