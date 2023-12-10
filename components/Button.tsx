import { type } from "os";
import React from "react";
import clsx from 'clsx'
interface buttonProps{
    children:React.ReactNode;
    type:"submit"|"reset"|"button";
    disabled?:boolean
}
const Button:React.FC<buttonProps> = ({children,type, disabled}) => {
    return (
        <div className="mt-4">
            <button className={clsx(`w-full  text-white py-1.5 rounded`,disabled?'bg-sky-300':'bg-sky-600')} type={type} 
            disabled={disabled}
            >
            {children}
            </button>
        </div>
    );
};

export default Button;