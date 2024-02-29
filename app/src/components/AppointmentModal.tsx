import React, { useEffect, useState } from 'react'
import '../styles/AppointmentModal.scss';
import { Button, Checkbox, Dropdown, Input, Modal, ModalActions, ModalContent, ModalHeader, TextArea } from 'semantic-ui-react';

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

export default function AppointmentModal({ open, setOpen, slotInfo }: any) {
    const [existingClient, setExistingClient] = useState(false)


    return (
        <Modal
            onClose={() => {
                setExistingClient(false)
                setOpen(false)
            }}
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
                    />
                </div>
                <div className='inputPair'>

                    <p> Staff:</p>
                    <Dropdown
                        placeholder='Select a staff member'
                        fluid
                        selection
                        options={staffOptions}
                    />
                </div>

                <hr className='line' />

                <Checkbox label='Existing Client' onClick={() => { setExistingClient(!existingClient) }} />
                {existingClient &&

                    <div className='inputPair'>

                        <p style={{ fontSize: '16px', whiteSpace: 'nowrap' }}> Existing Client:</p>
                        <Dropdown
                            placeholder='Select Country'
                            fluid
                            search
                            selection
                            options={clientOptions}
                        />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>

                        <p> Email:</p>
                        <Input placeholder='Email' />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>

                        <p> Name:</p>
                        <Input placeholder='Name' />
                    </div>
                }
                {!existingClient &&
                    <div className='inputPair'>

                        <p> Phone:</p>
                        <Input placeholder='Phone' />
                    </div>
                }
                <div className='textAreainputPair'>

                    <p> Notes:</p>
                    <TextArea placeholder='Appointment notes' className='areaText' />
                </div>
            </ModalContent>
            <ModalActions>
                <Button color='red' onClick={() => {
                    setExistingClient(false)
                    setOpen(false)
                }}>
                    Close
                </Button>
                <Button
                    content="Save"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
            </ModalActions>
        </Modal>
    )
}
