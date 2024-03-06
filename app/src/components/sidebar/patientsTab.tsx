import React, { useContext, useState } from "react";
import SearchBar from "./searchBar";
import { PatientsContext } from "../../contexts/patientsContext";

const PatientsTab = () => {
  const { patients, setSelectedPatient } = useContext(PatientsContext);
  const [searchTerm, setSearchTerm] = useState("");

  let filteredPatients = patients;
  if (searchTerm !== "") {
    filteredPatients = patients.filter((p) => {
      return p.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="tabContainer flex flex-col items-center py-5 w-full">
      <p className={"text-gray-600"}>
        Instructions: select a patient to check his/her info.
      </p>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {patients.length > 0 ? (
        <div className={"flex flex-col items-center gap-10 w-9/12 mt-5"}>
          {filteredPatients.map((patient, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-center py-7 shadow-xl rounded bg-tertiary hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedPatient(patient);
                }}
              >
                <h1> {patient.name} </h1>
                <p>
                  <strong>Phone Number:</strong> {patient.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {patient.email ? patient.email : "No data"}
                </p>
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

export default PatientsTab;
