import React, { useState } from "react";
//import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import * as XLSX from "xlsx";
import { Line, Circle } from "rc-progress";

import UploadIcon from "@mui/icons-material/Upload";

import "./dashboard.css";

// const columns: GridColDef[] = [
//   { field: "id", headerName: "ID", width: 70 },
//   { field: "firstName", headerName: "First name", width: 130 },
//   { field: "lastName", headerName: "Last name", width: 130 },
//   {
//     field: "age",
//     headerName: "Age",
//     type: "number",
//     width: 90,
//   },
//   {
//     field: "fullName",
//     headerName: "Full name",
//     description: "This column has a value getter and is not sortable.",
//     sortable: false,
//     width: 160,
//     valueGetter: (params: GridValueGetterParams) =>
//       `${params.row.firstName || ""} ${params.row.lastName || ""}`,
//   },
// ];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: 70 },
//   { id: 6, lastName: "Melisandre", firstName: "Abdullah", age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

export default function Dashboard(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressBar, setProgressBar] = useState(0);
  const [modalVisability, setModalVisability] = useState(false);

  initializeApp(props.firebaseConfig);
  const db = getFirestore();
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

      {/* <div
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
      </div> */}

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
