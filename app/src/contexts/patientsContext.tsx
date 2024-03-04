import { createContext, ReactNode, useState } from "react";

// patient data
const initialPatients: Patient[] = [
  {
    id: 1,
    name: "Alice Green",
    gender: "female",
    phoneNumber: "6666666666",
    address: "2500 University Drive NW, Calgary, Alberta",
    email: "123@ucalgary.ca",
    dob: new Date(),
    insurance: "111111111",
    createdAt: new Date(),
    notes: "This is a new patient",
  },
  {
    id: 2,
    name: "Alice Green",
    gender: "female",
    phoneNumber: "6666666666",
    address: "2500 University Drive NW, Calgary, Alberta",
    email: "123@ucalgary.ca",
    dob: new Date(),
    insurance: "111111111",
    createdAt: new Date(),
    notes: "This is a new patient",
  },
];

//types
export type Patient = {
  id: number | string;
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
  updatePatient: (patient: Patient) => void;
};

type Props = {
  children: ReactNode;
};

// context
export const PatientsContext = createContext<PatientsContext>({
  patients: [],
  selectedPatient: null,
  setSelectedPatient: () => {},
  editPatient: false,
  setEditPatient: () => {},
  createPatient: () => {},
  updatePatient: () => {},
});

// context provider
export const PatientsProvider = ({ children }: Props) => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState(false);
  const createPatient = (patient: Patient) => {
    console.log("createPatient", patient);
    const filteredPatients = patients.filter(
      (patientObj: any) => patientObj.name !== patient.name
    );
    setPatients([...filteredPatients, patient]);
    console.log("new patients", patients);
  };

  const updatePatient = (patient: Patient) => {
    const updatedPatients = patients.filter((p) => p.id != patient.id);
    setPatients([patient, ...updatedPatients]);
  };

  return (
    <PatientsContext.Provider
      value={{
        patients,
        selectedPatient,
        setSelectedPatient,
        editPatient,
        setEditPatient,
        createPatient,
        updatePatient,
      }}
    >
      {children}
    </PatientsContext.Provider>
  );
};
