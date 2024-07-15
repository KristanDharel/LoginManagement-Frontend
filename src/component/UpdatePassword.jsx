import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getLoginInfo } from "../utils/loginInfo";
// import FormikRadio from "./FormikRadio";

const UpdatePassword = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  let navigate = useNavigate();
  //   let [firstName, setFirstName] = useState("");
  //   let [lastName, setLastName] = useState("");
  //each firld has 3 things value error anf touch
  // let initialValues = {
  //   firstName: "",
  //   lastName: "",
  // };
  const [initialValues, setInitialValues] = useState({
    password: "",
    oldPassword: "",
    newPassword: "",
  });

  let onSubmit = async (info) => {
    try {
      let result = await axios({
        url: "http://localhost:8000/users/update-password",
        method: "PATCH",
        data: info,
        headers: {
          Authorization: `Bearer ${getLoginInfo()?.token}`,
        },
      });
      setInitialValues({
        oldPassword: result.data.result.oldPassword,
        newPassword: result.data.result.newPassword,
      });
      navigate("/login");
    } catch (error) {
      console.log("unable to update");
    }
  };
  //   const onSubmit = async (values) => {
  //     try {
  //       //   console.log("button clicked....");

  //       // Get the token from the query parameters in the URL
  //       const urlParams = new URLSearchParams(window.location.search); // the URLSearchParams API is used to extract the token parameter from the query string of the current URL.
  //       const token = urlParams.get("token"); //The token is retrieved using urlParams.get('token').

  //       // Include the token as a query parameter in the request URL
  //       const response = await axios.patch(
  //         `http://localhost:8000/users/update-password?token=${
  //           getLoginInfo()?.token
  //         }`,
  //         values
  //       );
  //       //   console.log(response.data);
  //       navigate("/login");
  //     } catch (error) {
  //       console.log("Unable to submit:", error);
  //     }
  //   };

  let validationSchema = yup.object({
    password: yup
      .string()
      .required("FIll THIS FIELD")
      .matches(
        /^(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{6,10}$/,
        "regex pattern for a password that enforces a minimum length of 6 characters, a maximum length of 10 characters, requires at least one symbol, and at least one number"
      ), // regex is always wrapped between //,
    oldPassword: yup.string().required("FIll THIS FIELD"), // regex is always wrapped between //,
    newPassword: yup.string().required("Fill this field"),
    // regex is always wrapped between //,
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
                name="oldPassword"
                label="Old Password:"
                type={"password"}
                // value={oldPassword}
                onChange={(e) => {
                  formik.setFieldValue("oldPassword", e.target.value);
                }}
                placeholder="Enter"
                required={true}
              ></FormikInput>
              <FormikInput
                name="newPassword"
                label="New Password:"
                type={"text"}
                // value={newPassword}
                onChange={(e) => {
                  formik.setFieldValue("newPassword", e.target.value);
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
      {/* <button
        onClick={() => {
          navigate("/update-password");
        }}
      >
        Update Password
      </button> */}
    </div>
  );
};

export default UpdatePassword;
