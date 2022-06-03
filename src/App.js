import React, { useContext, useEffect } from "react";
import * as XLSX from "xlsx";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import Home from "./pages/Home/home";
import Signin from "./pages/Signin/signin";
import { AuthProvider } from "./Authentication/AuthProvider";
import { AuthContext } from "./Authentication/AuthProvider";
import Main from "./pages/main";
import { AuthenticateAdmin } from "./Firebase/firebase";

function App() {
  // console.log("App");
  const obj = useContext(AuthContext);

  // This is firestore connect config

  // const firebaseConfig = {
  //   apiKey: "AIzaSyAiiuFlgmeo7HKPKwy_KtNhG9BDP1fQo9U",
  //   authDomain: "rfmloyaltyco-7ddf2.firebaseapp.com",
  //   projectId: "rfmloyaltyco-7ddf2",
  //   storageBucket: "rfmloyaltyco-7ddf2.appspot.com",
  //   messagingSenderId: "95588283237",
  //   appId: "1:95588283237:web:c65b402678bc14135d678c",
  //   measurementId: "G-JEQBWFKF48",
  // };

  // const db = initializeApp(firebaseConfig);
  // const { isLoading } = useContext(AuthContext);

  // useEffect(() => {
  //   console.log("user:", user);
  // }, []);
  // const readExcel = (file) => {
  //   const promise = new Promise((resolve, reject) => {
  //     const fileReader = new FileReader();
  //     fileReader.readAsArrayBuffer(file);
  //     fileReader.onload = (e) => {
  //       const bufferArray = e.target.result;
  //       const wb = XLSX.read(bufferArray, { type: "buffer" });
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       const data = XLSX.utils.sheet_to_json(ws);
  //       resolve(data);
  //     };
  //     fileReader.onerror = (error) => {
  //       reject(error);
  //     };
  //     promise.then((d) => {
  //       console.log(d);
  //     });
  //   });
  // };
  // var workbook = XLSX.readFile(filename, opts);

  // const onChange = (e) => {
  //   const [file] = e.target.files;
  //   const reader = new FileReader();

  //   reader.onload = (evt) => {
  //     const bstr = evt.target.result;
  //     const wb = XLSX.read(bstr, { type: "binary" });
  //     const wsname = wb.SheetNames[0];
  //     const ws = wb.Sheets[wsname];
  //     const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  //     data.forEach((item, index) => {
  //       console.log("MID: ", item[2]);
  //     });
  //   };
  //   reader.readAsBinaryString(file);
  // };

  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
  // <div>
  //   {/* <input
  //     type="file"
  //     onChange={(e) => {
  //       const file = e.target.files[0];
  //       readExcel(file);
  //     }}
  //   /> */}

  //   <input type="file" onChange={onChange} />
  //   <h1>Hello world</h1>
  // </div>
}

export default App;
