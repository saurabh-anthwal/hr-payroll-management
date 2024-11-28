import React, { useState, useContext } from "react";

function SearchEmployee() {
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    department: "",
    designation: "",
    gender: "",
  });

  const inputHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
  
    // Get the token for Authorization
    const token = localStorage.getItem("accessToken");
  
    // Construct query parameters for the fetch URL
    const queryParams = new URLSearchParams({
      firstname: input.firstname,
      lastname: input.lastname,
      department: input.department,
      designation: input.designation,
      gender: input.gender,
    }).toString();
  
    fetch(`http://127.0.0.1:8000/api/employee/?${queryParams}`, {
      headers: {
        "Authorization": `Bearer ${token}`,  // Add the token in the Authorization header
      },
    })
      .then((response) => response.json())
      .then((data) => {
       // Update the context with the fetched employees data
      })
      .catch((error) => {
        console.error("Failed to fetch employees:", error);
      });
  };
  

  return (
    <form id="employee-search-form" className="input-group">
      <label htmlFor="employee-search-input" className="input-group-text">
        Employee :
      </label>
      <input
        type="text"
        placeholder="Firstname"
        id="employee-search-input"
        name="firstname"
        onChange={inputHandle}
        className="form-control"
      />
      <input
        type="text"
        placeholder="Lastname"
        name="lastname"
        onChange={inputHandle}
        className="form-control"
      />
      <input
        type="text"
        placeholder="department"
        className="form-control"
        name="department"
        onChange={inputHandle}
      />
      <input
        type="text"
        placeholder="designation"
        className="form-control"
        name="designation"
        onChange={inputHandle}
      />
      <select
        className="form-select"
        id="employee-search-gender"
        name="gender"
        defaultValue={""}
        onChange={inputHandle}
      >
        <option value="">Gender...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="transgender">Transgender</option>
      </select>
      <input
        type="submit"
        value="SUBMIT"
        className="btn"
        onClick={submitHandle}
      />
    </form>
  );
}
export default SearchEmployee;
