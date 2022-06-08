import React, { useContext } from "react";
// import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthContext } from "../../Authentication/AuthProvider";
// import { initializeApp } from "firebase/app";
import { FirebaseConfig } from "../../Firebase/firebase";
import logo from '../../assets/images/Logo.png';
import {
  getAuth,
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import "./signin.css";

// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   signOut,
// } from "firebase/auth";
// import { Link } from "react-router-dom";
// import firebase from "../../firebase-config";
// import { auth } from "../../firebase-config";
const theme = createTheme({
  palette: {
    background: {
      default: "#720a0a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#ffffff",
    },
  },
});

function Signin() {
  const { setUser } = useContext(AuthContext);

  // This function Authenticate Admin

  const AuthenticateAdmin = (values) => {
    console.log("values:", values.email);

    // const fireEmail = values.Email;
    // const firePassword = values.Password;

    const config = FirebaseConfig();
    // const firebaseConfig = {
    //   apiKey: "AIzaSyAiiuFlgmeo7HKPKwy_KtNhG9BDP1fQo9U",
    //   authDomain: "rfmloyaltyco-7ddf2.firebaseapp.com",
    //   projectId: "rfmloyaltyco-7ddf2",
    //   storageBucket: "rfmloyaltyco-7ddf2.appspot.com",
    //   messagingSenderId: "95588283237",
    //   appId: "1:95588283237:web:c65b402678bc14135d678c",
    //   measurementId: "G-JEQBWFKF48",
    // };

    // const config = initializeApp(firebaseConfig);
    const auth = getAuth();

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        userCredential.user.getIdToken().then(async (idToken) => {
          console.log("userCredential:", idToken);
          setUser(idToken);
        });
      })
      .catch((error) => {
        console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    AuthenticateAdmin({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} alt='' className="logo"/>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, color: "white" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              style={{ backgroundColor: "#111111" }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default Signin;
