import React from "react";
import ButtonStyles from './Button.module.css'


interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string,
    color: 'blue' | 'white'
    extraClass?: string,
    img?: string,
    type:  "button" | "reset" | "submit" | undefined
}

export const Button: React.FC<IButtonProps> = ({
                                                   text,
                                                   extraClass = '',
                                                   color = 'blue',
                                                   img= '',
                                                   ...rest
                                               }) => {

    const className = color === 'blue' ? `${ButtonStyles.buttonBlue} ${extraClass}` : `${ButtonStyles.buttonWhite} ${extraClass}`
    const textClassName = color === 'blue' ? `${ButtonStyles.textBlue}` : `${ButtonStyles.textWhite}`

    return (
        <button
            className={img !== '' ? `${className} ${ButtonStyles.container}` : `${className}`}
            {...rest}
        >
            {img !== '' &&
                <img src={img} alt={''} className={ButtonStyles.img}/>
            }
            <p className={textClassName}>{text}</p>
        </button>
    )
}