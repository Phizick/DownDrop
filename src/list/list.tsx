import { useState, FC, KeyboardEvent, useRef } from 'react';
import styles from './list.module.css';

interface DropdownOption {
    label: string;
    value: string;
}

interface DropdownProps {
    options: DropdownOption[];
    placeholder: string;
    onSelect: (option: DropdownOption | null) => void;
    label: string;

}

const Dropdown: FC<DropdownProps> = ({ options, placeholder, onSelect, label}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
        options.find((option) => option.value === '') || null
    );
    const dropdownRef = useRef<HTMLDivElement>(null);
    const mouseDownRef = useRef(false);


    const highlightOption = (index: number) => {
        const optionsNodes = dropdownRef.current?.querySelectorAll('.dropdown_option');
        if (optionsNodes) {
            optionsNodes.forEach((node) => {
                node?.classList.remove('selected');
            });
            const optionNode = optionsNodes[index];
            optionNode?.classList.add('selected');
        }
    };


    const handleOptionClick = (index: number) => {
        setSelectedOption(options[index]);
        setIsOpen(false);
        if (onSelect) {
            onSelect(options[index]);
        }
        highlightOption(index);
    };

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

            <div
                className={`${styles.dropdown_container} ${isOpen ? styles.active : ''}`}
                onBlur={handleBlur}
                ref={dropdownRef}
            >
                <label className={styles.dropdown_label} htmlFor="dropdown-input">{label}</label>
                <div
                    className={`${styles.dropdown_header} ${isOpen ? styles.active : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    onMouseDown={handleMouseDown}
                    tabIndex={0}
                >

                    <input
                        className={styles.dropdown_input}
                        type='text'
                        value={selectedOption ? selectedOption.label : ''}
                        placeholder={placeholder}
                        id="dropdown-input"

                    />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                        width='18px'
                        height='18px'
                    >
                        <path d='M24 24H0V0h24v24z' fill='none' opacity='.87' />
                        <path d='M7 10l5 5 5-5z' />
                    </svg>
                </div>
                {isOpen && (
                    <ul className={styles.dropdown_options}  tabIndex={0} >
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                className={`${styles.dropdown_option} ${
                                    selectedOption === option ? styles.selected : ''
                                }`}
                                onMouseDown={handleMouseDown}
                                onClick={() => handleOptionClick(index)}
                                tabIndex={-1
                                }
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};

export default Dropdown;