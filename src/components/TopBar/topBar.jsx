import React, { useState } from "react";
import "./topBar.css";

export default function TopBar() {
  const [modalVisability, setModalVisability] = useState(false);
  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="leftContainer">
          <img
            src={require("../../assets/images/Logo.png")}
            alt="RFM Logo"
            className="logo"
          />
          <div className="left">RFM Admin Panel</div>
        </div>

        <div className="right">
          <h2 className="userName">Hi! UserName</h2>
          {/* <input type="image" name="Name of image button"  > */}

          <input
            type="image"
            src="https://www.business2community.com/wp-content/uploads/2014/04/profile-picture-300x300.jpg"
            className="profileImage"
            onClick={() => setModalVisability((prev) => !prev)}
          />
        </div>
      </div>
      {modalVisability ? (
        <div className="logoutModal">
          <div className="blueButton">
            <h3>logout</h3>
          </div>
        </div>
      ) : null}
    </div>
  );
}
