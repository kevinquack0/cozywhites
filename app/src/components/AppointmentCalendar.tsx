import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/AppointmentCalendar.scss';
import AppointmentModal from './AppointmentModal';
const localizer = momentLocalizer(moment);

export default function AppointmentCalendar() {
    const [open, setOpen] = useState(false)
    const [slotInfo, setSlotInfo] = useState()
    const [events, setEvents]: any = useState([])
    // const events = [
    //     {
    //         start: moment().toDate(),
    //         end: moment().add(1, 'hour').toDate(),
    //         title: "Sample Appointment",
    //     },
    // ];
    const handleAddEvent = (appointmentData: any) => {
        setEvents([...events, {
            start: appointmentData.start,
            end: appointmentData.end,
            title: appointmentData.title,
        }]);
    };

    const handleSelectSlot = (slotInfo: any) => {
        setSlotInfo(slotInfo)
        setOpen(true)

    };
    const minTime = new Date();
    minTime.setHours(8, 0, 0);

    const maxTime = new Date();
    maxTime.setHours(17, 0, 0);

    return (
        <>
            <AppointmentModal onSubmit={handleAddEvent} open={open} setOpen={setOpen} slotInfo={slotInfo} />

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
                    min={minTime}
                    max={maxTime}
                />
            </div>
        </>
    );
}
