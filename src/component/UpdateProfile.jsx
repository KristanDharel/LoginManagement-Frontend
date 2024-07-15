import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/loginInfo";
// import FormikRadio from "./FormikRadio";

const UpdateProfile = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  let navigate = useNavigate();
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  //each firld has 3 things value error anf touch
  // let initialValues = {
  //   firstName: "",
  //   lastName: "",
  // };
  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
  });

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: "http://localhost:8000/users/update-profile",
        method: "PATCH",
        data: info,
        headers: {
          Authorization: `Bearer ${getLoginInfo()?.token}`,
        },
      });
      setInitialValues({
        firstName: result.data.result.firstName,
        lastName: result.data.result.lastName,
      });
      navigate("/login");
    } catch (error) {
      console.log("unable to create");
    }
  };

  let validationSchema = yup.object({
    firstName: yup
      .string()
      .required("FIll THIS FIELD")

      //   .min(10, "Must be atleast 10 characters.")
      //   .max(15, "Dont exceed more than 15 character")
      .matches(/^[a-zA-Z ]*$/, "Only enter alphabets and spaces"), // regex is always wrapped between //,

    lastName: yup
      .string()
      .required("FIll THIS FIELD")
      .matches(/^[a-zA-Z ]*$/, "Only enter alphabets and spaces"), // regex is always wrapped between //,
  });
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => {
          return (
            <Form>
              <FormikInput
                name="firstName"
                label="First Name:"
                type={"text"}
                onChange={(e) => {
                  formik.setFieldValue("firstName", e.target.value);
                }}
                placeholder="Enter"
                required={true}
              ></FormikInput>
              <FormikInput
                name="lastName"
                label="Last Name:"
                type={"text"}
                onChange={(e) => {
                  formik.setFieldValue("lastName", e.target.value);
                }}
                placeholder="Enter"
                required={true}
              ></FormikInput>

              <button
                type="submit"
                // onClick={() => {
                //   navigate("/my-profile");
                // }}
              >
                Update
              </button>
            </Form>
          );
        }}
      </Formik>
      <button
        onClick={() => {
          navigate("/update-password");
        }}
      >
        Update Password
      </button>
    </div>
  );
};

export default UpdateProfile;
