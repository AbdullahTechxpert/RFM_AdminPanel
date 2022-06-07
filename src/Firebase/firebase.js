// import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
// import { async } from "@firebase/util";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// import Snackbar from "@mui/material/Snackbar";

export function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyA7X13N9VWt75lTmyfrEKQzub4i6XbtauA",
    authDomain: "temprfmadminpanel.firebaseapp.com",
    projectId: "temprfmadminpanel",
    storageBucket: "temprfmadminpanel.appspot.com",
    messagingSenderId: "668623256797",
    appId: "1:668623256797:web:2b694d8d96d172f328ef34",
    measurementId: "G-FNWJP9M6SC",
  };

  return initializeApp(firebaseConfig);
}

// This function is to fetch MIDS for firebase
export const getMIDs = async () => {
  const temps = [];
  // const config = FirebaseConfig();
  const db = getFirestore();
  const querySnapshot = await getDocs(collection(db, "merchants"));
  querySnapshot.forEach((doc) => {
    temps.push({ value: doc.id, label: doc.id });
    //console.log(`${doc.id} => ${doc.data()}`);
  });
  return temps;
};

// This function is to create new user

export const createUser = (values) => {
  const { email, password, MID } = values;
  console.log("=>", email, password, MID);
  const config = FirebaseConfig();
  const db = getFirestore();
  const auth = getAuth(config);

  const result = createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      console.log("New User Created");

      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          MID: MID,
          CreatedAt: Timestamp.fromDate(new Date()),
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
      } catch (e) {
        console.error("Error adding document: ", e);
        return false;
      }
    })
    .catch((error) => {
      console.log("error:", error);
      // const errorCode = error.code;
      // const errorMessage = error.message;

      return false;
    });

  return result;
};
