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
  const [openSnackbar, setSnackbar] = useState(null);

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
          // const { email, password } = values;
          const isUserCreated = await createUser(values);
          console.log("===>isUserCreated", isUserCreated);
          setSnackbar(isUserCreated);
          // formikProps.resetForm();
          // setUserCreated(true);
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
                formikProps.handleSubmit(formikProps);
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
      {/* success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar(null);
        }}
      >
        <MuiAlert severity="success" sx={{ width: 300 }}>
          The User Created Successfully!
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={openSnackbar == false ? true : false}
        autoHideDuration={3000}
        onClose={() => {
          setSnackbar(null);
        }}
      >
        <MuiAlert severity="error" sx={{ width: 300 }}>
          Enter Correct Email and Password
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
