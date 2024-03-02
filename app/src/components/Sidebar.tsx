import React, { useContext, useEffect, useState } from "react";
import "../styles/sidebar.scss";
import { Icon, Search, Tab, TabPane } from "semantic-ui-react";
import { PatientsContext } from "../contexts/patientsContext";
import classNames from 'classnames';
import { AppointmentsContext } from "../contexts/appointmentsContext";
import hyg from './hyg.png';
import dent from './dent.png';
export default function Sidebar({ reset, onCardClick }: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setactiveIndex] = useState(0)
    const { patients, setSelectedPatient } = useContext(PatientsContext);
    const [selected, setSelected] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };
    const { appointments, addAppointment, editAppointment, deleteAppointment } =
        useContext(AppointmentsContext);

    console.log("patients", patients)
    useEffect(() => {
        setSearchTerm('')
        setSelected('')
        setactiveIndex(0)
    }, [reset])


    const staff = [
        { name: "Dr.Smith", type: "Dentist", avatar: dent },
        { name: "John grey", type: "Hygienist", avatar: hyg },
    ];

    // const patients = [
    //     { name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
    //     { name: 'Jane Doe', email: 'jane.doe@example.com', phoneNumber: '098-765-4321' },
    //
    // ];



    const panes = [
        {
            menuItem: 'Create Appointment',
            render: () => {

                return (
                    <div className='tabContainer'>
                        <div className="search-input-container">

                            <input
                                type="text"
                                placeholder={'Search...'}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Icon name='search' />
                        </div>
                        {staff.map((staff, index) => {

                            return (
                                <div key={index} className={classNames('cardContainer', selected === staff.name && 'cardActive')} onClick={() => {
                                    if (selected === staff.name) {
                                        setSelected('')
                                    } else {
                                        setSelected(staff.name)
                                    }

                                    onCardClick(staff)
                                }}


                                >
                                    <div className='header'>
                                        <h1> {staff.name}
                                        </h1>
                                    </div>
                                    <div className="body">
                                        <img src={staff.avatar} alt="staff" width={80} />
                                        <h4 style={{ margin: '0px' }}>{staff.type}</h4>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                )
            },
        },
        {
            menuItem: "Patients",
            render: () => {
                return (
                    <div className="tabContainer">
                        <div className="search-input-container">

                            <input
                                type="text"
                                placeholder={'Search...'}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Icon name='search' />
                        </div>
                        {patients.map((patient, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cardContainer"
                                    onClick={() => {
                                        setSelectedPatient(patient);
                                    }}
                                >
                                    <div className="header">
                                        <h1> {patient.name} </h1>
                                    </div>
                                    <div className="body">
                                        <p>
                                            <strong>Email:</strong> {patient.email}
                                        </p>
                                        <p>
                                            <strong>Phone Number:</strong> {patient.phoneNumber}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            },
        },
        {
            menuItem: "Appointments",
            render: () => {
                return (
                    <div className="tabContainer">
                        <div className="search-input-container">

                            <input
                                type="text"
                                placeholder={'Search...'}
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <Icon name='search' />
                        </div>
                        {appointments.map((appointment, index) => {
                            return (
                                <div
                                    key={index}
                                    className="cardContainer"
                                    onClick={() => onCardClick(appointment)}
                                >
                                    <div className="header">
                                        <h1>
                                            {" "}
                                            {appointment.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}-{appointment.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}{" "}
                                        </h1>
                                    </div>
                                    <div className="body">
                                        <p>
                                            <strong>Patient:</strong> {appointment.client}
                                        </p>
                                        <p>
                                            <strong>Staff:</strong> {appointment.staff}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            },
        },
    ];
    return (
        <div className="sideBarContainer">
            <div className="sideBar">
                <Tab
                    style={{ width: "100%" }}
                    menu={{ secondary: true, pointing: true }}
                    panes={panes}
                    activeIndex={activeIndex}
                    onTabChange={(e, { newactiveIndex }) => {

                        setactiveIndex(newactiveIndex)
                    }}
                />
            </div>
        </div>
    );
}
