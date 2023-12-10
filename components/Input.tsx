"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import clsx from 'clsx'
import { register } from "module";
interface inputProps {
  label: string;
  id: string;
  type: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}
const Input: React.FC<inputProps> = ({ label, id, disabled,errors,register,type }) => {
  return (
    <div className="my-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input id={id} 
        {...register(id)}
        type={type} 
        disabled={disabled} 
        className={clsx(`input-form
        block
        w-full
        border-0
        px-2
        py-1
        shadow-md
        ring-1
        ring-inset
        focus:outline-none
        focus:ring-2
        focus:ring-inset
        focus:ring-blue-500
        rounded
        text-md
        font-bold
        `,
        errors[id]&&'focus:ring-rose-500',
        disabled && 'opacity-50 cursor-pointer')} />
      </div>
    </div>
  );
};

export default Input;
