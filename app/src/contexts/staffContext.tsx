import dent from "../components/dent.png";
import hyg from "../components/hyg.png";
import { Patient, PatientsContext } from "./patientsContext";
import { createContext, ReactNode, useEffect, useState } from "react";

export const staffData = [
  { name: "Dr.Smith", type: "Dentist", avatar: dent },
  { name: "John grey", type: "Hygienist", avatar: hyg },
];

type Staff = {
  name: string;
  type: string;
  avatar: string;
};

type StaffContext = {
  staff: Staff[];
  selectedStaff: Staff | null;
  setSelectedStaff: (staff: Staff | null) => void;
};

export const StaffContext = createContext<StaffContext>({
  staff: [],
  selectedStaff: null,
  setSelectedStaff: () => {},
});

export const StaffProvider = ({ children }: { children: ReactNode }) => {
  const [staff, setStaff] = useState<Staff[]>(staffData);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  return (
    <StaffContext.Provider
      value={{
        staff,
        selectedStaff,
        setSelectedStaff,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
};
