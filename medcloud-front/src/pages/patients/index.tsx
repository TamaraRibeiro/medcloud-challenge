import {
  ChevronsLeft,
  ChevronsRight,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "../../components/button";
import { useState } from "react";
import { DeletePatientModal } from "../../components/modalDeletePatient";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { api } from "../../services/axios";
import { splitArrayPagination } from "../../utils/scripts";

export interface Patient {
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
}

export function Patients() {
  const [isDeletePatientModalOpen, setIsDeletePatientModalOpen] =
    useState(false);
  const [patientsData, setPatientsData] = useState([] as Patient[][]);
  const [patientsDataSearch, setPatientsDataSearch] = useState([] as Patient[]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data, refetch } = useQuery("patients", async () => {
    const result = await api.get("/patients");
    setPatientsDataSearch(result.data.patients)
    setPatientsData(splitArrayPagination(result.data.patients));
    return result.data.patients;
  });
  function openDeletePatientModal() {
    setIsDeletePatientModalOpen(!isDeletePatientModalOpen);
  }

  function editPatient(id: string) {
    navigate(`/editPatient/${id}`);
  }

  function createPatient() {
    navigate("/createPatient");
  }

  function searchPatient() {
    setPatientsData(splitArrayPagination(patientsDataSearch.filter(patient => patient.name.toLowerCase().includes(search.toLowerCase()))));
    console.log(patientsData)
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end px-8">
        <Button type="button" onClick={createPatient} variant="primary">
          <Plus className="size-4 text-white" />
          Novo
        </Button>
      </div>

      <div className="bg-zinc-200 px-10 pt-8 py-14 mt-5 space-y-6">
        <div className="flex  gap-14 flex-1">
          <h2 className="text-xl text-zinc-500">Pacientes</h2>
          <div className="flex gap-6 max-w-[1024px] flex-1">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-md outline-none px-7 h-8 text-sm flex-1
            "
              type="text"
              name=""
              id=""
            />
            <Search className="size-4 text-zinc-500 absolute translate-x-1 translate-y-[7px]" />
            <Button onClick={searchPatient} variant="secondary">Buscar</Button>
          </div>
        </div>

        <div className="w-full text-left rounded-md border border-zinc-300 py-2 bg-white shadow-md shadow-zinc-600/50 text-zinc-600 h-screen">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4">Nome</th>
                <th>E-mail</th>
                <th>Data de Nascimento</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data &&
                patientsData[currentPage]?.map((patient: Patient) => (
                  <tr key={patient.id} className="border-b border-zinc-300">
                    <td className="px-4 py-3">{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.birth}</td>
                    <td className="flex gap-6 py-4">
                      <button onClick={() => editPatient(patient.id)}>
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={openDeletePatientModal}>
                        <Trash2 className="size-4" />
                        {isDeletePatientModalOpen && (
                          <DeletePatientModal
                            refetch={refetch}
                            id={patient.id}
                            openDeletePatientModal={openDeletePatientModal}
                          />
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pt-10 flex justify-center gap-14 items-center">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={patientsData.length < 1}
            variant="primary"
          >
            <ChevronsLeft className="size-4 mt-0.5" />
            Anterior
          </Button>

          <p className="font-semibold">Página {currentPage + 1}</p>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage <= 0}
            variant="primary"
          >
            Próxima
            <ChevronsRight className="size-4 mt-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
