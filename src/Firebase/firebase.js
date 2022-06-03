import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export function FirebaseConfig() {
  const firebaseConfig = {
    apiKey: "AIzaSyAiiuFlgmeo7HKPKwy_KtNhG9BDP1fQo9U",
    authDomain: "rfmloyaltyco-7ddf2.firebaseapp.com",
    projectId: "rfmloyaltyco-7ddf2",
    storageBucket: "rfmloyaltyco-7ddf2.appspot.com",
    messagingSenderId: "95588283237",
    appId: "1:95588283237:web:c65b402678bc14135d678c",
    measurementId: "G-JEQBWFKF48",
  };

  return initializeApp(firebaseConfig);
}

// This function is to fetch MIDS for firebase
export const getMIDs = async () => {
  const temps = [];
  const config = FirebaseConfig();
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
  const config = FirebaseConfig();
  const db = getFirestore();
  const auth = getAuth(config);

  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then(async (userCredential) => {
      console.log("New User Created");
      // Signed in
      // const user = userCredential.user;
      // ...
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: values.email,
          MID: values.MID,
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      return false;
    });
};
