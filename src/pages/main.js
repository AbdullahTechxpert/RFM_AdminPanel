import React from "react";
// import * as XLSX from "xlsx";
import { BrowserRouter } from "react-router-dom";
// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import Home from "../pages/Home/home";
// import Signin from "../pages/Signin/signin";
// import { AuthProvider } from "../Authentication/AuthProvider";
// import { AuthContext } from "../Authentication/AuthProvider";

const firebaseConfig = {
  apiKey: "AIzaSyA7X13N9VWt75lTmyfrEKQzub4i6XbtauA",
  authDomain: "temprfmadminpanel.firebaseapp.com",
  projectId: "temprfmadminpanel",
  storageBucket: "temprfmadminpanel.appspot.com",
  messagingSenderId: "668623256797",
  appId: "1:668623256797:web:2b694d8d96d172f328ef34",
  measurementId: "G-FNWJP9M6SC",
};

export default function Main() {
  // const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Home firebaseConfig={firebaseConfig} />
    </BrowserRouter>
  )
}
