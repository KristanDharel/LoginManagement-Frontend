import React from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate("");
  return (
    <div>
      <button
        onClick={() => {
          navigate("/Login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/Signup");
        }}
      >
        Sign Up
      </button>
    </div>
  );
};

export default Landing;
