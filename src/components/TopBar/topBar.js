import React, { useState, useContext } from "react";
import "./topBar.css";
import { AuthContext } from "../../Authentication/AuthProvider";

export default function TopBar() {
  const [modalVisability, setModalVisability] = useState(false);
  const { setUser } = useContext(AuthContext);
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
            alt=""
            className="profileImage"
            onClick={() => setModalVisability((prev) => !prev)}
          />
        </div>
      </div>
      {modalVisability ? (
        <div className="logoutModal">
          <button
            className="blueButton"
            type={"button"}
            onClick={() => {
              console.log("Logout");
              setUser(false);
            }}
            title="555"
          >
            <h3>Logout</h3>
          </button>
        </div>
      ) : null}
    </div>
  );
}
