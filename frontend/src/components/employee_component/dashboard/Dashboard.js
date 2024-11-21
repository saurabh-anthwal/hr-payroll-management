import React, { useState } from "react";
import "./EmployeeDashboard.css";
import { FaUser, FaRegCalendarAlt, FaRegMoneyBillAlt, FaRegListAlt } from "react-icons/fa";
import EmployeeNavbar from "../navbar/Navbar";
const EmployeeDashboard = ({ employee = {} }) => {
    const [activeTab, setActiveTab] = useState("dashboard");

    // Employee general details
    const {
        name = "John Doe",
        attendance = "95%",
        leaveTaken = 5,
        totalLeave = 12,
        joiningDate = "2020-01-15",
        dob = "1990-05-25",
        designation = "Software Engineer",
        holidays = ["2024-01-01", "2024-03-10", "2024-12-25"],
        basicSalary = 3000,
        hra = 500,
        da = 300,
        pfContribution = 360,
        esiContribution = 150,
        joiningBonus = 1000,
        appraisal = 500,
        annualBonus = 2000,
        healthInsurance = true,
        otherBenefits = "Paid Time Off, Maternity Leave",
    } = employee;

    const grossSalary = basicSalary + hra + da;
    const netSalary = grossSalary - pfContribution - esiContribution;

    const renderContent = () => {
        switch (activeTab) {
            case "dashboard":
                return (
                    <div className="employee-info">
                        <h3>Employee Dashboard</h3>
                        <div className="info-box">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{name}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Designation:</span>
                            <span className="info-value">{designation}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Date of Birth:</span>
                            <span className="info-value">{dob}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Joining Date:</span>
                            <span className="info-value">{joiningDate}</span>
                        </div>
                    </div>
                );
            case "salary":
                return (
                    <div className="salary-section">
                        <h3>Salary Details</h3>
                        <div className="info-box">
                            <span className="info-label">Basic Salary:</span>
                            <span className="info-value">${basicSalary}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">HRA:</span>
                            <span className="info-value">${hra}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">DA:</span>
                            <span className="info-value">${da}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Gross Salary:</span>
                            <span className="info-value">${grossSalary}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Net Salary:</span>
                            <span className="info-value">${netSalary}</span>
                        </div>
                    </div>
                );
            case "holidays":
                return (
                    <div className="holidays-section">
                        <h3>Upcoming Holidays</h3>
                        <ul className="holidays-list">
                            {holidays.map((holiday, index) => (
                                <li key={index} className="holiday-item">
                                    {holiday}
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case "profile":
                return (
                    <div className="employee-profile">
                        <h3>Profile Details</h3>
                        <div className="info-box">
                            <span className="info-label">Name:</span>
                            <span className="info-value">{name}</span>
                        </div>
                        <div className="info-box">
                            <span className="info-label">Designation:</span>
                            <span className="info-value">{designation}</span>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
        <EmployeeNavbar/>
        <div className="dashboard-container">
            <h2 className="dashboard-heading">Employee Dashboard</h2>
            <div className="card-container">
                <div className={`card ${activeTab === "dashboard" ? "active" : ""}`} onClick={() => setActiveTab("dashboard")}>
                    <FaRegListAlt className="card-icon" />
                    Employee Dashboard
                </div>

                <div className={`card ${activeTab === "salary" ? "active" : ""}`} onClick={() => setActiveTab("salary")}>
                    <FaRegMoneyBillAlt className="card-icon" />
                    Salary Details
                </div>

                <div className={`card ${activeTab === "holidays" ? "active" : ""}`} onClick={() => setActiveTab("holidays")}>
                    <FaRegCalendarAlt className="card-icon" />
                    Upcoming Holidays
                </div>

                <div className={`card ${activeTab === "profile" ? "active" : ""}`} onClick={() => setActiveTab("profile")}>
                    <FaUser className="card-icon" />
                    Profile
                </div>
            </div>
            <div className="content-container">{renderContent()}</div>
        </div>
        </>
    );
};

export default EmployeeDashboard;
