import React, { useState } from "react";
import "../styles/AppointmentsCard.scss";
import { Button } from "semantic-ui-react";
import { boolean } from "yup";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./sidebar/searchBar";

const appointmentsData = [
  {
    id: 1,
    patientName: "John Doe",
    doctorName: "Dr. Smith",
    time: "10:00 AM",
    checkIn: false,
  },
  {
    id: 2,
    patientName: "Jane Doe",
    doctorName: "Dr. Johnson",
    time: "11:00 AM",
    checkIn: false,
  },
  {
    id: 3,
    patientName: "Bob Builder",
    doctorName: "Dr. Brown",
    time: "12:00 PM",
    checkIn: false,
  },
  {
    id: 4,
    patientName: "Sam Jam",
    doctorName: "Dr. Johnson",
    time: "12:00 PM",
    checkIn: false,
  },
  {
    id: 5,
    patientName: "Jack Dan",
    doctorName: "Dr. Smith",
    time: "12:00 PM",
    checkIn: false,
  },
  {
    id: 6,
    patientName: "Man Manson",
    doctorName: "Dr. Johnson",
    time: "1:00 PM",
    checkIn: false,
  },
  {
    id: 7,
    patientName: "Mary Mars",
    doctorName: "Dr. Johnson",
    time: "2:00 PM",
    checkIn: false,
  },
];
export default function AppointmentsCard() {
  const [appointments, setAppointments] = useState(appointmentsData);
  const [searchTerm, setSearchTerm] = useState("");

  let filtered = appointments;
    if (searchTerm !== "") {
        filtered = appointments.filter((a) => {
        return a.patientName.toLowerCase().includes(searchTerm.toLowerCase())|| a.doctorName.toLowerCase().includes(searchTerm.toLowerCase())|| a.time.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }

  const handleCheckIn = (appointment: any, checked: boolean) => {
    const updatedAppointments = appointments.map((app) => {
      if (app.id === appointment.id) {
        return { ...app, checkIn: checked };
      }
      return app;
    });
    setAppointments(updatedAppointments);
  };

  return (
    <div>
      <div className="appointmentsCardHeader">
        <h1 className={"text-primary"}>
          <FontAwesomeIcon icon={faCalendarCheck} className={"me-3"}/>Appointments for Today
        </h1>
      </div>
      <div className={"flex justify-center mb-7"}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} short={true} />
      </div>
      <div className="appointmentsCardWrapper">
        <div className="cardHeader">
          <h3>Patient Name</h3>
          <h3>Doctor Name</h3>
          <h3>Time</h3>
          <h3>Action</h3>
        </div>
        <div className="cardBody">
          {filtered.length > 0 ? (
          filtered.map((appointment, index) => {
            return (
              <div className="appointmentCard" key={index}>
                <p>{appointment.patientName}</p>
                <p>{appointment.doctorName}</p>
                <p>{appointment.time}</p>
                <div className="flex items-center gap-10">
                  {/*<Button primary>Check In</Button>*/}
                  <div className={"flex items-center"}>
                    <label className="inline-flex cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        checked={appointment.checkIn}
                        className="sr-only peer"
                        onChange={(event) =>
                          handleCheckIn(appointment, event.target.checked)
                        }
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                        Checked In
                      </span>
                    </label>
                  </div>
                  <Button color="green" className={""}>
                    Follow-up
                  </Button>
                </div>
              </div>
            );
          })): (
            <div className={"mt-3 text-center font-semibold text-2xl"}>No result found</div>
          )}
        </div>
      </div>
    </div>
  );
}
