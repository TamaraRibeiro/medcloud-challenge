import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Patients } from "./pages/patients";
import { CreatePatient } from "./pages/createPatient";
import { EditPatient } from "./pages/editPatient";

const router = createBrowserRouter([
  {
    path: "/patients",
    element: <Patients />,
  },
  {
    path: "/createPatient",
    element: <CreatePatient />,
  },
  {
    path: "/editPatient/:patientId",
    element: <EditPatient />,
  },
]);

export function App() {
  return (
    
      <RouterProvider router={router} />
 
  );
}
