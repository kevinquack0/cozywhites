import React, { useContext } from "react";
import AppointmentCalendar from "./AppointmentCalendar";
import { StaffContext } from "../contexts/staffContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { PatientsContext } from "../contexts/patientsContext";

const CalendarContainer = () => {
  const { selectedStaff, setSelectedStaff } = useContext(StaffContext);
  const { setSelectedPatient } = useContext(PatientsContext);
  const handleBack = () => {
    setSelectedStaff(null);
    setSelectedPatient(null);
  };

  return (
    <div className={"w-full h-screen"}>
      <div className={"flex justify-between items-center"}>
        <button
          onClick={() => {
            handleBack();
          }}
          className={
            "bg-primary text-white px-2.5 py-2.5 rounded-2xl font-semibold text-2xl hover:scale-110 transition-all duration-200 ease-in"
          }
        >
          <FontAwesomeIcon icon={faArrowLeft} className={"me-2"} />
          Back
        </button>
        <h6
          className={
            "text-4xl font-bold pb-0 text-primary underline underline-offset-3"
          }
        >
          {selectedStaff?.name}'s Schedule
        </h6>
        <div></div>
      </div>

      <AppointmentCalendar />
    </div>
  );
};

export default CalendarContainer;
