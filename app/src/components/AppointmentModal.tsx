import React, { useContext } from "react";
import {
  Button,
  Dropdown,
  Modal,
  ModalContent,
  ModalHeader,
} from "semantic-ui-react";
import { Patient, PatientsContext } from "../contexts/patientsContext";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import { StaffContext } from "../contexts/staffContext";
import * as Yup from "yup";
import {
  Appointment,
  AppointmentsContext,
} from "../contexts/appointmentsContext";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck } from "@fortawesome/free-solid-svg-icons";

const options = [
  {
    key: "Cleaning",
    text: "Cleaning",
    value: "Cleaning",
  },
  {
    key: "Checkup",
    text: "Checkup",
    value: "Checkup",
  },
  {
    key: "Filling",
    text: "Filling",
    value: "Filling",
  },
];

const staffOptions = [
  {
    key: "Dr.Smith",
    text: "Dr.Smith",
    value: "Dr.Smith",
  },
  {
    key: "John Grey",
    text: "John Grey",
    value: "John Grey",
  },
];
let format = { month: "long", day: "numeric" };

const clientOptions = [
  { key: 1, value: "John Doe", text: "John Doe" },
  { key: 2, value: "Jane Doe", text: "Jane Doe" },
];

export default function AppointmentModal({
  open,
  setOpen,
  slotInfo,
  selectedEvent,
  handleCancelEvent,
}: any) {
  const { selectedStaff } = useContext(StaffContext);
  const { patients, createPatient } = useContext(PatientsContext);
  const { addAppointment } = useContext(AppointmentsContext);

  const formik = useFormik({
    initialValues: {
      type: "",
      existing: false,
      patientId: "",
      notes: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
    validateOnChange: false,
    validateOnMount: false,
    validateOnBlur: false,
    validationSchema: Yup.object({
      type: Yup.string().required("Required"),
      patientId: Yup.string().when("existing", {
        is: true,
        then: (schema) => schema.required("Patient is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      firstName: Yup.string().when("existing", {
        is: false,
        then: (schema) => schema.required("First name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      lastName: Yup.string().when("existing", {
        is: false,
        then: (schema) => schema.required("Last name is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
      phoneNumber: Yup.string().when("existing", {
        is: false,
        then: (schema) => schema.required("Phone number is required"),
        otherwise: (schema) => schema.notRequired(),
      }),
    }),
    onSubmit: (values, formikHelpers) => {
      if (values.existing) {
        const appointment: Appointment = {
          id: crypto.randomUUID(),
          start: slotInfo.start,
          end: slotInfo.end,
          title: `${values.type} with ${
            patients.find((p) => p.id === values.patientId)?.name ||
            "" ||
            "New Client"
          }`,
          type: values.type,
          client: patients.find((p) => p.id === values.patientId)?.name || "",
          staff: selectedStaff?.name || "",
          clientId: values.patientId,
          staffId: selectedStaff?.id,
          checkIn: false,
        };
        addAppointment(appointment);
      } else {
        const patient: Patient = {
          id: crypto.randomUUID(),
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          phoneNumber: values.phoneNumber,
          createdAt: new Date(),
        };
        createPatient(patient);
        const appointment: Appointment = {
          id: crypto.randomUUID(),
          start: slotInfo.start,
          end: slotInfo.end,
          title: `${values.type} with ${patient.name}`,
          type: values.type,
          client: patient.name,
          staff: selectedStaff?.name || "",
          clientId: patient.id,
          staffId: selectedStaff?.id,
          checkIn: false,
        };
        addAppointment(appointment);
        formikHelpers.resetForm();
      }
      setOpen(false);
      toast.success("Appointment created successfully.");
    },
  });

  const {
    values,
    errors,
    setFieldValue,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleClose = () => {
    setOpen(false);
  };

  const maxLength = patients.reduce(
    (max, { name }) => Math.max(max, name.length),
    0
  );

  function formatPatientData(patient: Patient, maxLength: number) {
    const padding = " ".repeat(maxLength - patient.name.length);
    console.log(`${patient.name}${padding} (${patient.phoneNumber})`);
    return `${patient.name}${padding} (${patient.phoneNumber})`;
  }


  return (
    <Modal
      onClose={handleClose}
      closeIcon
      onOpen={() => setOpen(true)}
      open={open}
    >
      {slotInfo && (
        <ModalHeader>
          <FontAwesomeIcon icon={faCalendarCheck} className={"me-2"} />
          Appointment: {slotInfo.start.toLocaleDateString(
            undefined,
            format
          )},{" "}
          {slotInfo.start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
          -
          {slotInfo.end.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}{" "}
        </ModalHeader>
      )}
      <ModalContent className="modalContent">
        <form onSubmit={handleSubmit}>
          <div className={"text-xl font-bold"}>
            Staff: {selectedStaff?.name}
          </div>
          <div className="inputPair required flex items-center mt-4">
            <label className={"me-2 font-semibold text-xl"}>Type:</label>
            <Dropdown
              value={values.type}
              onChange={(e, data) => {
                setFieldValue("type", data.value as string);
              }}
              search
              selection
              placeholder="Select a service"
              fluid
              options={options}
            />
          </div>
          {errors.type && <p className={"text-red-700"}>{errors.type}*</p>}
          <div className="flex items-center mt-4">
            <input
              name="existing"
              id="default-checkbox"
              type="checkbox"
              checked={values.existing}
              onChange={handleChange}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 dark:bg-gray-700"
            />
            <label
              htmlFor="default-checkbox"
              className="ms-2 font-semibold text-xl text-gray-900 dark:text-gray-300"
            >
              Existing Patient?
            </label>
          </div>

          <hr className="mt-4 mb-6" />

          {values.existing ? (
            <div>
              <div className="flex justify-center items-center">
                <label className={"whitespace-nowrap text-xl font-bold me-2"}>
                  Existing Client<span className={"text-red-700"}>*</span>:
                </label>
                <Dropdown
                  name="patientId"
                  placeholder="Select Client"
                  fluid
                  search
                  onChange={(e, { name, value }) => {
                    setFieldValue("patientId", value);
                  }}
                  value={values.patientId}
                  selection
                  options={patients.map((patient: Patient) => {
                    return {
                      key: patient.id,
                      text: `${patient.name} (${patient.phoneNumber})`,
                      value: patient.id,
                    };
                  })}
                />
              </div>
              {errors.patientId && (
                <p className={"text-red-700"}>{errors.patientId}*</p>
              )}
              <div className="mt-4">
                <label className={"text-xl font-semibold"}>Notes:</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block p-2.5 w-full text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                  placeholder="Type additional notes here"
                ></textarea>
              </div>
              <div className={"flex justify-end mt-4"}>
                <Button
                  content="Save"
                  labelPosition="right"
                  icon="checkmark"
                  type={"submit"}
                  positive
                />
              </div>
            </div>
          ) : (
            <div>
              <div className={"two-items-row grid grid-cols-2 gap-6"}>
                <div id={"first-name"} className={"w-full flex items-center"}>
                  <label
                    className={
                      "input-label text-xl font-semibold whitespace-nowrap"
                    }
                  >
                    First Name<span className={"text-red-700"}>*</span>
                  </label>
                  <div className="ui input w-full">
                    <input
                      className={"w-full"}
                      name={"firstName"}
                      type="text"
                      placeholder="Enter first name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                  </div>
                </div>
                <div id={"last-name"} className={"w-full flex items-center"}>
                  <label
                    className={
                      "input-label text-xl font-semibold whitespace-nowrap"
                    }
                  >
                    Last Name<span className={"text-red-700"}>*</span>
                  </label>
                  <div className="ui input w-full">
                    <input
                      name={"lastName"}
                      type="text"
                      placeholder="Enter last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                  </div>
                </div>
              </div>
              {errors.firstName && (
                <p className={"text-red-700"}>{errors.firstName}*</p>
              )}
              {errors.lastName && (
                <p className={"text-red-700"}>{errors.lastName}*</p>
              )}
              <div className={"mt-4"}>
                <div
                  id={"phone-number"}
                  className={"flex items-center whitespace-nowrap"}
                >
                  <label className={"input-label text-xl font-semibold"}>
                    Phone Number<span className={"text-red-700"}>*</span>
                  </label>
                  <div className="ui input w-full">
                    <input
                      name={"phoneNumber"}
                      type="text"
                      placeholder="Enter phone number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.phoneNumber}
                    />
                  </div>
                </div>
              </div>
              {errors.phoneNumber && (
                <p className={"text-red-700"}>{errors.phoneNumber}*</p>
              )}
              <div className={"mt-4"}>
                <div id={"email"} className={"flex items-center"}>
                  <label className={"input-label text-xl font-semibold"}>
                    Email
                  </label>
                  <div className="ui input w-full">
                    <input
                      name={"email"}
                      type="email"
                      placeholder="Enter email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={"full-width"}
                    />
                  </div>
                </div>
              </div>
              {errors.email && (
                <p className={"text-red-700"}>{errors.email}*</p>
              )}

              <div className="mt-4">
                <label className={"text-xl font-semibold"}>Notes:</label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block p-2.5 w-full text-base text-gray-900 rounded-lg border border-gray-300 focus:ring-primary focus:border-primary"
                  placeholder="Type additional notes here"
                ></textarea>
              </div>
              <div className={"flex justify-end mt-4"}>
                {selectedEvent && (
                  <Button
                    content="Cancel Appointment"
                    labelPosition="right"
                    icon="cancel"
                    onClick={handleCancelEvent}
                    negative
                  />
                )}
                <Button
                  content="Save"
                  labelPosition="right"
                  icon="checkmark"
                  type={"submit"}
                  positive
                />
              </div>
            </div>
          )}
        </form>
      </ModalContent>
    </Modal>
  );
}
