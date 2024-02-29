import { useFormik } from "formik";
import React, { useContext } from "react";
import { PatientsContext } from "../contexts/patientsContext";
import "../styles/PatientEditForm.scss";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { Button, Dropdown, FormField, TextArea } from "semantic-ui-react";

const PatientEditForm = () => {
  const { setEditPatient, editPatient, selectedPatient, setSelectedPatient } =
    useContext(PatientsContext);
  const formik = useFormik({
    initialValues: {
      firstName: selectedPatient ? selectedPatient.name.split(" ")[0] : "",
      lastName: selectedPatient ? selectedPatient.name.split(" ")[1] : "",
      phoneNumber: selectedPatient ? selectedPatient.phoneNumber : "",
      address: selectedPatient ? selectedPatient.address : "",
      insurance: selectedPatient ? selectedPatient.insurance : "",
      gender: selectedPatient ? selectedPatient.gender : "",
      dob: selectedPatient ? selectedPatient.dob : new Date(),
      notes: selectedPatient ? selectedPatient.notes : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
      insurance: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
      notes: Yup.string().required("Required"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {},
  });

  const genderOptions = [
    {
      key: "1",
      text: "Male",
      value: "male",
    },
    {
      key: "2",
      text: "Female",
      value: "female",
    },
  ];

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    handleChange,
    handleBlur,
  } = formik;
  return (
    <form className={"ui form"}>
      <div className={"two-items-row"}>
        <div id={"first-name"}>
          <label className={"input-label"}>First Name</label>
          <div className="ui input">
            <input
              name={"firstName"}
              type="text"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
            />
          </div>
          {errors.firstName && <p className={"error"}>{errors.firstName}</p>}
        </div>
        <div id={"last-name"}>
          <label className={"input-label"}>Last Name</label>
          <div className="ui input">
            <input
              name={"lastName"}
              type="text"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lastName}
            />
          </div>
          {errors.lastName && <p className={"error"}>{errors.lastName}</p>}
        </div>
      </div>
      <div className={"two-items-row"}>
        <div id={"dob"} className={"date-picker"}>
          <label className={"input-label"}>Date of Birth</label>
          <DatePicker
            selected={values.dob}
            onChange={(value) => {
              setFieldValue("dob", value);
            }}
          />
        </div>
        <div id={"gender"} className={"date-picker"}>
          <label className={"input-label"}>Date of Birth</label>
          <Dropdown
            placeholder="State"
            value={values.gender}
            onChange={(e, data) => {
              setFieldValue("gender", data.value as string);
            }}
            search
            selection
            options={genderOptions}
          />
        </div>
      </div>
      <div className={"form-row field"}>
        <div id={"phone-number"}>
          <label className={"input-label"}>Phone Number</label>
          <div className="ui input">
            <input
              name={"phoneNumber"}
              type="text"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
          </div>
          {errors.phoneNumber && (
            <p className={"error"}>{errors.phoneNumber}</p>
          )}
        </div>
      </div>
      <div className={"form-row field"}>
        <div id={"address"}>
          <label className={"input-label"}>Address</label>
          <div className="ui input">
            <input
              name={"address"}
              type="text"
              placeholder=""
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
              className={"full-width"}
            />
          </div>
          {errors.address && <p className={"error"}>{errors.address}</p>}
        </div>
      </div>
      <div className={"form-row"}>
        <label className={"input-label"}>Notes</label>
        <textarea
          placeholder="Tell us more"
          rows={3}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.notes}
        ></textarea>
      </div>
      <div className={"form-row"}>
        <Button positive type={"submit"}>
          Save
        </Button>
        <Button negative onClick={() => setEditPatient(false)}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default PatientEditForm;
