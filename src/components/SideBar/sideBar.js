import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";

import {
  HomeRounded,
  Person,
} from "@mui/icons-material";

export default function SideBar() {
  return (
    <div className="sideBarContainer">
      {/* Home Button */}

      <Link
        className="sideBarButton "
        to="/"
        style={{ textDecoration: "none" }}
      >
        <HomeRounded className="sideBarButtonIcon" />
        <h3>Home</h3>
      </Link>

      {/* Create New User Button */}
      <Link
        className="sideBarButton "
        to="/CreateUser"
        style={{ textDecoration: "none" }}
      >
        <Person className="sideBarButtonIcon" />
        <h3>Create New User</h3>
      </Link>
      {/* complains Button */}
      {/* <Link
        className="sideBarButton "
        to="/Complains"
        style={{ textDecoration: "none" }}
      >
        <GppBad className="sideBarButtonIcon" />
        <h3>Complains</h3>
      </Link> */}
      {/* service Button */}
      {/* <Link
        className="sideBarButton "
        to="/Services"
        style={{ textDecoration: "none" }}
      >
        <MiscellaneousServices className="sideBarButtonIcon" />
        <h3>Services</h3>
      </Link> */}
    </div>
  );
}
