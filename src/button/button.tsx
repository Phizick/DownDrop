import React from "react";
import ButtonStyles from './Button.module.css'


interface IButtonProps extends React.HTMLProps<HTMLButtonElement> {
    text: string,
    type: 'blue' | 'white'
    extraClass?: string,
    img?: string
}

export const Button: React.FC<IButtonProps> = ({
                                                   text,
                                                   extraClass = '',
                                                   type = 'blue',
                                                   img= '',
                                                   ...rest
                                               }) => {

    const className = type === 'blue' ? `${ButtonStyles.buttonBlue} ${extraClass}` : `${ButtonStyles.buttonWhite} ${extraClass}`
    const textClassName = type === 'blue' ? `${ButtonStyles.textBlue}` : `${ButtonStyles.textWhite}`

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