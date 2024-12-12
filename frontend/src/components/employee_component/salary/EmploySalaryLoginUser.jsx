import React, { useEffect, useState } from "react";
import axios_instance from "../../../libs/interseptor";
import apiUrls from "../../../libs/apiUrls";

const EmploySalaryLoginUser = () => {
  const [salaryDetails, setSalaryDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalaryDetails = async () => {
      try {
        const response = await axios_instance.get(apiUrls.LOGIN_EMP_SALARY);
        setSalaryDetails(response?.data);
      } catch (err) {
        setError("Failed to fetch salary details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSalaryDetails();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
<div className="p-6 bg-white">
  {salaryDetails && (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">PPA:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.ppa}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">Monthly Salary:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.monthly_salary}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">Basic DA:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.basic_da}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">HRA:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.hra}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">Conveyance:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.conveyance}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">PF:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.pf}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">ESIC:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.esic}</span>
        </div>
        <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
          <span className="text-gray-600">Professional Tax:</span>
          <span className="text-gray-800 font-semibold">${salaryDetails.professional_tax}</span>
        </div>
      </div>
      <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
        <span className="text-gray-600">Net Salary:</span>
        <span className="text-gray-800 font-semibold">${salaryDetails.net_salary}</span>
      </div>
      <div className="flex justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
        <span className="text-gray-600">PAN Card Number:</span>
        <span className="text-gray-800 font-semibold">{salaryDetails.pan_card_number}</span>
      </div>
    </div>
  )}
</div>

  );
};

export default EmploySalaryLoginUser;
