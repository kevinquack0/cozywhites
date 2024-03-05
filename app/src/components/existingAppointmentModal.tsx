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
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { toast } from "react-toastify";

const ExistingAppointmentModal = () => {
  const { patients } = useContext(PatientsContext);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] =
    React.useState(false);
  const {
    setSelectedAppointment,
    selectedAppointment,
    deleteAppointment,
    editAppointment,
    openExistingAppointmentModal,
    setOpenExistingAppointmentModal,
  } = useContext(AppointmentsContext);
  const [client, setClient] = React.useState<Patient | null>(null);

  const formik = useFormik({
    initialValues: {
      start: selectedAppointment?.start || new Date(),
      end: selectedAppointment?.end || new Date(),
    },
    validationSchema: Yup.object({
      start: Yup.date().required("Required"),
      end: Yup.date().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      if (selectedAppointment) {
        const updatedAppointment: Appointment = {
          ...selectedAppointment,
          start: values.start,
          end: values.end,
        };
        editAppointment(selectedAppointment.id, updatedAppointment);
        // setSelectedAppointment(null);
        toast.success("Appointment updated successfully");
        setOpenExistingAppointmentModal(false);
        setSelectedAppointment(null);
      }
    },
  });
  const { values, handleChange, handleSubmit, setFieldValue } = formik;

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
        <ModalHeader>
          Appointment:{" "}
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
        </ModalHeader>
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <div>
              <div className={"flex items-center gap-4"}>
                <label className={"text-xl font-semibold"}>Start: </label>
                <DateTimePicker
                  value={values.start}
                  onChange={(value) => {
                    setFieldValue("start", value);
                  }}
                />
              </div>
              <div className={"flex items-center gap-4 mt-4"}>
                <label className={"text-xl font-semibold"}>End: </label>
                <DateTimePicker
                  value={values.end}
                  onChange={(value) => {
                    setFieldValue("end", value);
                  }}
                />
              </div>
              {/*<h3>*/}

              {/*</h3>*/}
              <h3>Staff: {selectedAppointment?.staff}</h3>
              <h3>Type: {selectedAppointment?.type}</h3>
              <hr />
              <h3>Patient: {client?.name}</h3>
              <h3>Phone: {client?.phoneNumber}</h3>
              <h3>Email: {client?.email}</h3>
            </div>
            <div className={"mt-4 flex justify-end gap-3"}>
              <Button
                content="Cancel Appointment"
                labelPosition="right"
                icon="cancel"
                onClick={() => {
                  setOpenDeleteConfirmModal(true);
                }}
                negative
              />
              <Button
                content="Save"
                labelPosition="right"
                icon="save"
                onClick={() => {}}
                positive
              />
            </div>
          </form>
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
