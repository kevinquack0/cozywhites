import React, { useContext, useState } from "react";
import { PatientsContext } from "../../contexts/patientsContext";
import SearchBar from "./searchBar";
import { AppointmentsContext } from "../../contexts/appointmentsContext";

const AppointmentsTab = () => {
  const {
    appointments,
    setSelectedAppointment,
    setOpenExistingAppointmentModal,
  } = useContext(AppointmentsContext);
  const { patients } = useContext(PatientsContext);
  const [searchTerm, setSearchTerm] = useState("");

  let filteredAppointments = appointments;
  if (searchTerm !== "") {
    filteredAppointments = appointments.filter((a) => {
      return (
        a.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.staff.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }

  return (
    <div className="tabContainer flex flex-col items-center py-5 w-full">
      <p className={"text-gray-600"}>
        Instructions: select an appointment to edit/cancel it.
      </p>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredAppointments.length > 0 ? (
        <div className={"flex flex-col items-center gap-10 w-9/12 mt-5"}>
          {filteredAppointments.map((appointment, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-center py-4 px-5 shadow-xl rounded bg-tertiary hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setOpenExistingAppointmentModal(true);
                }}
              >
                <div className="header text-center">
                  <p className={"text-xl font-semibold"}>
                    {appointment.start.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                    -
                    {appointment.end.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                  </p>
                </div>
                <div className="mt-2">
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
      ) : (
        <div className={"mt-3"}>No result found</div>
      )}
    </div>
  );
};

export default AppointmentsTab;
