import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Login from "./Login";
import Signup from "./Signup";
import ForgotForm from "./ForgotForm";
import VerifyEmailPage from "./VerifyEmail";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";
// import UpdateProfile from "./UpdateProfile";

const Myroute = () => {
  return (
    <div>
      <Routes>
        {/* <Route
          path="/"
          element={<RegistrationSuccessPage></RegistrationSuccessPage>}
        /> */}
        <Route path="/" element={<Landing></Landing>} />
        <Route path="verify-email" element={<VerifyEmailPage />} querystring />
        <Route path="login" element={<Login></Login>} />
        <Route path="signup" element={<Signup></Signup>} />
        <Route path="forgot" element={<ForgotForm></ForgotForm>} />
        <Route path="my-profile" element={<UserProfile></UserProfile>} />
        <Route
          path="update-profile"
          element={<UpdateProfile></UpdateProfile>}
        />

        <Route path="update-password" element={<UpdatePassword />} />
      </Routes>
    </div>
  );
};

export default Myroute;
