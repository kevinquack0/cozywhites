import React, { useContext, useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/AppointmentCalendar.scss';
import AppointmentModal from './AppointmentModal';
import { PatientsContext } from '../contexts/patientsContext';
const localizer = momentLocalizer(moment);

export default function AppointmentCalendar() {
    const [open, setOpen] = useState(false)
    const [slotInfo, setSlotInfo] = useState()
    const [events, setEvents]: any = useState([])
    const [selectedEvent, setSelectedEvent]: any = useState(null)
    const { patients, createPatient, selectedPatient, setSelectedPatient } =
        useContext(PatientsContext);


    // const events = [
    //     {
    //         start: moment().toDate(),
    //         end: moment().add(1, 'hour').toDate(),
    //         title: "Sample Appointment",
    //     },
    // ];
    const handleAddEvent = (appointmentData: any) => {
        const { start, end, title, type, client, staff, notes, email, phoneNumber, id } = appointmentData;
        const filteredEvents = events.filter((event: any) => event.id !== id);

        setEvents([...filteredEvents, {
            start,
            end,
            title,
            type,
            client,
            staff,
            notes,
            email,
            phoneNumber,
            id
        }]);
    };

    const handleSelectSlot = (slotInfo: any) => {
        setSlotInfo(slotInfo)
        setOpen(true)

    };
    const handleSelectEvent = (event: any) => {
        console.log("event", event)
        setSelectedEvent(event)
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
    }
    useEffect(() => {
        console.log('events', events)
    }, [events])

    return (
        <>
            <AppointmentModal handleCancelEvent={handleCancelEvent} setSelectedEvent={setSelectedEvent} patients={patients} onSubmit={handleAddEvent} open={open} setOpen={setOpen} slotInfo={slotInfo} selectedEvent={selectedEvent} />

            <div className='calendarWrapper'>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    step={60}
                    defaultView="week"
                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectEvent}
                    min={minTime}
                    max={maxTime}
                />
            </div>
        </>
    );
}
