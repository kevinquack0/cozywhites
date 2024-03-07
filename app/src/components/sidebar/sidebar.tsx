import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
  faHospitalUser,
  faPlus,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";
import StaffTab from "./staffTab";
import PatientsTab from "./patientsTab";
import AppointmentsTab from "./appointmentsTab";

export default function Sidebar() {
  const [selectedTab, setSelectedTab] = useState("staff");

  const handleTabClicked = (tab: "staff" | "patients" | "appointments") => {
    setSelectedTab(tab);
  };

  return (
    <div className="w-[32rem] max-h-screen flex flex-col py-4 px-4 overflow-y-auto border-r-2">
      <div
        id="sidebar-title"
        className="text-3xl font-extrabold text-gray-600 flex items-center justify-center gap-3 mt-3 mb-5"
      >
        <FontAwesomeIcon icon={faTooth} />
        Cozy White
      </div>
      <hr />
      <div className="sideBar">
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <ul className="flex">
            <li className="me-2">
              <div
                className={`${
                  selectedTab === "staff"
                    ? "border-primary text-primary"
                    : "border-transparent"
                } inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary cursor-pointer`}
                onClick={() => {
                  handleTabClicked("staff");
                }}
              >
                <FontAwesomeIcon icon={faPlus} className={"me-2"} />
                New Appointment
              </div>
            </li>
            <li className="me-2 flex items-center">
              <div
                className={`${
                  selectedTab === "patients"
                    ? "border-primary text-primary"
                    : "border-transparent"
                } inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary cursor-pointer`}
                onClick={() => {
                  handleTabClicked("patients");
                }}
              >
                <FontAwesomeIcon icon={faHospitalUser} className={"me-2"} />
                Patients
              </div>
            </li>
            <li className="me-2">
              <div
                className={`${
                  selectedTab === "appointments"
                    ? "border-primary text-primary"
                    : "border-transparent"
                } inline-block p-4 border-b-2 rounded-t-lg hover:text-primary hover:border-primary cursor-pointer`}
                onClick={() => {
                  handleTabClicked("appointments");
                }}
              >
                <FontAwesomeIcon icon={faFile} className={"me-2"} />
                Existing Appointments
              </div>
            </li>
          </ul>
        </div>
        {selectedTab === "staff" && <StaffTab />}
        {selectedTab === "patients" && <PatientsTab />}
        {selectedTab === "appointments" && <AppointmentsTab />}
      </div>
    </div>
  );
}
