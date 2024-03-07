import React, { useContext } from "react";
import { Modal } from "semantic-ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { AppointmentsContext } from "../contexts/appointmentsContext";
import { toast } from "react-toastify";

const ConfirmCancelModal = ({ open, setOpen }: any) => {
  const {
    selectedAppointment,
    deleteAppointment,
    setOpenExistingAppointmentModal,
  } = useContext(AppointmentsContext);
  return (
    <Modal
      onClose={() => setOpen(false)}
      open={open}
      size="tiny"
      className="existing-appointment-modal"
    >
      <section className="bg-white px-4 pb-4 pt-4 sm:p-6 sm:pb-4 text-center">
        {/*Icon*/}
        <FontAwesomeIcon
          className={"text-rose-500"}
          icon={faTriangleExclamation}
          size="4x"
        />
        {/*Text content*/}
        <div className="mt-4 text-xl font-semibold">
          Are you sure to cancel the appointment for{" "}
          <span className={"text-red-600"}>{selectedAppointment?.client}</span>{" "}
          with{" "}
          <span className={"text-red-600"}>{selectedAppointment?.staff}</span>?
        </div>
      </section>

      {/*Buttons section*/}
      <section className="flex justify-center gap-4 mt-1 mb-4">
        {/*Confirm button*/}
        <button
          className="px-3 py-2 bg-rose-500 rounded text-white hover:bg-rose-300 font-semibold"
          onClick={() => {
            if (selectedAppointment) {
              deleteAppointment(selectedAppointment.id);
              setOpenExistingAppointmentModal(false);
              setOpen(false);
              toast.success("Appointment canceled successfully.");
            }
          }}
        >
          Delete Appointment
        </button>
        {/*Cancel button*/}
        <button
          className="px-3 py-2 bg-gray-500 rounded text-white hover:bg-gray-400 font-semibold"
          onClick={() => setOpen(false)}
        >
          Cancel
        </button>
      </section>
    </Modal>
  );
};

export default ConfirmCancelModal;
