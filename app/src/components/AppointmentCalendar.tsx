import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer, SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/AppointmentCalendar.scss";
import AppointmentModal from "./AppointmentModal";
import { PatientsContext } from "../contexts/patientsContext";
import { AppointmentsContext } from "../contexts/appointmentsContext";
import {StaffContext} from "../contexts/staffContext";
const localizer = momentLocalizer(moment);

export default function AppointmentCalendar() {
  const [open, setOpen] = useState(false);

  const [slotInfo, setSlotInfo] = useState<SlotInfo>();
  const [events, setEvents]: any = useState([]);
  const [selectedEvent, setSelectedEvent]: any = useState(null);
  const { patients, createPatient, selectedPatient, setSelectedPatient } =
    useContext(PatientsContext);
  const {
    appointments,
    addAppointment,
    editAppointment,
    deleteAppointment,
    selectedAppointment,
    setSelectedAppointment,
    openExistingAppointmentModal,
    setOpenExistingAppointmentModal,
  } = useContext(AppointmentsContext);
  const {selectedStaff} = useContext(StaffContext)

  const filteredByStaff = appointments.filter(
    (a) => a.staffId == selectedStaff?.id
  );

  // const events = [
  //     {
  //         start: moment().toDate(),
  //         end: moment().add(1, 'hour').toDate(),
  //         title: "Sample Appointment",
  //     },
  // ];

  // const handleAddEvent = (appointmentData: any) => {
  //   const {
  //     start,
  //     end,
  //     title,
  //     type,
  //     client,
  //     staff,
  //     notes,
  //     email,
  //     phoneNumber,
  //     id,
  //   } = appointmentData;
  //   const filteredEvents = events.filter((event: any) => event.id !== id);
  //   createPatient({
  //     id: crypto.randomUUID(),
  //     name: client,
  //     gender: "",
  //     phoneNumber: phoneNumber,
  //     address: "123 Main St",
  //     email: email,
  //     dob: new Date("1990-01-01"),
  //     insurance: "",
  //     createdAt: new Date(),
  //     notes: "",
  //   });
  //   setEvents([
  //     ...filteredEvents,
  //     {
  //       start,
  //       end,
  //       title,
  //       type,
  //       client,
  //       staff,
  //       notes,
  //       email,
  //       phoneNumber,
  //       id,
  //     },
  //   ]);
  //   addAppointment({
  //     id,
  //     start,
  //     end,
  //     title,
  //     type,
  //     client,
  //     staff,
  //   });
  // };

  const handleSelectSlot = (slotInfo: SlotInfo) => {
    setSlotInfo(slotInfo);
    setOpen(true);
  };
  const handleSelectEvent = (event: any) => {
    console.log("event", event);
    setOpenExistingAppointmentModal(true);
    setSelectedAppointment(appointments.filter((a) => a.id === event.id)[0]);
    // Here you can handle the event click, for example open a modal with the event data
  };

  const minTime = new Date();
  minTime.setHours(8, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0);

  const handleCancelEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((event: any) => event.id !== selectedEvent.id));
      setSelectedEvent(null); // Clear the selected event
    }
  };

  // set the properties of each calendar timeslot
  // based on some conditions
  const slotPropGetter = (date: Date) => {
    const noon = new Date();
    noon.setHours(12,0,0,0);
    
    const isNoon = date.getHours() === noon.getHours();
    const isWeekend = date.getDay() % 6 === 0;
    const isDisabled = isNoon || isWeekend;
    if (isDisabled) {
      return {
        className: "disabled-slot"
      }
    }
    return {className: ""}
  }

  return (
    <div className={"w-full"}>
      <AppointmentModal open={open} setOpen={setOpen} slotInfo={slotInfo} />
      <div className="calendarWrapper">
        <Calendar
          localizer={localizer}
          events={filteredByStaff}
          startAccessor="start"
          endAccessor="end"
          step={60}
          defaultView="week"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          min={minTime}
          max={maxTime}
          style={{ height: 600 }}
          slotPropGetter={slotPropGetter}
          timeslots={1}
        />
      </div>
    </div>
  );
}
