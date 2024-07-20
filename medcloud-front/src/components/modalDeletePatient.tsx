import { X } from "lucide-react";
import { Button } from "./button";
import { api } from "../services/axios";

interface DeletePatientModalProps {
  openDeletePatientModal: () => void;
  id: string;
  refetch: () => void;
}

export function DeletePatientModal({
  openDeletePatientModal, id, refetch
}: DeletePatientModalProps) {

  async function deletePatient(id: string) {
    await api.delete(`/patients/${id}`);
    refetch()
  }
  return (
    <div className="fixed inset-0 bg-zinc-500/70 flex flex-col items-center justify-center">
      <div className="border border-zinc-200 rounded-xl bg-white w-80">
        <div className="flex justify-between items-center px-4 py-4 border-b border-zinc-300">
          <h3 className="text-zinc-600 tracking-wide">Excluir paciente</h3>
          <button type="button" onClick={openDeletePatientModal}>
            <X className="size-5 text-zinc-600" />
          </button>
        </div>
        <div className="flex justify-between items-center py-8 border-b border-zinc-300">
          <p className="text-zinc-600 text-xs text-center mx-auto max-w-60">
            Você não terá mais acesso ao paciente, você quer mesmo excluí-lo?
          </p>
        </div>
        <div className="flex justify-evenly items-center px-6 py-6 border-b border-zinc-300">
          <Button type="button" onClick={openDeletePatientModal} variant="quinary" size="modal">
            Cancelar
          </Button>
          <Button onClick={() => deletePatient(id)} variant="quaternary" size="modal">
            Sim, excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
