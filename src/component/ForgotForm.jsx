import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import FormikInput from "./FormikInput";
import { useNavigate } from "react-router-dom";
// import FormikRadio from "./FormikRadio";

const ForgotForm = () => {
  // const navigate = useNavigate("");
  //each firld has 3 things value error anf touch
  let initialValues = {
    email: "",
  };
  let onSubmit = (value, other) => {
    console.log(value);
  };
  let validationSchema = yup.object({
    email: yup.string().required("Please fill this field"),
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
                name="email"
                label="Email:"
                type={"email"}
                onChange={(e) => {
                  formik.setFieldValue("email", e.target.value);
                }}
                placeholder="Enter your mail"
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

export default ForgotForm;
