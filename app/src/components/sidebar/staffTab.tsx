import React, { useContext, useState } from "react";
import { StaffContext } from "../../contexts/staffContext";
import SearchBar from "./searchBar";

const StaffTab = () => {
  const { staff, selectedStaff, setSelectedStaff } = useContext(StaffContext);
  const [searchTerm, setSearchTerm] = useState("");

  let filteredStaff = staff;
  if (searchTerm !== "") {
    filteredStaff = staff.filter((s) => {
      return s.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }

  return (
    <div className="tabContainer flex flex-col items-center py-5 w-full">
      <p className={"text-gray-600"}>
        Instructions: select a staff below to create a new patient appointment.
      </p>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {filteredStaff.length > 0 ? (
        <div className={"flex flex-col items-center gap-10 w-8/12 mt-5"}>
          {filteredStaff.map((staff, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col justify-center items-center py-2 shadow-xl rounded bg-tertiary hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedStaff(staff);
                }}
              >
                <div
                  className={"text-2xl text-gray-600 font-extrabold pb-0 mb-3"}
                >
                  {staff.name}
                </div>
                <img src={staff.avatar} alt="staff" width={70} />
                <p className={"text-xl text-gray-600 mt-2"}>{staff.type}</p>
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

export default StaffTab;
