import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./Register.css";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import EmailIcon from "@material-ui/icons/Email";
import { Context } from "../../../API/Context";
import { csrftoken } from "../../../API/CSRFToken";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const value = useContext(Context);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function submitHandle(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response?.ok) {
      setSuccess(true);
    } else {
      setError(data.message || "Registration failed. Please try again.");
    }
  }

  if (value?.loggedIn) {
    return <Redirect to="/home" />;
  }

  if (success) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="Register">
      <form className="register-form shadow-lg" onSubmit={submitHandle}>
        <legend>Register</legend>
        {error && <span className="Register__error">{error}</span>}
        <div className="input-group mb-2">
          <span className="input-group-text">
            <PersonIcon />
          </span>
          <input
            type="text"
            placeholder="USERNAME"
            className="form-control"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <EmailIcon />
          </span>
          <input
            type="email"
            placeholder="EMAIL"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <VpnKeyIcon />
          </span>
          <input
            type="password"
            placeholder="PASSWORD"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group mb-2">
          <span className="input-group-text">
            <VpnKeyIcon />
          </span>
          <input
            type="password"
            placeholder="CONFIRM PASSWORD"
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <input type="submit" value="REGISTER" className="btn btn-primary w-50" />
      </form>
    </div>
  );
}

export default Register;
