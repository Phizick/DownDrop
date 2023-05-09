import React, {FormEvent, useRef, useState} from 'react';
import styles from './FastOptions.module.css'
import Dropdown from '../Dropdown/Dropdown';
import {Button} from '../Button/Button';
import {FloorsArr} from "../../Constants/Floors";
import {TowersArr} from "../../Constants/Towers";
import {RoomsArr} from "../../Constants/Rooms";
import {TimeArr} from "../../Constants/Time";

interface IOption {
    value: string;
    label: string;
}
export const FastOptions = () => {
    const [selectedTower, setSelectedTower] = useState<IOption>({value: '', label: ''});
    const [selectedFloor, setSelectedFloor] = useState<IOption>({value: '', label: ''});
    const [selectedRoom, setSelectedRoom] = useState<IOption>({value: '', label: ''});
    const [selectedDate, setSelectedDate] = useState<String>('');
    const [comment, setComment] = useState('');
    const datePickerRef = useRef<any>(null);
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

    const handleTimeSelect = (option: any) => {
        setSelectedDate(String(addTimeToDate(Number(option.value))))
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const startDate = String(new Date())
        const optionsObj = {
            tower: selectedTower.value,
            floor: selectedFloor.value,
            room: selectedRoom.value,
            dateStart: startDate,
            dateEnd: selectedDate,
            comment: comment
        };
        console.log(JSON.stringify(optionsObj));
        handleFormReset(e)
    };

    function addTimeToDate(hoursToAdd: number): Date {
        const minutesToAdd = hoursToAdd * 60;
        const currentDate = new Date();
        return new Date(currentDate.getTime() + minutesToAdd * 60000);
    }

    const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSelectedTower({value:'', label: ''});
        setSelectedFloor({value:'', label: ''});
        setSelectedRoom({value:'', label: ''});
        setComment('');
        datePickerRef.current?.reset();
        buildingPickerRef.current?.reset();
        floorPickerRef.current?.reset();
        roomPickerRef.current?.reset()
        document.querySelectorAll<HTMLInputElement>('input[type=text]').forEach((input) => {
            input.value = '';
        });
    };
    const isFormValid = () => {
        return !!selectedTower && !!selectedFloor && !!selectedRoom && !!selectedDate;
    };

    return (
        <div className={styles.FastOptions__container}>
            <form className={styles.FastOptions__form} onSubmit={handleFormSubmit} onReset={handleFormReset}>
                <div className={styles.FastOptions__FormLists}>
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
                <div className={styles.FastOptions__FormTime}>
                    <Dropdown
                        options={TimeArr}
                        placeholder={'выберете время'}
                        onSelect={handleTimeSelect}
                        label={'сколько нужно времени?'}
                        required
                        ref={datePickerRef}
                    />
                </div>
                <div className={styles.FastOptions__commentField}>
                    <label className={styles.FastOptions__label}>Комментарий:</label>
                    <input
                        className={styles.FastOptions__formComment}
                        type="text"
                        value={comment || ''}
                        onChange={handleCommentChange}
                        required
                    />
                </div>
                <div className={styles.FastOptions__formBtnContainer}>
                    <Button text={'отправить'} color={'blue'} disabled={!isFormValid} type={'submit'}/>
                    <Button text={'очистить'} color={'white'} type={"reset"}/>
                </div>
            </form>
        </div>
    );
};