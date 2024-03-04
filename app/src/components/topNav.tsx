import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faTooth } from "@fortawesome/free-solid-svg-icons";
import { PatientsContext } from "../contexts/patientsContext";
import { AppointmentsContext } from "../contexts/appointmentsContext";
import { StaffContext } from "../contexts/staffContext";

const TopNav = () => {
  const [time, setTime] = useState(new Date());
  const { setSelectedPatient } = useContext(PatientsContext);
  const { setSelectedStaff } = useContext(StaffContext);

  let format: any = { month: "long", day: "numeric" };

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 5000);

    return function cleanup() {
      clearInterval(timer);
    };
  }, []);

  const handleReset = () => {
    setSelectedStaff(null);
    setSelectedPatient(null);
  };

  return (
    <div className="flex justify-between items-center py-5 px-5 shadow-lg">
      <button
        onClick={() => {
          handleReset();
        }}
        className={
          "bg-primary text-white px-2 py-3 rounded-2xl font-semibold text-2xl hover:scale-110 transition-all duration-200 ease-in"
        }
      >
        <FontAwesomeIcon icon={faHouse} className={"me-3"} />
        Home
      </button>
      <div className="text-3xl font-semibold text-primary">
        <span style={{ paddingRight: "20px" }}>
          {time.toLocaleDateString(undefined, format)}
        </span>
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default TopNav;
