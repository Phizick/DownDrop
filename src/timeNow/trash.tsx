import React, { useState } from "react";

const TimeForm: React.FC = () => {
    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("");
    const [isAllDay, setIsAllDay] = useState<boolean>(false);
    const [isStartFocused, setIsStartFocused] = useState<boolean>(false);

    const formatTime = (input: string) => {
        const digitsOnly = input.replace(/\D/g, '');
        let formattedTime = '';
        if (digitsOnly.length > 0) {
            formattedTime = digitsOnly.substr(0, 2);
            if (formattedTime > '23') {
                formattedTime = '23';
            }
            if (digitsOnly.length > 2) {
                formattedTime += ':' + digitsOnly.substr(2, 2);
                if (formattedTime.substr(3, 2) > '59') {
                    formattedTime = formattedTime.substr(0, 3) + '59';
                }
            }
        }
        return formattedTime;
    };

    const handleAllDayChange = (isChecked: boolean) => {
        setIsAllDay(isChecked);
        setStartTime(isChecked ? "09:00" : "");
        setEndTime(isChecked ? "17:00" : "");
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const timeObj = { startTime, endTime, isAllDay };
        console.log(JSON.stringify(timeObj));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="start-time" className="time__input-label">начало:</label>
                <input
                    type="text"
                    id="start-time"
                    pattern="\d{1,2}:\d{2}"
                    maxLength={5}
                    value={formatTime(startTime)}
                    onChange={(e) => setStartTime(e.target.value)}
                    disabled={isAllDay}
                    onFocus={() => setIsStartFocused(true)}
                    onBlur={() => setIsStartFocused(false)}
                    tabIndex={0}
                />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="end-time" className="time__input-label">окончание:</label>
                <input
                    type="text"
                    id="end-time"
                    pattern="\d{1,2}:\d{2}"
                    maxLength={5}
                    value={formatTime(endTime)}
                    onChange={(e) => setEndTime(e.target.value)}
                    disabled={isAllDay}
                    onFocus={() => setIsStartFocused(true)}
                    onBlur={() => setIsStartFocused(false)}
                    tabIndex={0}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    onClick={() => handleAllDayChange(!isAllDay)}
                >
                    <div />
                </div>
                <input
                    type="checkbox"
                    id="all-day"
                    checked={isAllDay}
                    onChange={(e) => handleAllDayChange(e.target.checked)}
                    style={{ display: 'none' }}
                    tabIndex={0}
                />
                <label htmlFor="all-day">весь день</label>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default TimeForm;