import { Calendar } from "lucide-react";
import { InputField } from "./inputField";
import { FormState, UseFormRegister } from "react-hook-form";
import { InputsProps } from "../pages/createPatient";


export function CreateEditPatientForm({ register, formstate}: {
  register: UseFormRegister<InputsProps>,
  formstate: FormState<InputsProps>}) {

  return (
    <div className="w-full text-left rounded-md border border-zinc-300 py-2 bg-white shadow-md shadow-zinc-600/50 text-zinc-600">
      <div className="text-zinc-500 border-b-2 px-10 py-3">
        <span className="text-xl">Dados pessoais</span>
      </div>

      <div className="border-b-2 px-10 py-8 grid grid-cols-4 justify-between text-zinc-350 gap-12">
        <InputField requiredinput={true} register={register} formstate={formstate} name="name" labelText={"Nome completo"} />

        <InputField requiredinput={true} register={register} formstate={formstate} name="email" labelText={"Email"} />

        <InputField requiredinput={true} register={register} formstate={formstate} name="birth"
          labelText={"Data de nascimento"}
          icon={
            <Calendar className="size-5 text-zinc-400 absolute top-1/3 right-5" />
          }
        />

        <InputField requiredinput={false} register={register} formstate={formstate} name="cpf" labelText={"CPF"} />
      </div>

      <div className="px-10 py-8 grid grid-cols-4 justify-between text-zinc-350 gap-12">
        <InputField requiredinput={true} register={register} formstate={formstate} name="cep" labelText={"CEP"} />
        <InputField requiredinput={true} register={register} formstate={formstate} name="address" labelText={"Endereço"} />
        <InputField requiredinput={true} register={register} formstate={formstate} name="addressNumber" labelText={"Número"} />
        <InputField requiredinput={false} register={register} formstate={formstate} name="complement" labelText={"Complemento"} />
        <InputField requiredinput={true} register={register} formstate={formstate} name="neighbourhood" labelText={"Bairro"} />
        <InputField requiredinput={false} register={register} formstate={formstate} name="city" labelText={"Cidade"} />
        <InputField requiredinput={false} register={register} formstate={formstate} name="uf" labelText={"UF"} />
        <InputField requiredinput={false} register={register} formstate={formstate} name="country" labelText={"País"} />
      </div>
    </div>
  );
}
