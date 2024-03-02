import React, { createContext, ReactNode, useState } from 'react';


export type Appointment = {
    id: string | number;
    start: Date;
    end: Date;
    title: string;
    type: string;
    client: string;
    staff: string;
};

type AppointmentsContextType = {
    appointments: Appointment[];
    addAppointment: (appointment: Appointment) => void;
    editAppointment: (appointmentId: string | number, updatedAppointment: Appointment) => void;
    deleteAppointment: (appointmentId: string | number) => void;
};

type Props = {
    children: ReactNode;
};

const initialAppointments: Appointment[] = [];

// Creating the context
export const AppointmentsContext = createContext<AppointmentsContextType>({
    appointments: initialAppointments,
    addAppointment: () => { },
    editAppointment: () => { },
    deleteAppointment: () => { },
});

// Provider component
export const AppointmentsProvider = ({ children }: Props) => {
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

    // Function to add a new appointment
    const addAppointment = (appointment: Appointment) => {
        setAppointments([...appointments, appointment]);
    };

    // Function to edit an existing appointment
    const editAppointment = (appointmentId: string | number, updatedAppointment: Appointment) => {
        setAppointments(appointments.map(appointment => appointment.id === appointmentId ? updatedAppointment : appointment));
    };

    // Function to delete an appointment
    const deleteAppointment = (appointmentId: string | number) => {
        setAppointments(appointments.filter(appointment => appointment.id !== appointmentId));
    };

    return (
        <AppointmentsContext.Provider value={{ appointments, addAppointment, editAppointment, deleteAppointment }}>
            {children}
        </AppointmentsContext.Provider>
    );
};
