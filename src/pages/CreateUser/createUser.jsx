import React, { useState, useEffect } from "react";
import "./createUser.css";
// import { getFirestore, doc, setDoc } from "firebase/firestore";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import Select from "react-select";
import { getMIDs, createUser } from "../../Firebase/firebase";
import { signupSchema } from "../../Validations/formValidations";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function CreateUser() {
  const [MIDsFromFirebase, setMIDsFromFirebase] = useState([]);
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    console.log("CreateUser");
    const MIDs = getMIDs();
    MIDs.then((data) => {
      console.log("MIDs", data);
      setMIDsFromFirebase(data);
    });
  }, []);

  return (
    <div className="Container">
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmpassword: "",
          MID: "",
        }}
        validationSchema={signupSchema}
        onSubmit={async (values) => {
          console.log("values", values);
          createUser(values);
          setUserCreated(true);
        }}
      >
        {(formikProps) => (
          <div className="formContainer">
            <div className="formTitle">Create a user account</div>
            <input
              className="inputField"
              type={"text"}
              placeholder={"Email"}
              value={formikProps.values.email}
              onChange={formikProps.handleChange("email")}
            />
            <input
              className="inputField"
              type={"text"}
              placeholder={"Password"}
              value={formikProps.values.password}
              onChange={formikProps.handleChange("password")}
            />
            <input
              className="inputField"
              type={"text"}
              placeholder={"Confirm Password"}
              value={formikProps.values.confirmpassword}
              onChange={formikProps.handleChange("confirmpassword")}
            />

            <Select
              className="dropDown"
              options={MIDsFromFirebase}
              onChange={({ value }) => formikProps.setFieldValue("MID", value)}
              placeholder={"Select MID"}
            />

            <button
              className="Button"
              type={"submit"}
              onClick={() => {
                formikProps.handleSubmit();
                formikProps.resetForm();
              }}
            >
              Signup
            </button>
          </div>
        )}
      </Formik>
      <img
        src={require("../../assets/images/AddUser4.png")}
        style={{ height: 500, width: 500 }}
      />
      <Snackbar
        open={userCreated}
        autoHideDuration={5000}
        onClose={() => setUserCreated(false)}
      >
        <MuiAlert
          severity="success"
          sx={{
            width: 500,
            backgroundColor: "green",
            color: "white",
            fontWeight: 500,
          }}
        >
          The user have been created successfully!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
