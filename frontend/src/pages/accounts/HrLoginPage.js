import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import OtpForm from "../../components/Login/Forget_password/OtpForm";
import HrLoginForm from "../../components/accounts/login/HrLoginForm";
import HrForgotPasswordForm from "../../components/accounts/forgotPassword/HrForgotPasswordForm";
import * as URLS from "../../libs/apiUrls"
import {loginSuccess} from "../../redux/auth/authSlice"

const HrLoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentForm, setCurrentForm] = useState("login");

  const publicAxios = axios.create(); // No interceptors for this instance

  async function submitHandle(e) {
    e.preventDefault();
    setError("");
    const params = { email, password };
  
    try {
      const response = await publicAxios.post(URLS.HR_LOGIN, params);

      if (response.status === 200 && response.data?.user_id) {
          //dispatch api response
          dispatch(loginSuccess({...response.data, userType: 'hr' }))     
          history.push(`/1/dashboard`);
      } else {
        setError("Invalid login credentials. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 500) {
          setError("Server error. Please try again later.");
        } else {
          setError("An error occurred. Please try again.");
        }
      } else if (err.request) {
        setError("No response from the server. Please check your network.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }
  
  
    // Reset password with OTP
    const handleResetPassword = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/reset-password/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, new_password: newPassword }),
        });
  
        if (response.ok) {
          alert("Password reset successful. You can now log in.");
          setShowOtpForm(false); // Hide OTP form
          setEmail("");
          setPassword("");
          setCurrentForm("login");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Password reset failed");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error(error);
      }
    };
  
    // OTP for password reset
    const handleForgotPasswordRequest = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch("http://127.0.0.1:8000/api/accounts/forgot-password/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
  
        if (response.ok) {
          alert("OTP sent to your email. Please check.");
          setShowOtpForm(true); // Show OTP form
          setCurrentForm("otp");
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to send OTP");
        }
      } catch (error) {
        setError("Something went wrong. Please try again.");
        console.error(error);
      }
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-gray-800 mt-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        {currentForm === "login" && (
          <HrLoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            onLogin={submitHandle}
            onForgotPassword={() => setCurrentForm("forgotPassword")}
          />
        )}
        {currentForm === "forgotPassword" && (
          <HrForgotPasswordForm
            email={email}
            setEmail={setEmail}
            error={error}
            onRequestOtp={handleForgotPasswordRequest}
            onBackToLogin={() => setCurrentForm("login")}
          />
        )}
        {currentForm === "otp" && (
          <OtpForm
            otp={otp}
            newPassword={newPassword}
            setOtp={setOtp}
            setNewPassword={setNewPassword}
            error={error}
            onResetPassword={handleResetPassword}
          />
        )}
        </div>
    </div>
  );
}

export function Logout() {
  return <Redirect to="/" />;
}

export default HrLoginPage;
