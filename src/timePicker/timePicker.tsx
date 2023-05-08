import React, {useState, forwardRef, useImperativeHandle} from 'react';


interface Props {
    onStartTimeSelect: (time: string) => void;
    onEndTimeSelect: (time: string) => void;
    onAllDayCheck: (isChecked: boolean) => void;
    required: boolean;
}

export interface TimeInputRef {
    reset: () => void;
}

function TimeForm({ onStartTimeSelect, onEndTimeSelect, onAllDayCheck }: Props, ref: React.Ref<TimeInputRef>) {
    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');
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

    const reset = () => {
        setStartTime('');
        setEndTime('');
        setIsAllDay(false);
    };

    useImperativeHandle(ref, () => ({
        reset,
    }));

    const handleAllDayChange = (isChecked: boolean) => {
        setIsAllDay(isChecked);
        setStartTime(isChecked ? '09:00' : '');
        setEndTime(isChecked ? '17:00' : '');
        setIsStartFocused(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row"}}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="start-time" className="time__input-label">
                начало:
            </label>
            <input
                type="text"
                id="start-time"
                pattern="\d{1,2}:\d{2}"
                maxLength={5}
                value={formatTime(startTime)}
                onChange={(e) => setStartTime(e.target.value)}
                onFocus={() => setIsStartFocused(true)}
                onBlur={() => setIsStartFocused(false)}
                style={{
                    padding: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    cursor: 'pointer',
                    background: '#FCFCFD',
                    borderRadius: '12px',
                    outline: 'none',
                    marginRight: '10px',
                    width: '70px',
                    border: `2px solid ${isStartFocused ? '#007AFF' : '#E6E8EC'}`,
                }}
                tabIndex={0}
                disabled={isAllDay}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setIsStartFocused(false);
                        onStartTimeSelect(startTime);
                    }
                }}
            />
        </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="end-time" className="time__input-label">
                конец:
            </label>
            <input
                type="text"
                id="end-time"
                pattern="\d{1,2}:\d{2}"
                maxLength={5}
                value={formatTime(endTime)}
                onChange={(e) => setEndTime(e.target.value)}
                style={{
                    padding: '12px',
                    fontWeight: 'bold',
                    color: '#333',
                    cursor: 'pointer',
                    background: '#FCFCFD',
                    borderRadius: '12px',
                    outline: 'none',
                    width: '70px',
                    border: `2px solid ${'#E6E8EC'}`,
                }}
                disabled={isAllDay}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onEndTimeSelect(endTime);
                    }
                }}
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
                <label htmlFor="all-day">Весь день</label>
            <style>
                {`
          .time__input-label {
            color: #B1B5C4;
            font-weig
ht: 700;
            font-size: 16px;
            line-height: 12px;
            margin-left: 7px;
            margin-bottom: 7px;
          }
        `}
            </style>
        </div>
        </div>

    );
}

export default forwardRef(TimeForm);