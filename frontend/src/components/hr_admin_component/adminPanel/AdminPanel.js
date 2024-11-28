import React, { useState, useEffect } from "react";
import "./AdminPanel.css";
import AdminList from "./AdminList";

function AdminPanel() {
  const [input, setInput] = useState({
    id: "",
    username: "",
    password: "",
    status: 1,
  });
  const [data, setData] = useState([]);

  const inputHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const get_admin = () => {
    const token = localStorage.getItem("accessToken");
  
    fetch(`http://127.0.0.1:8000/api/admin/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error("Failed to fetch admin data:", error));
  };
  
  const updateHandle = (id) => {
    const token = localStorage.getItem("accessToken");  // Get the token from localStorage
  
    fetch(`http://127.0.0.1:8000/api/admin/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Add the Authorization header with the token
      },
      body: JSON.stringify(input),
    })
      .then((res) =>
        res.ok ? alert("Record Updated!") : alert("Failed To Update!")
      )
      .then(get_admin)  // Fetch the updated admin data
      .then(resetHandle);  // Reset the form or input fields
  };
  

  const registerHandle = () => {
    const token = localStorage.getItem("accessToken");  // Get the token from localStorage
  
    fetch(`http://127.0.0.1:8000/api/admin/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,  // Add the Authorization header with the token
      },
      body: JSON.stringify(input),
    })
      .then((res) =>
        res.ok ? alert("Record Registered!") : alert("Username Already Exists!")
      )
      .then(get_admin)  // Fetch the updated admin data
      .then(resetHandle);  // Reset the form or input fields
  };
  

  const submitHandle = (e) => {
    e.preventDefault();

    if (input.id) {
      updateHandle(input.id);
    } else {
      registerHandle();
    }
  };

  const deleteHandle = (id) => {
    const token = localStorage.getItem("accessToken");  // Get the token from localStorage
    
    let check = window.confirm("Do you want to delete?");
    if (check) {
      fetch(`http://127.0.0.1:8000/api/admin/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,  // Add the Authorization header with the token
        },
      })
        .then((res) =>
          res.ok ? alert("Record Deleted!") : alert("Failed To Delete!")
        )
        .then(get_admin)  // Fetch the updated admin data
        .then(resetHandle);  // Reset the form or input fields
    }
  };
  

  const resetHandle = () => {
    setInput({
      id: "",
      username: "",
      password: "",
      status: 1,
    });
  };

  useEffect(() => {
    get_admin();
  }, []);

  return (
    <div className="AdminPanel">
      <div className="AdminPanel__details shadow">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col-sm-1">SR.NO.</th>
              <th scope="col-md-3">USERNAME</th>
              <th scope="col-md-3">STATUS</th>
              <th scope="col-sm-1"></th>
            </tr>
          </thead>
          <tbody>
            {data.length>0 ? data.map((d, i) => (
              <AdminList
                key={d.id}
                srno={i + 1}
                id={d.id}
                username={d.username}
                status={d.status}
                setInput={setInput}
                deleteHandle={deleteHandle}
              />
            ))
            :
            <p>No Record Found</p>
            }
          </tbody>
        </table>
      </div>
      <div className="AdminPanel__form">
        <form className="shadow">
          <legend>Admin Registration</legend>
          <div className="input-group mb-2">
            <label htmlFor="username" className="input-group-text">
              {/* <PersonIcon /> */}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              value={input.username}
              onChange={inputHandle}
              className="form-control"
            />
          </div>
          <div className="input-group mb-2">
            <label htmlFor="password" className="input-group-text">
              {/* <VpnKeyIcon /> */}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={input.password}
              onChange={inputHandle}
              className="form-control"
            />
          </div>
          <div className="input-group mb-2">
            <label htmlFor="status" className="input-group-text">
              {/* <LockRoundedIcon /> */}
            </label>
            <select
              className="form-select"
              name="status"
              id="status"
              value={input.status}
              onChange={inputHandle}
            >
              <option value="1">active</option>
              <option value="0">inactive</option>
            </select>
          </div>
          <div className="AdminPanel__form__button">
            <input
              type="submit"
              value="Submit"
              onClick={submitHandle}
              className="btn btn-success btn-sm mx-1"
            />
            <input
              type="reset"
              value="Reset"
              onClick={resetHandle}
              className="btn btn-warning btn-sm mx-1"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminPanel;
