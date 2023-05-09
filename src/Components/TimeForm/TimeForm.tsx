import React, { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./TimeForm.module.css";

interface IProps {
    onStartTimeSelect: (time: string | undefined) => void;
    onEndTimeSelect: (time: string | undefined) => void;
    onAllDayCheck: (isChecked: boolean) => void;
    required: boolean;
}

export interface ITimeInputRef {
    reset: () => void;
}

function TimeForm({ onStartTimeSelect, onEndTimeSelect, onAllDayCheck }: IProps, ref: React.Ref<ITimeInputRef>) {
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
    const [isAllDay, setIsAllDay] = useState<boolean>(false);
    const [isStartFocused, setIsStartFocused] = useState<boolean>(false);
    const [isEndFocused, setIsEndFocused] = useState<boolean>(false);
    const [invalidInput, setInvalidInput] = useState<boolean>(false);

    const formatTime = (input: string) => {
        const digitsOnly = input.replace(/\D/g, "");
        let formattedTime = "";
        if (digitsOnly.length > 0) {
            formattedTime = digitsOnly.substr(0, 2);
            if (formattedTime > "23") {
                formattedTime = "23";
            }
            if (digitsOnly.length > 2) {
                formattedTime += ":" + digitsOnly.substr(2, 2);
                if (formattedTime.substr(3, 2) > "59") {
                    formattedTime = formattedTime.substr(0, 3) + "59";
                }
            }

        }
        return formattedTime;
    };

    const reset = () => {
        setStartTime("");
        setEndTime("");
        setIsAllDay(false);
    };

    useImperativeHandle(ref, () => ({
        reset,
    }));

    // const handleStartTimeChange = (newStartTime: string) => {
    //     setInvalidInput(false);
    //     setStartTime(newStartTime);
    //     onStartTimeSelect(newStartTime);
    //     if (newStartTime >= endTime) {
    //         setEndTime("");
    //     }
    // };

    const handleStartTimeChange = (newStartTime: string) => {
        setInvalidInput(false);
        setStartTime(newStartTime);
        onStartTimeSelect(newStartTime);
        if (newStartTime >= endTime) {
            const newEndTime = new Date(new Date(`2022-01-01 ${newStartTime}`).getTime() + 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}); // добавляем 1 минуту к newStartTime
            setEndTime(newEndTime);
            onEndTimeSelect(newEndTime);
        }
    };

    // const handleEndTimeChange = (newEndTime: string) => {
    //     setInvalidInput(false);
    //     if (newEndTime >= startTime) {
    //         setEndTime(newEndTime);
    //         onEndTimeSelect(newEndTime);
    //     }
    // };

    const handleEndTimeInput = (newEndTime: string) => {
        if (newEndTime === startTime) {
            const newEndTime = new Date(new Date(`2022-01-01 ${startTime}`).getTime() + 60 * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            setEndTime(newEndTime);
            onEndTimeSelect(newEndTime);
        }
    }

    const handleAllDayChange = (isChecked: boolean) => {
        setIsAllDay(isChecked);
        setStartTime(isChecked ? "09:00" : "");
        setEndTime(isChecked ? "17:00" : "");
        onStartTimeSelect("09:00");
        onEndTimeSelect("17:00");
        setIsStartFocused(false);
        setIsEndFocused(false);
    };

    return (
        <div className={styles.timeForm__mainContainer}>
            <div className={styles.timeForm__inputContainer}>
                <label htmlFor="start-time" className={styles.timeForm__inputLabel}>
                    начало:
                </label>
                <input
                    type="text"
                    id="start-time"
                    pattern="\d{1,2}:\d{2}"
                    maxLength={5}
                    value={formatTime(startTime) || ''}
                    onChange={(e) => {
                        handleStartTimeChange(e.target.value);
                        onStartTimeSelect(e.target.value);
                    }}
                    onFocus={() => setIsStartFocused(true)}
                    onBlur={() => setIsStartFocused(false)}
                    className={isStartFocused ? `${styles.timeForm__input} ${styles.timeForm__input_active}` : `${styles.timeForm__input}`}
                    tabIndex={0}
                    disabled={isAllDay}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsStartFocused(false);
                        }
                    }}
                />
            </div>
            <div className={styles.timeForm__inputContainer}>
                <label htmlFor="end-time" className={styles.timeForm__inputLabel}>
                    конец:
                </label>
                <input
                    type="text"
                    id="end-time"
                    pattern="\d{1,2}:\d{2}"
                    maxLength={5}
                    value={formatTime(endTime) || ''}
                    onChange={(e) => {
                        setEndTime(e.target.value);
                        onEndTimeSelect(e.target.value);
                    }}
                    onInput={(e: any) => {
                        handleEndTimeInput(e.target.value)
                    }
                    }
                    onFocus={() => setIsEndFocused(true)}
                    onBlur={() => setIsEndFocused(false)}
                    className={isEndFocused ? `${styles.timeForm__input} ${styles.timeForm__input_active}` : `${styles.timeForm__input}`}
                    disabled={isAllDay}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsEndFocused(false);
                        }
                    }}
                />
            </div>
            <div className={styles.timeForm__inputCheckboxContainer}>
                <div
                    className={isAllDay ? `${styles.timeForm__inputCheckbox} ${styles.timeForm__inputCheckbox_active}` : `${styles.timeForm__inputCheckbox}`}
                    onClick={() => {
                        handleAllDayChange(!isAllDay);
                        onAllDayCheck(!isAllDay);
                    }}
                >
                    {invalidInput && <p style={{ color: "red" }}>Конец не может быть раньше или одновременно с началом</p>}
                    <div className={styles.timeForm__inputCheckboxCircle} />
                </div>
                <input
                    type="checkbox"
                    id="all-day"
                    checked={isAllDay}
                    onChange={(e) => {
                        handleAllDayChange(e.target.checked);
                    }}
                    style={{ display: "none" }}
                    tabIndex={1}
                    defaultValue={""}
                />
                <label htmlFor="all-day">Весь день</label>
            </div>
        </div>
    );
}

export default forwardRef(TimeForm);
