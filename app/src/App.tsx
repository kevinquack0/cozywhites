import React, { useContext } from "react";
import Sidebar from "./components/sidebar/sidebar";
import AppointmentsCard from "./components/AppointmentsCard";
import PatientInfoModal from "./components/PatientInfoModal";
import TopNav from "./components/topNav";
import { StaffContext } from "./contexts/staffContext";
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
