import React, { useState } from "react";
// import { MdPerson, MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Importing React Icons
import { Redirect, useHistory } from "react-router-dom";
// import OtpForm from "../../Forget_password/OtpForm";
import EmployLoginForm from "../../components/accounts/login/EmployLoginForm";
import EmployForgotPasswordForm from "../../components/accounts/forgotPassword/EmployForgotPasswordForm"

const EmployLoginPage = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  // const [showForgotPasswordForm, setShowForgotPasswordForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentForm, setCurrentForm] = useState("login");

  async function submitHandle(e) {
    e.preventDefault();

    const response = await fetch(`http://127.0.0.1:8000/api/accounts/admin-login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response?.ok) {
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userName", data.username);
      history.push("/home");
    } else {
      setError("Invalid credentials.");
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
    <div className="flex items-center justify-center bg-white text-gray-800 mt-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        {currentForm === "login" && (
          <EmployLoginForm
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
          <EmployForgotPasswordForm
            email={email}
            setEmail={setEmail}
            error={error}
            onRequestOtp={handleForgotPasswordRequest}
            onBackToLogin={() => setCurrentForm("login")}
          />
        )}
        {/*currentForm === "otp" && (
          <EmployOtpForm
            otp={otp}
            newPassword={newPassword}
            setOtp={setOtp}
            setNewPassword={setNewPassword}
            error={error}
            onResetPassword={handleResetPassword}
          />
        )*/}
        </div>
    </div>
  );
}

export function Logout() {
  return <Redirect to="/" />;
}

export default EmployLoginPage;
