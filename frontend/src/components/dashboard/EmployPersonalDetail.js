import React from "react";


const EmployPersonalDetail = ({employeeDetails}) => {
  const stylecss = {
    label:"col-span-2 font-bold text-gray-600",
    val:"col-span-4 text-gray-500"
  }

  return (
 <div className="w-full bg-white col-span-2 rounded-lg shadow mb-8">
      <div className="flex justify-between rounded-t-lg bg-blue-400 items-center mb-2 pt-3 border-b pl-8 pr-8">
        <h2 className="text-lg font-semibold text-white mb-3">Personal Details</h2>
      </div>
      <div className="pb-8">
      
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>First Name</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.firstname || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Last Name</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.lastname || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Email</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.email || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Phone Number</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.contact || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Gender</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.gender || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Date of Birth</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.dob || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Address</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.address || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Department</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.department || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Designation</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.designation || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 border-b px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Date of Hired</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.dateOfHired || "N/A"}</div>
        </div>
        <div className="grid grid-cols-6 px-5 py-[12px]">
          <div className={`${stylecss.label}`}>Date of Joined</div>
          <div className="col-span-4 text-gray-500">{employeeDetails?.dateOfJoined || "N/A"}</div>
        </div>
      </div>
    </div>
  );
};

export default EmployPersonalDetail;
