import React from "react";
import { Link } from "react-router-dom";

function EmployeesTableRow({
  emp_id,
  employee_name,
  email,
  contact,
  gender,
  date_of_hired,
  date_of_joined,
  address,
  profile_pic,
  active
}) {
  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-4 py-2 text-left">{emp_id}</td>
      <td className="px-4 py-2 text-left">{employee_name}</td>
      <td className="px-4 py-2 text-left">{email}</td>
      <td className="px-4 py-2 text-left">{contact}</td>
      <td className="px-4 py-2 text-left">{gender}</td>
      <td className="px-4 py-2 text-left">{date_of_hired}</td>
      <td className="px-4 py-2 text-left">{date_of_joined}</td>
      <td className="px-4 py-2 text-left">{address}</td>
      <td className="px-4 py-2 text-left">
        <img src={"https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg" || profile_pic} alt="Profile" className="h-10" />
      </td>
      <td className="px-4 py-2 text-left">
        {active ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red-500">Inactive</span>
        )}
      </td>
    </tr>
  );
}

export default EmployeesTableRow;