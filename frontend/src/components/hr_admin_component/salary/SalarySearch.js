import React, { useState } from "react";
import "./SalarySearch.css";
import apiUrls from '../../../libs/apiUrls';
import axios_instance from "../../../libs/interseptor";

function SalarySearch({ setSalaryData }) {
  const [input, setInput] = useState({
    paidStatus: "",
    fullName: "",
    department: "",
  });

  // const submitHandle = async (e) => {
  //   e.preventDefault();
  
  //   const token = localStorage.getItem("accessToken");
  //   const queryParams = new URLSearchParams(input).toString();
  //   const url = `http://127.0.0.1:8000/api/monthly-salary/${
  //     queryParams ? `?${queryParams}` : ""
  //   }`;
  
  //   try {
  //     const response = await fetch(url, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setSalaryData(data);
  //   } catch (error) {
  //     console.error("Failed to fetch salary data:", error);
  //   }
  // };
  
  const submitHandle = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("accessToken");
    const queryParams = new URLSearchParams(input).toString();
  
    try {
      const response = await axios_instance.get(
        `${apiUrls.MONTHLY_SALARY_STATUS}${queryParams ? `?${queryParams}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "Fetched Salary Data");
      setSalaryData(response.data);
    } catch (error) {
      console.error("Failed to fetch salary details:", error);
    }
  };
  
  return (
    <form className="salary-search-form" onSubmit={submitHandle}>
      <div className="form-group">
        <label htmlFor="fullName">Employee Name:</label>
        <input
          type="text"
          id="fullName"
          placeholder="Search Employee"
          value={input.fullName}
          onChange={(e) => setInput({ ...input, fullName: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="department">Department:</label>
        <input
          type="text"
          id="department"
          placeholder="Enter Department"
          value={input.department}
          onChange={(e) => setInput({ ...input, department: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="paidStatus">Salary Status:</label>
        <select
          id="paidStatus"
          value={input.paidStatus}
          onChange={(e) => setInput({ ...input, paidStatus: e.target.value })}
        >
          <option value="">All</option>
          <option value="1">Paid</option>
          <option value="0">Unpaid</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Search
      </button>
    </form>
  );
}

export default SalarySearch;
