import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  console.log("hello world");
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
    <div>
      <h1>Hello World</h1>
    </div>

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
  );
}

export default App;
