import React, { useCallback, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles/home.scss";
import { Icon, TabPane } from "semantic-ui-react";
import Sidebar from "./components/Sidebar";
import AppointmentsCard from "./components/AppointmentsCard";
import AppointmentCalendar from "./components/AppointmentCalendar";
import PatientInfoModal from "./components/PatientInfoModal";

function App() {
  const [selectedStaff, setSelectedStaff] = useState("");
  const [time, setTime] = useState(new Date());
  const [reset, setReset] = useState(false)
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
    [selectedStaff, setSelectedStaff],
  )
  let format: any = { month: 'long', day: 'numeric' };
  useEffect(() => {
    setSelectedStaff('')
  }, [reset])

  return (
    <div className="homeWrapper">
      <Sidebar reset={reset} onCardClick={onCardClick} />

      <div className="mainContainer">
        <div className="topContainer">
          <h1 onClick={() => {
            setReset(!reset)

          }}>Home</h1>
          <div className='dateWrapper'>
            <span style={{ paddingRight: '20px' }}>
              {time.toLocaleDateString(undefined, format)}
            </span>
            {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
          </div>
        </div>

        <div className="bottomContainer">
          {selectedStaff && <Icon name='close' size="big" className="closeIcon" onClick={() => setReset(!reset)} />}
          {!selectedStaff && <AppointmentsCard />}
          {selectedStaff && <AppointmentCalendar />}
        </div>
      </div>
      <PatientInfoModal />
    </div>
  );
}

export default App;
