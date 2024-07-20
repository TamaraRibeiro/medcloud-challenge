import { ComponentProps, ReactNode } from "react";
import { InputsProps } from "../pages/createPatient";
import { FormState, UseFormRegister } from "react-hook-form";

interface InputFieldProps extends ComponentProps<"input"> {
  labelText: string;
  icon?: ReactNode;
  register: UseFormRegister<InputsProps>;
  formstate: FormState<InputsProps>;
  requiredinput: boolean;
  refmask?: React.MutableRefObject<HTMLInputElement | null> | undefined;
}

export function InputField({
  register,
  formstate: { errors },
  labelText,
  icon,
  // requiredinput,
  // refmask,
  ...props
}: InputFieldProps) {
  // requiredinput;
  const nameInput = props.name as keyof InputsProps
  return (
    <div>
      <div className="bg-zinc-100 rounded-md px-4 py-2 space-y-1 relative">
        <label htmlFor={nameInput}>{labelText}</label>
        <input
          {...props}
          {...register(nameInput)}
        
          name={nameInput}
          className="w-full flex-1 outline-none bg-transparent text-zinc-600"
        />
        {icon}
      </div>
      {errors[nameInput] && <span className="text-xs text-red-400">* Campo obrigatório</span> }
    </div>
  );
}
