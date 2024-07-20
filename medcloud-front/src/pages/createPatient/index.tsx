import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { CreateEditPatientForm } from "../../components/formCreateEditPatient";
import { useForm, SubmitHandler } from "react-hook-form";
import { api } from "../../services/axios";

export type InputsProps = {
  id: string;
  name: string;
  email: string;
  birth: string;
  cpf: string;
  cep: string;
  address: string;
  addressNumber: string;
  complement: string;
  neighbourhood: string;
  city: string;
  uf: string;
  country: string;
  nameInput: string;
};
export function CreatePatient() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset} = useForm<InputsProps>();
  const onSubmit: SubmitHandler<InputsProps> = async (data) => {
    try {
      await api.post("/createPatient", data);
      reset()
      navigate("/patients")
    } catch (error) {
      console.error(error);
    }
  };
  function cancelEditPatient() {
    navigate("/patients");
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="bg-zinc-200 px-6 py-8 space-y-6 h-screen">
        <h2 className="text-xl text-zinc-500">Criar paciente</h2>

        <CreateEditPatientForm register={register} formstate={formState} />
      </div>

      <div className="flex gap-6 px-6 pb-5 justify-end">
        <Button type="button" onClick={cancelEditPatient} variant="tertiary">
          Cancelar
        </Button>
        <Button type="submit">Salvar</Button>
      </div>
    </form>
  );
}
