import React, { useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Home from "../pages/Home/home";
import Signin from "../pages/Signin/signin";
import { AuthProvider } from "../Authentication/AuthProvider";
import { AuthContext } from "../Authentication/AuthProvider";

const firebaseConfig = {
  apiKey: "AIzaSyAiiuFlgmeo7HKPKwy_KtNhG9BDP1fQo9U",
  authDomain: "rfmloyaltyco-7ddf2.firebaseapp.com",
  projectId: "rfmloyaltyco-7ddf2",
  storageBucket: "rfmloyaltyco-7ddf2.appspot.com",
  messagingSenderId: "95588283237",
  appId: "1:95588283237:web:c65b402678bc14135d678c",
  measurementId: "G-JEQBWFKF48",
};

export default function Main() {
  const { user } = useContext(AuthContext);

  return user ? (
    <BrowserRouter>
      <Home firebaseConfig={firebaseConfig} />
    </BrowserRouter>
  ) : (
    <Signin />
  );
}
