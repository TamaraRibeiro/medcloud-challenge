import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { CreateEditPatientForm } from "../../components/formCreateEditPatient";
import { api } from "../../services/axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { InputsProps } from "../createPatient";
import { useQuery } from "react-query";
import { Patient } from "../patients";

export function EditPatient() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.patientId;
  const { data } = useQuery<Patient>("getPatient", async () => {
    const result = await api.get(`/patients/${id}`);
    return result.data.patients;
  });
  const { register, handleSubmit, formState, reset} = useForm<InputsProps>({
    defaultValues: {
      name: data?.name,
      email: data?.email,
      birth: data?.birth,
      cpf: data?.cpf,
      address: data?.address,
      addressNumber: data?.addressNumber,
      complement: data?.complement,
      neighbourhood: data?.neighbourhood,
      city: data?.city,
      uf: data?.uf,
      country: data?.country,
    },
  });
  const onSubmit: SubmitHandler<InputsProps> = async (data) => {
    try {
      await api.put(`/patients/${id}`, data);
      reset()
      navigate("/patients")
    } catch (error) {
      console.error(error);
    }
  };

  function cancelEditPatient() {
    reset()
    navigate("/patients");
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="bg-zinc-200 px-6 py-8 space-y-6 h-screen">
        <h2 className="text-xl text-zinc-500">Editar paciente</h2>

        <CreateEditPatientForm register={register} formstate={formState} />
      </div>

      <div className="flex gap-6 px-6 pb-5 justify-end">
        <Button type="button" onClick={cancelEditPatient} variant="tertiary">Cancelar</Button>
        <Button>Salvar</Button>
      </div>
    </form>
  );
}
