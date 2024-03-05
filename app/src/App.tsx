import React, { useCallback, useContext, useEffect, useState } from "react";
import logo from "./logo.svg";
import { Icon, TabPane } from "semantic-ui-react";
import Sidebar from "./components/sidebar/sidebar";
import AppointmentsCard from "./components/AppointmentsCard";
import AppointmentCalendar from "./components/AppointmentCalendar";
import PatientInfoModal from "./components/PatientInfoModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import TopNav from "./components/topNav";
import { StaffContext } from "./contexts/staffContext";
import { AppointmentsContext } from "./contexts/appointmentsContext";
import CalendarContainer from "./components/calendarContainer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ExistingAppointmentModal from "./components/existingAppointmentModal";

function App() {
  const { selectedStaff, setSelectedStaff } = useContext(StaffContext);

  return (
    <div className={"h-screen flex font-lexend"}>
      <Sidebar />
      <div className="w-full h-screen overflow-auto">
        <TopNav />
        <div className="px-10 py-10 flex justify-center">
          {!selectedStaff && <AppointmentsCard />}
          {selectedStaff && <CalendarContainer />}
        </div>
      </div>
      <PatientInfoModal />
      <ExistingAppointmentModal />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
