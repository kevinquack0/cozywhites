import React, { createContext, ReactNode, useState } from "react";

export type Appointment = {
  id: string | number;
  start: Date;
  end: Date;
  title: string;
  type: string;
  client: string;
  staff: string;
  staffId?: string | number;
  clientId?: string | number;
  checkIn: boolean;
};

type AppointmentsContextType = {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  editAppointment: (
    appointmentId: string | number,
    updatedAppointment: Appointment
  ) => void;
  deleteAppointment: (appointmentId: string | number) => void;
  selectedAppointment: Appointment | null;
  setSelectedAppointment: (appointment: Appointment | null) => void;
  openExistingAppointmentModal: boolean;
  setOpenExistingAppointmentModal: (open: boolean) => void;
};

type Props = {
  children: ReactNode;
};

const initialAppointments: Appointment[] = [
  {
    id: "1",
    start: new Date("2024-03-06T16:00:00"),
    end: new Date("2024-03-06T17:00:00"),
    title: "Checkup with Alice Green",
    type: "Dentist",
    client: "Alice Green",
    staff: "Dr.Smith",
    clientId: 1,
    staffId: 1,
    checkIn: false,
  },
  {
    id: "2",
    start: new Date("2024-03-06T10:00:00"),
    end: new Date("2024-03-06T11:00:00"),
    title: "Cleaning with James Brown",
    type: "Dentist",
    client: "James Brown",
    staff: "Dr.Smith",
    clientId: 2,
    staffId: 1,
    checkIn: false,
  },
];

// Creating the context
export const AppointmentsContext = createContext<AppointmentsContextType>({
  appointments: initialAppointments,
  addAppointment: () => {},
  editAppointment: () => {},
  deleteAppointment: () => {},
  selectedAppointment: null,
  setSelectedAppointment: () => {},
  openExistingAppointmentModal: false,
  setOpenExistingAppointmentModal: () => {},
});

// Provider component
export const AppointmentsProvider = ({ children }: Props) => {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [openExisting, setOpenExisting] = useState(false);

  // Function to add a new appointment
  const addAppointment = (appointment: Appointment) => {
    setAppointments([...appointments, appointment]);
  };

  // Function to edit an existing appointment
  const editAppointment = (
    appointmentId: string | number,
    updatedAppointment: Appointment
  ) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === appointmentId ? updatedAppointment : appointment
      )
    );
  };

  // Function to delete an appointment
  const deleteAppointment = (appointmentId: string | number) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== appointmentId)
    );
  };

  const checkIn = (appointmentId: string | number) => {

  }

  return (
    <AppointmentsContext.Provider
      value={{
        appointments,
        addAppointment,
        editAppointment,
        deleteAppointment,
        selectedAppointment,
        setSelectedAppointment,
        openExistingAppointmentModal: openExisting,
        setOpenExistingAppointmentModal: setOpenExisting,
      }}
    >
      {children}
    </AppointmentsContext.Provider>
  );
};
