import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setLoginInfo } from "../utils/loginInfo";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values
      );
      console.log("response", response);
      const token = response.data.token;
      const name = response.data.name;
      setLoginInfo({ token });
      navigate("/my-profile");
    } catch (error) {
      console.log("Unable to submit:", error);
      navigate("/login");
      setLoginError(true); //If it catches error the error state is set to true
    } finally {
      setSubmitting(false); //its set to false inside finally to reset the form for another user
    }
  };
  let validationSchema = yup.object({
    email: yup.string().required("Please fill this field"),
    password: yup.string().required("Please fill this field"),
  });
  const handleDeleteAlert = () => {
    alert("Login Error");
  };
  const handleForgotPassword = () => {
    // Handle the logic for the "Forgot Password?" action
    navigate("/forgot-password");
  };

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
                name="email"
                label="Email:"
                type={"email"}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                placeholder="Enter your mail"
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

              <button type="submit">Submit</button>
              <div className="forgot-password">
                <a href="#" onClick={handleForgotPassword}>
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="form-button"
              >
                Login
              </button>
            </Form>
          );
        }}
      </Formik>
      {loginError && handleDeleteAlert()}
    </div>
  );
};

export default Login;
