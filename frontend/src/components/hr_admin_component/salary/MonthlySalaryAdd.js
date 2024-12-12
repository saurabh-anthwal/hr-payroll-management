import React, { useState, useEffect } from 'react';
import axios_instance from '../../../libs/interseptor';
import apiUrls from '../../../libs/apiUrls';

function SalaryDetailsComponent() {
  const [userDetails, setUserDetails] = useState([]);
  const [salaryUserDetails, setSalaryUserDetails] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [salaryId, setSalaryId] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [totalSalary, setTotalSalary] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [balanceAmount, setBalanceAmount] = useState('');
  const [paidStatus, setPaidStatus] = useState('false');
  const [paidDate, setPaidDate] = useState('');
  const [paymentDueDate, setPaymentDueDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePaidAmountChange = (value) => {
    setPaidAmount(value);
    const balance = totalSalary - value;
    setBalanceAmount(balance > 0 ? balance : 0);
  };


  const handleFetchSalary = async () => {
    if (!employeeId || !salaryId || !fromDate || !toDate || !totalSalary || paidStatus === '' || !paymentDueDate) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        user: employeeId,
        salary: salaryId,
        from_date: fromDate,
        to_date: toDate,
        total_salary: totalSalary,
        paid_amount: paidAmount,
        balance_amount: balanceAmount,
        paid_status: paidStatus === 'true',
        paid_date: paidStatus === 'true' ? paidDate : null,
        payment_due_date: paymentDueDate,
      };

      const response = await axios_instance.post(apiUrls.MONTHLY_SALARY_STATUS, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if(response.status == 201){
        alert("Monthly Salary Added Successfully!")
      }
    } catch (error) {
      setError('Failed to fetch salary details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios_instance.get(apiUrls.USER_FIND, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          const verifiedUsers = response.data.filter((user) => user.otp_verified === true);
          setUserDetails(verifiedUsers);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchSalaryUser = async () => {
      try {
        const response = await axios_instance.get(apiUrls.ALL_EMPLOYEE_SALARY_DETAILS, {
          headers: { "Content-Type": "application/json" },
        });
        if (response.status === 200) {
          setSalaryUserDetails(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    fetchUsers();
    fetchSalaryUser()
  }, []);

  return (
    <div className="bg-white p-6">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Employee ID <span className="text-red-500">*</span>
        </label>
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="selectInput"
        >
          <option value="" disabled>Select Employee by Email</option>
          {userDetails.map((user) => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Salary ID <span className="text-red-500">*</span>
        </label>
        <select
          value={salaryId}
          onChange={(e) => setSalaryId(e.target.value)}
          className="selectInput"
        >
          <option value="" disabled>Select Salary Id by Email</option>
          {salaryUserDetails.map((user) => (
            <option key={user.id} value={user.id}>{user.employee_email}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          From Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          To Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Total Salary <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={totalSalary}
          onChange={(e) => setTotalSalary(e.target.value)}
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Paid Amount
        </label>
        <input
          type="number"
          value={paidAmount}
          onChange={(e) => handlePaidAmountChange(e.target.value)}
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Balance Amount
        </label>
        <input
          type="number"
          value={balanceAmount}
          readOnly
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Payment Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={paymentDueDate}
          onChange={(e) => setPaymentDueDate(e.target.value)}
          className="customTextInput"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Paid Status <span className="text-red-500">*</span>
        </label>
        <select
          value={paidStatus}
          onChange={(e) => setPaidStatus(e.target.value)}
          className="selectInput"
        >
          <option value="false">Unpaid</option>
          <option value="true">Paid</option>
        </select>
      </div>

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

      <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            className="formCancelBtn"
          >
            Reset
          </button>
        <button
          onClick={handleFetchSalary}
          disabled={loading}
          className="formSubmitBtn"
        >
          {loading ? 'Submiting...' : 'Submit'}
        </button>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
    </div>
  );
}

export default SalaryDetailsComponent;
