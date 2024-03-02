import { createContext, ReactNode, useState } from "react";

// patient data
const initialPatients: Patient[] = [

];

//types
export type Patient = {
  name: string;
  gender: string;
  phoneNumber: string;
  address: string;
  email: string;
  dob: Date;
  insurance: string;
  createdAt: Date;
  notes: string;
};

type PatientsContext = {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  editPatient: boolean;
  setEditPatient: (edit: boolean) => void;
  createPatient: (patient: Patient) => void;

};

type Props = {
  children: ReactNode;
};

// context
export const PatientsContext = createContext<PatientsContext>({
  patients: [],
  selectedPatient: null,
  setSelectedPatient: () => { },
  editPatient: false,
  setEditPatient: () => { },
  createPatient: () => { },
});

// context provider
export const PatientsProvider = ({ children }: Props) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState(false);
  const createPatient = (patient: Patient) => {
    console.log("createPatient", patient)
    const filteredPatients = patients.filter((patientObj: any) => patientObj.name !== patient.name);
    setPatients([...filteredPatients, patient]);
    console.log("new patients", patients)
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        selectedPatient,
        setSelectedPatient,
        editPatient,
        setEditPatient,
        createPatient
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
