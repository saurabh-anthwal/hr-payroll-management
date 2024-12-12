import React, { useEffect, useState } from 'react';
import apiUrls from '../../../libs/apiUrls';
import axios_instance from '../../../libs/interseptor';

const EmployBankDetailLoginUser = () => {
  const [salaryData, setSalaryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the salary data from API
  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await axios_instance.get(apiUrls.LOGIN_EMP_BANK_DETAILS);
        if (!response.status == 200) {
          throw new Error('Failed to fetch data');
        }

        setSalaryData(response?.data);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryData();
  }, []);

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error) return <div className="text-center text-xl text-red-600">Error: {error}</div>;

  const bankDetails = salaryData;

  if (!salaryData) return <div className="text-center text-xl">No bank details found.</div>;

  return (
<div className="p-8 bg-white">
  <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Bank Details</h2>

  <div className="space-y-6">
    <div className="flex items-center justify-between border-b pb-4">
      <span className="text-sm font-semibold text-gray-600">Account Holder Name</span>
      <span className="text-lg text-gray-900">{bankDetails?.account_holder_name}</span>
    </div>

    <div className="flex items-center justify-between border-b pb-4">
      <span className="text-sm font-semibold text-gray-600">Account Number</span>
      <span className="text-lg text-gray-900">{bankDetails?.account_number}</span>
    </div>

    <div className="flex items-center justify-between border-b pb-4">
      <span className="text-sm font-semibold text-gray-600">IFSC Code</span>
      <span className="text-lg text-gray-900">{bankDetails?.ifsc_code}</span>
    </div>

    <div className="flex items-center justify-between border-b pb-4">
      <span className="text-sm font-semibold text-gray-600">Bank Name</span>
      <span className="text-lg text-gray-900">{bankDetails?.bank_name}</span>
    </div>

    <div className="flex items-center justify-between">
      <span className="text-sm font-semibold text-gray-600">Branch Name</span>
      <span className="text-lg text-gray-900">{bankDetails?.branch_name || "N/A"}</span>
    </div>
  </div>
</div>

  );
};

export default EmployBankDetailLoginUser;
