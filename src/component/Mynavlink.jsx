import React from "react";
import { NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";

const Mynavlink = () => {
  return (
    <div>
      <NavLink to={"/"} style={{ marginRight: "20px" }}>
        Button
      </NavLink>

      <NavLink to={"/login"} style={{ marginRight: "20px" }}>
        Login
      </NavLink>
      <NavLink to={"/signup"} style={{ marginRight: "20px" }}>
        Signup
      </NavLink>
      <NavLink to={"/my-profile"} style={{ marginRight: "20px" }}>
        Profile
      </NavLink>
      <NavLink to={"/update-profile"} style={{ marginRight: "20px" }}>
        Update Profile
      </NavLink>
    </div>
  );
};

export default Mynavlink;
