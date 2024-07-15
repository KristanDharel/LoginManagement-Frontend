import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import FormikRadio from "./FormikRadio";

const Signup = () => {
  let navigate = useNavigate();
  //each firld has 3 things value error anf touch
  let initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conPassword: "",
  };

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: "http://localhost:8000/users/register",
        method: "post",
        data: info,
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

    email: yup.string().required("FIll THIS FIELD"),
    password: yup
      .string()
      .required("FIll THIS FIELD")
      .matches(
        /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,10}$/,
        "regex pattern for a password that enforces a minimum length of 6 characters, a maximum length of 10 characters, requires at least one symbol, and at least one number"
      ), // regex is always wrapped between //,
    conPassword: yup
      .string()
      .required("Fill this field")
      .oneOf(
        [yup.ref("password")],
        "Your confirmed password must match the password"
      ),
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
              <FormikInput
                name="email"
                label="Email:"
                type={"email"}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                placeholder="Enter"
                required={true}
              ></FormikInput>
              <FormikInput
                name="password"
                label="Password:"
                type={"password"}
                onChange={(e) => {
                  formik.setFieldValue("password", e.target.value);
                }}
                placeholder="Enter your password"
                required={true}
              ></FormikInput>
              <FormikInput
                name="conPassword"
                label="Confirm Password:"
                type={"password"}
                onChange={(e) => {
                  formik.setFieldValue("conPassword", e.target.value);
                }}
                placeholder="Confirm your password"
                required={true}
              ></FormikInput>
              <FormikInput
                name="role"
                label="Role"
                type={"text"}
                onChange={(e) => {
                  formik.setFieldValue("role", e.target.value);
                }}
                placeholder="Enter your roled"
                required={true}
              ></FormikInput>

              <button type="submit">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Signup;
