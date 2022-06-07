import React, { useState, useEffect } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import * as XLSX from "xlsx";
import { Line, Circle } from "rc-progress";
import UploadIcon from "@mui/icons-material/Upload";
import "./dashboard.css";
import { FirebaseConfig } from "../../Firebase/firebase";

const columns: GridColDef[] = [
  { field: "id", headerName: "MID", width: 150 },
  { field: "email", headerName: "Email", width: 300 },
  { field: "tids", headerName: "Tids", width: 300 },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 130,
  },
];

export default function Dashboard(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [modalVisability, setModalVisability] = useState(false);
  const [rows, setRows] = useState([]);

  const getAllUsers = async () => {
    console.log("getAllUsers");
    const config = FirebaseConfig();
    const db = getFirestore();
    const querySnapshot = await getDocs(collection(db, "users"));
    const querySnapshot2 = await getDocs(collection(db, "merchants"));

    const temp = [];
    let i = 0;
    querySnapshot.forEach((doc) => {
      const Data = doc.data();
      console.log("==>", Data);
      console.log(Data);

      // { id: 1, email: "Snow", tids: [312312, 12312312], createdAt: 35 },
      temp.push({
        id: Data["MID"],
        email: Data["email"],
        tids: Object.keys(querySnapshot2.docs[i].data()),
        createdAt: Data["CreatedAt"].toDate("d"),
      });
      i = i + 1;
      console.log("querySnapshot2", Object.keys(querySnapshot2.docs[0].data()));
    });
    setRows(temp);
  };

  initializeApp(props.firebaseConfig);
  const db = getFirestore();
  useEffect(() => {
    initializeApp(props.firebaseConfig);
    console.log("getAllUsers");
    getAllUsers();
  }, []);
  const addMerchant = async (MID, data, index, size) => {
    const docRef = doc(db, "merchants", `${MID}`);

    setDoc(docRef, data, { merge: true })
      .then(() => {
        setFileUploaded(true);
        console.log("Added Successfully!");
        setProgressBar((index / size) * 100);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        var ws = wb.Sheets[wsname];

        // const Headings = [
        //   [
        //     "TID",
        //     "MID",
        //     "CreationDate",
        //     "Merchant Name",
        //     "Flat Amount",
        //     "Percentage",
        //     "CountTrxnMon",
        //     "SumTrxnMon",
        //     "SumCommMon",
        //   ],
        // ];

        // ws = XLSX.utils.sheet_add_aoa(ws); //Add Headings as a second argument for bank file upload

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (err) => {
        reject(err);
      };
    });

    promise.then(async (fileDataList) => {
      if (fileDataList) {
        fileDataList.shift();
        // console.log(fileDataList);
        let dataList = [];
        fileDataList.map((row) => {
          if (row.TID && typeof row.TID === "number") {
            dataList.push(row);
          }
        });

        // console.log(dataList);

        setIsLoading(true);
        dataList.map((row, index) => {
          let data = {};
          const TID = row["TID"];
          data[TID] = row;
          // console.log("Percentage", (index / dataList.length) * 100);
          // per = (index / dataList.length) * 100;
          // {

          // name: row["Merchant Name"],
          // address: row["ADDRESS"],
          // deployment_date: row["Deployment Date"],
          // };
          const size = dataList.length;

          addMerchant(row.MID, data, index + 1, size);
        });

        setIsLoading(false);
      }
    });
  };

  return (
    <div className="dashboardContainer">
      {0 ? (
        <div className="logoutModal">
          <div className="blueButton">
            <h3>logout</h3>
          </div>
        </div>
      ) : null}
      <img
        src={require("../../assets/images/t1.png")}
        alt="RFM Image"
        className="topImage"
      />
      <div className="Button">
        <UploadIcon style={{ marginLeft: 20, marginRight: 10 }} />
        <div style={{ fontWeight: 700 }}>Upload Excel FIle</div>

        <input
          type="file"
          style={{ opacity: 0, position: "absolute" }}
          onChange={(e) => {
            const file = e.target.files[0];

            readExcel(file);
          }}
        />
      </div>
      {progressBar ? (
        <div className="progressBar">
          <Line percent={progressBar} strokeWidth={1} strokeColor="#111111" />
          <div className="progressBarPercentage">{`${parseInt(
            progressBar
          )}%`}</div>
        </div>
      ) : null}

      <div
        style={{
          height: "45%",
          width: "95%",
          marginTop: 10,
          alignSelf: "center",
        }}
      >
        <DataGrid
          style={{ color: "white", fontweight: 700 }}
          rows={rows}
          columns={columns}
          pageSize={3}
          rowsPerPageOptions={[4]}
          checkboxSelection
        />
      </div>

      {/* <Snackbar
        open={fileUploaded}
        autoHideDuration={3000}
        onClose={() => setFileUploaded(false)}
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
          The file have been uploaded successfully!
        </MuiAlert>
      </Snackbar> */}
    </div>
  );
}
