import React from "react";
import "./home.css";
import { Routes, Route, Link } from "react-router-dom";
import TopBar from "../../components/TopBar/topBar";
import Sidebar from "../../components/SideBar/sideBar";
import Dashboard from "../../components/Dashboard/dashboard";
import CreateUser from "../CreateUser/createUser";
import Complains from "../Complains/complains";
import Services from "../Services/services";

export default function Home() {
  return (
    <div>
      <TopBar />
      <div className="Container">
        <Sidebar />
        <div className="middleContainer">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/CreateUser" element={<CreateUser />} />
            <Route path="/Complains" element={<Complains />} />
            <Route path="/Services" element={<Services />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
