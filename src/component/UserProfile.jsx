import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getLoginInfo, removeLoginInfo } from "../utils/loginInfo";

const UserProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const log = useEffect(() => {
    const handleLogoutClick = () => {
      // Clear the token from local storage
      localStorage.removeItem("token");
      // Optionally, you can also clear other stored user data
      localStorage.removeItem("users");
    };
  });

  let params = useParams();
  let navigate = useNavigate();
  const loginInfo = getLoginInfo()?.token;
  console.log("login info here", loginInfo);

  let readData = async () => {
    try {
      let response = await axios({
        url: "http://localhost:8000/users/my-profile",
        method: "get",
        headers: {
          Authorization: `Bearer ${getLoginInfo()?.token}`,
        },
      });

      const result = response.data.data;
      const extractedEmail = result.email;
      const extractedFirstName = result.firstName;
      const extractedLastName = result.lastName;

      console.log("result here", result);
      console.log("extracted email here", extractedEmail);
      console.log("extracted full name here", extractedFirstName);

      setFirstName(response.data.data.firstName);
      setLastName(extractedLastName);
      // setDateOfBirth(new Date(dob).toLocaleDateString());
      // setProfileImage(profileImage);
      // setRole(role);
      setEmail(extractedEmail);
    } catch (error) {
      console.log(error);
      // navigate("/login");
    }
  };
  // utils/loginInfo.js

  useEffect(() => {
    readData();
  }, [params.id]);

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      <div className="profile-section">
        <label className="profile-label">First Name:</label>
        <p className="profile-info">{firstName}</p>
      </div>
      <div className="profile-section">
        <label className="profile-label">Last Name:</label>
        <p className="profile-info">{lastName}</p>
      </div>
      <div className="profile-section">
        <label className="profile-label">Email:</label>
        <p className="profile-info">{email}</p>
        <button
          onClick={() => {
            localStorage.removeItem("info");
            navigate("/login");
          }}
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
