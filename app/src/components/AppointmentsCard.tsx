import React from 'react'
import '../styles/AppointmentsCard.scss';
import { Button } from 'semantic-ui-react';
export default function AppointmentsCard() {
    const appointments = [
        { patientName: 'John Doe', doctorName: 'Dr. Smith', time: '10:00 AM' },
        { patientName: 'Jane Doe', doctorName: 'Dr. Johnson', time: '11:00 AM' },
        { patientName: 'Bob Builder', doctorName: 'Dr. Brown', time: '12:00 PM' },
        { patientName: 'Sam Jam', doctorName: 'Dr. Johnson', time: '12:00 PM' },
        { patientName: 'Jack Dan', doctorName: 'Dr. Smith', time: '12:00 PM' },
        { patientName: 'Man Manson', doctorName: 'Dr. Johnson', time: '1:00 PM' },
        { patientName: 'Mary Mars', doctorName: 'Dr. Johnson', time: '2:00 PM' },

    ];


    return (
        <div>
            <div className='appointmentsCardHeader'>
                <h1>Appointments for Today</h1>
            </div>
            <div className='appointmentsCardWrapper'>
                <div className="cardHeader">
                    <h3>Patient Name</h3>
                    <h3>Doctor Name</h3>
                    <h3>Time</h3>
                    <h3>Action</h3>
                </div>
                <div className='cardBody'>
                    {appointments.map((appointment, index) => {

                        return (
                            <div className="appointmentCard">
                                <p>{appointment.patientName}</p>
                                <p>{appointment.doctorName}</p>
                                <p>{appointment.time}</p>
                                <div className='buttonGroup'>
                                    <Button primary>Check In</Button>
                                    <Button color='green'>Follow-up</Button>
                                </div>

                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
