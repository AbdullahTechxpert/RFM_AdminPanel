import React from "react";
import "./topBar.css";

export default function TopBar() {
  return (
    <div className="topBar">
      <div className="topBarWrapper">
        <div className="left">RFM Admin Panel</div>
        <div className="right">
          <h2 className="userName">Hi! UserName</h2>
          <img
            src="https://www.business2community.com/wp-content/uploads/2014/04/profile-picture-300x300.jpg"
            className="profileImage"
          />
        </div>
      </div>
    </div>
  );
}
