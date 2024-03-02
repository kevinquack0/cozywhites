import { createContext, ReactNode, useState } from "react";

// patient data
let patients: Patient[] = [
  {
    name: "John Doe",
    gender: "male",
    address: "2500 University Dr NW, Calgary, AB T2N 1N4",
    email: "john.doe@example.com",
    phoneNumber: "666-6666-6666",
    insurance: "12000-3000",
    notes: "This is a new patient",
    dob: new Date(),
    createdAt: new Date(),
  },
  {
    name: "Jane Doe",
    gender: "female",
    address: "2500 University Dr NW, Calgary, AB T2N 1N4",
    email: "jane.doe@example.com",
    phoneNumber: "098-765-4321",
    insurance: "12000-3000",
    notes: "",
    dob: new Date(),
    createdAt: new Date(),
  },
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
  patients: patients,
  selectedPatient: null,
  setSelectedPatient: () => { },
  editPatient: false,
  setEditPatient: () => { },
  createPatient: () => { },
});

// context provider
export const PatientsProvider = ({ children }: Props) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editPatient, setEditPatient] = useState(false);
  const createPatient = (patient: Patient) => {
    patients = [...patients, patient];
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
