import React, {useState, KeyboardEvent, useRef, useImperativeHandle, forwardRef} from 'react';
import styles from './Dropdown.module.css';


interface IDropdownOption {
    label: string;
    value: string  | number;
}

interface IDropdownProps {
    options: IDropdownOption[];
    placeholder: string;
    onSelect: (option: IDropdownOption | null) => void;
    label: string;
    required: boolean;
}

export interface IDropdownInputRef {
    reset: () => void;
}
//компонент выпадающего списка
function Dropdown({ options, placeholder, onSelect, label}: IDropdownProps, ref: React.Ref<IDropdownInputRef>) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IDropdownOption | null>(
        options.find((option) => option.value === '') || null
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mouseDownRef = useRef(false);


    const highlightOption = (index: number) => {
        const optionsNodes = dropdownRef.current?.querySelectorAll('.dropdown__option');
        if (optionsNodes) {
            optionsNodes.forEach((node) => {
                node?.classList.remove('selected');
            });
            const optionNode = optionsNodes[index];
            optionNode?.classList.add('selected');
        }
    };

    const reset = () => {
        setSelectedOption(null);
    };

    useImperativeHandle(ref, () => ({
        reset,
    }));


    const handleOptionClick = (index: number) => {
        setSelectedOption(options[index]);
        setIsOpen(false);
        if (onSelect) {
            onSelect(options[index]);
        }
        highlightOption(index);
    };

    //обработчик навигации при помощи клавиатуры
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            setIsOpen(!isOpen);
        }
        else if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            } else {
                const index = selectedOption !== null ? options.indexOf(selectedOption) + 1 : 0;
                const nextIndex = index >= options.length ? 0 : index;
                setSelectedOption(options[nextIndex]);
                highlightOption(nextIndex);
            }
        }
        else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (!isOpen) {
                setIsOpen(true);
            } else {
                const index = selectedOption !== null ? options.indexOf(selectedOption) - 1 : options.length - 1;
                const prevIndex = index < 0 ? options.length - 1 : index;
                setSelectedOption(options[prevIndex]);
                highlightOption(prevIndex);
            }
        }
    };

    const handleBlur = () => {
        if (!mouseDownRef.current) {
            setIsOpen(false);
        }
    };

    const handleMouseDown = () => {
        mouseDownRef.current = true;
        setTimeout(() => {
            mouseDownRef.current = false;
        }, 0);
    };

    return (
        <>
            <div className={`${styles.dropdown__container} ${isOpen ? styles.active : ''}`}
                 onBlur={handleBlur}
                 ref={dropdownRef}>
                <label className={styles.dropdown__label} htmlFor="dropdown-input">
                    {label}
                </label>
                <div className={`${styles.dropdown__header} ${isOpen ? styles.active : ''}`}
                     onClick={() => setIsOpen(!isOpen)}
                     onKeyDown={handleKeyDown}
                     onMouseDown={handleMouseDown}
                     tabIndex={0}
                >
                    <input
                        className={styles.dropdown__input}
                        type="text"
                        value={selectedOption ? selectedOption.label : ''}
                        placeholder={placeholder}
                        id="dropdown-input"
                        readOnly
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18px" height="18px">
                        <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                        <path d="M7 10l5 5 5-5z" />
                    </svg>
                </div>
                {isOpen && (
                    <ul className={styles.dropdown__options} tabIndex={0}>
                        {options.map((option, index) => (
                            <li key={index}
                                className={`${styles.dropdown__option} ${selectedOption === option ? styles.selected : ""}`}
                                onMouseDown={handleMouseDown}
                                onClick={() => handleOptionClick(index)}
                                tabIndex={-1}>
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default forwardRef(Dropdown);