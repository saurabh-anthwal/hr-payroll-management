import React, { useState, useEffect } from 'react';
import axios_instance from '../../../libs/interseptor';
import apiUrls from '../../../libs/apiUrls';

function SalaryDetailsComponent() {
  const [userDetails, setUserDetails] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [paidStatus, setPaidStatus] = useState('false'); // Default to 'Unpaid'
  const [paidDate, setPaidDate] = useState('');
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch Salary Details
  const handleFetchSalary = async () => {
    // Validate the form
    if (!employeeId || !fromDate || !toDate || paidStatus === '') {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        employee_id: employeeId,
        from_date: fromDate,
        to_date: toDate,
        paid_status: paidStatus === 'true',
        paid_date: paidStatus === 'true' ? paidDate : null, 
      };
      const response = await axios_instance.post(apiUrls.MONTHLY_SALARY_STATUS, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setSalaryDetails(response.data);
    } catch (error) {
      setError('Failed to fetch salary details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch verified users for the dropdown
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios_instance.get(apiUrls.USER_FIND, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const verifiedUsers = response.data.filter((user) => user.otp_verified === true);
          setUserDetails(verifiedUsers);
        }
      } catch (error) {
        console.error("Failed to get users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className=" bg-white p-6">
      {/* Employee Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Employee ID <span className="text-red-500">*</span>
        </label>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
        >
          <option value="" disabled>Select Employee by Email</option>
          {userDetails.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      {/* From Date Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          From Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* To Date Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          To Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
        />
      </div>

      {/* Paid Status Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Paid Status <span className="text-red-500">*</span>
        </label>
        <select
          value={paidStatus}
          onChange={(e) => setPaidStatus(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </select>
      </div>

      {/* Paid Date Input (only visible if Paid Status is 'true') */}
      {paidStatus === 'true' && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Paid Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={paidDate}
            onChange={(e) => setPaidDate(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none"
          />
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Fetch Salary Button */}
      <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="px-6 py-2 bg-gray-400 text-white rounded-md"
          >
            Reset
          </button>
      <button
        onClick={handleFetchSalary}
        className="px-6 py-2 bg-blue-600 text-white rounded-md"
        disabled={loading}
      >
        {loading ? 'Fetching...' : 'Submit'}
      </button>
      </div>

      {/* Display Salary Summary */}
      {salaryDetails && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Salary Summary</h3>
          <p><strong>Employee ID:</strong> {salaryDetails.employee_id}</p>
          <p><strong>Salary Period:</strong> {salaryDetails.from_date} to {salaryDetails.to_date}</p>
          <p><strong>Paid Status:</strong> {salaryDetails.paid_status ? 'Paid' : 'Not Paid'}</p>
          <p><strong>Paid Date:</strong> {salaryDetails.paid_date || 'N/A'}</p>
        </div>
      )}
    </div>
  );
}

export default SalaryDetailsComponent;
