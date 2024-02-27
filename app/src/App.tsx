import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/home.scss";
import { TabPane } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import AppointmentsCard from "./components/AppointmentsCard";
import AppointmentCalendar from "./components/AppointmentCalendar";
import PatientInfoModal from "./components/PatientInfoModal";

function App() {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 5000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);
  const onCardClick = useCallback(
    (data: any) => {
      console.log("data", data);
      if (data.avatar) {
        if (selectedStaff === data.name) {
          setSelectedStaff("");
        } else {
          setSelectedStaff(data.name);
        }
      }
    },
    [selectedStaff, setSelectedStaff]
  );

  return (
    <div className="homeWrapper">
      <Sidebar onCardClick={onCardClick} />

      <div className="mainContainer">
        <div className="topContainer">
          <h1>Home</h1>
          <div
            style={{
              fontSize: "50px",
              fontWeight: "bold",
              paddingRight: "50px",
            }}
          >
            {time.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </div>
        </div>

        <div className="bottomContainer">
          {!selectedStaff && <AppointmentsCard />}
          {selectedStaff && <AppointmentCalendar />}
        </div>
      </div>
      <PatientInfoModal />
    </div>
  );
}

export default App;
