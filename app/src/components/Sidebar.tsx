import React, { useContext, useState } from "react";
import "../styles/sidebar.scss";
import { Tab, TabPane } from "semantic-ui-react";
import { PatientsContext } from "../contexts/patientsContext";

export default function Sidebar({ onCardClick }: any) {
  const { patients, setSelectedPatient } = useContext(PatientsContext);
  const [selected, setSelected] = useState("");
  const staff = [
    { name: "Dr.Smith", type: "Dentist", avatar: "/assets/dent.png" },
    { name: "John grey", type: "Hygienist", avatar: "/assets/hyg.png" },
  ];

  // const patients = [
  //     { name: 'John Doe', email: 'john.doe@example.com', phoneNumber: '123-456-7890' },
  //     { name: 'Jane Doe', email: 'jane.doe@example.com', phoneNumber: '098-765-4321' },
  //
  // ];

  const appointments = [
    {
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      patientName: "John Doe",
      staffName: "Dr. Smith",
    },
    {
      startTime: "11:00 AM",
      endTime: "12:00 PM",
      patientName: "Jane Doe",
      staffName: "John grey",
    },
  ];

  const panes = [
    {
      menuItem: "Staff",
      render: () => {
        return (
          <div className="tabContainer">
            {staff.map((staff, index) => {
              return (
                <div
                  key={index}
                  className="cardContainer"
                  onClick={() => {
                    if (selected === staff.name) {
                      setSelected("");
                    } else {
                      setSelected(staff.name);
                    }

                    onCardClick(staff);
                  }}
                  style={
                    selected === staff.name ? { border: "3px solid blue" } : {}
                  }
                >
                  <div className="header">
                    <h1> {staff.name} </h1>
                  </div>
                  <div className="body">
                    <img src={staff.avatar} alt="staff" width={80} />
                    <h4 style={{ margin: "0px" }}>{staff.type}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        );
      },
    },
    {
      menuItem: "Patients",
      render: () => {
        return (
          <div className="tabContainer">
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
                      {appointment.startTime}-{appointment.endTime}{" "}
                    </h1>
                  </div>
                  <div className="body">
                    <p>
                      <strong>Patient:</strong> {appointment.patientName}
                    </p>
                    <p>
                      <strong>Staff:</strong> {appointment.staffName}
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
        />
      </div>
    </div>
  );
}
