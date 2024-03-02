import React, { useContext, useEffect, useState } from 'react'
import '../styles/AppointmentModal.scss';
import { Button, Checkbox, Dropdown, Input, Modal, ModalActions, ModalContent, ModalHeader, TextArea } from 'semantic-ui-react';
import _, { set } from 'lodash';
import { PatientsContext } from '../contexts/patientsContext';
import 'react-datepicker/dist/react-datepicker.css';

import DatePicker from 'react-datepicker';

const options = [
    {
        key: 'Cleaning',
        text: 'Cleaning',
        value: 'Cleaning',

    },
    {
        key: 'Checkup',
        text: 'Checkup',
        value: 'Checkup',

    },
    {
        key: 'Cavity',
        text: 'Cavity',
        value: 'Cavity',

    },
]

const staffOptions = [
    {
        key: 'Dr.Smith',
        text: 'Dr.Smith',
        value: 'Dr.Smith',

    },
    {
        key: 'John Grey',
        text: 'John Grey',
        value: 'John Grey',

    },

]
let format = { month: 'long', day: 'numeric' };

const clientOptions = [
    { key: 1, value: 'John Doe', text: 'John Doe' },
    { key: 2, value: 'Jane Doe', text: 'Jane Doe' },
];

export default function AppointmentModal({ open, setOpen, slotInfo, onSubmit, handleCancelEvent, selectedEvent, patients, setSelectedEvent }: any) {
    const [existingClient, setExistingClient] = useState(false)
    const [appointmentType, setAppointmentType] = useState('');
    const [staff, setStaff] = useState('');
    const [client, setClient] = useState('');
    const [notes, setNotes] = useState('');
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000)); // initially set to 1 hour after startDate

    useEffect(() => {
        setEndDate(new Date(startDate.getTime() + 60 * 60 * 1000)); // set to 1 hour after startDate whenever startDate changes
    }, [startDate]);

    useEffect(() => {
        if (slotInfo) {
            setStartDate(slotInfo.start)
            // setEndDate(slotInfo.end)
        }
    }, [slotInfo])


    useEffect(() => {
        if (selectedEvent) {
            setAppointmentType(selectedEvent.type)
            setStaff(selectedEvent.staff)
            setClient(selectedEvent.client)
            setNotes(selectedEvent.notes)
            setEmail(selectedEvent.email)
            setPhoneNumber(selectedEvent.phoneNumber)
            setStartDate(selectedEvent.start)
            setOpen(true)
        }
    }, [selectedEvent])



    const clearAndClose = () => {
        setExistingClient(false);
        setAppointmentType('');
        setStaff('');
        setClient('');
        setNotes('');
        setEmail('');
        setPhoneNumber('');
        setSelectedEvent(null);
        setStartDate(new Date());
        setOpen(false);

    }

    return (
        <Modal
            onClose={() => {
                setExistingClient(false)
                clearAndClose()
            }}
            closeIcon
            onOpen={() => setOpen(true)}
            open={open}
        >
            {slotInfo && <ModalHeader>Appointment: {slotInfo.start.toLocaleDateString(undefined, format)}, {slotInfo.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}-{slotInfo.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} </ModalHeader>}
            <ModalContent className='modalContent' >
                <div className='inputPair'>

                    <p> Type:</p>
                    <Dropdown
                        placeholder='Select a service'
                        fluid
                        selection
                        options={options}
                        value={appointmentType ? appointmentType : _.get(selectedEvent, "type", appointmentType)}
                        onChange={(e, data) => setAppointmentType(data.value as string)}
                    />
                </div>
                <div className='inputPair'>

                    <p> Staff:</p>
                    <Dropdown
                        placeholder='Select a staff member'
                        fluid
                        selection
                        options={staffOptions}
                        value={staff ? staff : _.get(selectedEvent, "staff", staff)}
                        onChange={(e, data) => setStaff(data.value as string)}
                    />
                </div>

                <hr className='line' />

                <Checkbox label='Existing Client' onClick={() => { setExistingClient(!existingClient) }} />
                {existingClient &&

                    <div className='inputPair'>

                        <p style={{ fontSize: '16px', whiteSpace: 'nowrap' }}> Existing Client:</p>
                        <Dropdown
                            placeholder='Select Client'
                            fluid
                            search
                            onChange={(e, data) => { console.log("data", data); setClient(data.value as string) }}
                            value={client}
                            selection
                            options={patients.map((patient: any, index: number) => ({
                                key: index,
                                text: patient.name,
                                value: patient.name,
                            }))}
                        />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>
                        <p> Email:</p>
                        <Input value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>
                        <p> Name:</p>
                        <Input value={client} placeholder='Name' onChange={(e) => setClient(e.target.value)} />
                    </div>
                }
                {selectedEvent &&
                    <div className='inputPair'>
                        <p>Date:</p>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            showTimeSelect
                            timeFormat="HH:mm"
                            className='customDatePicker'
                            timeIntervals={60}
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>
                        <p> Phone:</p>
                        <Input value={phoneNumber} placeholder='Phone' onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                }
                <div className='textAreainputPair'>

                    <p> Notes:</p>
                    <TextArea value={notes} placeholder='Appointment notes' className='areaText' onChange={(e) => { setNotes(e.target.value) }} />
                </div>
            </ModalContent>
            <ModalActions>
                {selectedEvent && <Button color='red' onClick={() => {
                    setExistingClient(false)
                    handleCancelEvent()
                    setOpen(false)
                }}>
                    Cancel Appointment
                </Button>}

                <Button
                    content="Save"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => {
                        const appointmentData = {
                            start: startDate,
                            end: endDate,
                            title: `${appointmentType} with ${client || 'New Client'}`,
                            type: appointmentType,
                            client,
                            staff,
                            notes,
                            email,
                            phoneNumber,
                            id: selectedEvent ? selectedEvent.id : Math.random().toString(36).substring(7)
                        };
                        onSubmit(appointmentData);
                        setExistingClient(false);
                        clearAndClose()

                    }}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}
