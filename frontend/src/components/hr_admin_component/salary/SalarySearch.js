import React, { useState } from "react";
import "./SalarySearch.css";

function SalarySearch({ setSalaryData }) {
  const [input, setInput] = useState({
    paidStatus: "",
    fullName: "",
    department: "",
  });

  const submitHandle = async (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(input).toString();
    const url = `http://127.0.0.1:8000/api/monthly-salary/${
      queryParams ? `?${queryParams}` : ""
    }`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setSalaryData(data);
    } catch (error) {
      console.error("Failed to fetch salary data:", error);
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
