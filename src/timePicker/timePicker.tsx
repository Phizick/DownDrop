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

    return (
        <>
            <div>
                <label htmlFor="start-time">Start time:</label>
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
                    style={{
                        padding: "12px",
                        fontWeight: "bold",
                        color: "#333",
                        cursor: "pointer",
                        background: "#FCFCFD",
                        borderRadius: "12px",
                        outline: "none",
                        marginRight: '10px',
                        border: `2px solid ${isStartFocused ? "#007AFF" : "#E6E8EC"}`,
                    }}
                    tabIndex={0}
                />
            </div>
            <div>
                <label htmlFor="end-time">End time:</label>
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
                    style={{
                        padding: "12px",
                        fontWeight: "bold",
                        color: "#333",
                        cursor: "pointer",
                        background: "#FCFCFD",
                        border: `2px solid ${isStartFocused ? "#007AFF" : "#E6E8EC"}`,
                        borderRadius: "12px",
                        outline: "none",
                        marginRight: '10px'
                    }}
                    tabIndex={0}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                    style={{
                        width: 40,
                        height: 20,
                        backgroundColor: isAllDay ? '#007AFF' : '#E6E8EC',
                        borderRadius: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isAllDay ? 'flex-end' : 'flex-start',
                        padding: 2,
                        marginRight: '10px',
                        cursor: 'pointer'
                    }}
                    onClick={() => handleAllDayChange(!isAllDay)}
                >
                    <div
                        style={{
                            width: 14,
                            height: 14,
                            backgroundColor: '#FFFFFF',
                            borderRadius: '50%',
                            transform: `translateX(${isAllDay ? '0px' :
                                '0px'})`,
                            transition: 'transform 2s',
                        }}
                    />
                </div>
                <input
                    type="checkbox"
                    id="all-day"
                    checked={isAllDay}
                    onChange={(e) => handleAllDayChange(e.target.checked)}
                    style={{ display: 'none' }}
                    tabIndex={0}
                />
                <label htmlFor="all-day">All day</label>
            </div>
        </>
    );
};

export default TimeForm;