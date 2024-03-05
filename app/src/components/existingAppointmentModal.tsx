import React, { useContext, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Appointment,
  AppointmentsContext,
} from "../contexts/appointmentsContext";
import { Patient, PatientsContext } from "../contexts/patientsContext";
import { Button, Modal, ModalContent, ModalHeader } from "semantic-ui-react";
import ConfirmCancelModal from "./confirmCancelModal";

const ExistingAppointmentModal = () => {
  const { patients } = useContext(PatientsContext);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    React.useState(false);
  const {
    setSelectedAppointment,
    selectedAppointment,
    deleteAppointment,
    openExistingAppointmentModal,
    setOpenExistingAppointmentModal,
  } = useContext(AppointmentsContext);
  const [client, setClient] = React.useState<Patient | null>(null);

  useEffect(() => {
    if (selectedAppointment) {
      setClient(
        patients.filter((p) => p.id === selectedAppointment.clientId)[0]
      );
    }
  }, [selectedAppointment]);
  const handleClose = () => {
    setOpenExistingAppointmentModal(false);
  };
  return (
    <div>
      <Modal
        onClose={handleClose}
        closeIcon
        onOpen={() => setOpenExistingAppointmentModal(true)}
        open={openExistingAppointmentModal}
      >
        <ModalHeader>Appointment</ModalHeader>
        <ModalContent>
          <div>
            <h3>
              Timeslot:{" "}
              {selectedAppointment &&
                selectedAppointment.start.toLocaleDateString("en-US", {
                  month: "long", // "long" for full month name.
                  day: "numeric", // "numeric" for the day of the month.
                })}
              ,{" "}
              {selectedAppointment?.start.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              -
              {selectedAppointment?.end.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}{" "}
            </h3>
            <h3>Staff: {selectedAppointment?.staff}</h3>
            <h3>Type: {selectedAppointment?.type}</h3>
            <hr />
            <h3>Patient: {client?.name}</h3>
            <h3>Phone: {client?.phoneNumber}</h3>
            <h3>Email: {client?.email}</h3>
          </div>
          <div className={"mt-4 flex justify-end"}>
            <Button
              content="Cancel Appointment"
              labelPosition="right"
              icon="cancel"
              onClick={() => {
                setOpenDeleteConfirmModal(true);
              }}
              negative
            />
          </div>
        </ModalContent>
      </Modal>
      <ConfirmCancelModal
        open={openDeleteConfirmModal}
        setOpen={setOpenDeleteConfirmModal}
      />
    </div>
  );
};

export default ExistingAppointmentModal;
