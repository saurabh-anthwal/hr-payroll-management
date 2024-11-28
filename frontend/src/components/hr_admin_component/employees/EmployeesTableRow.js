import React from "react";
import { Link } from "react-router-dom";

function EmployeesTableRow({
  srno,
  emp_id,
  employee_name,
  department,
  designation,
  gender,
  date_of_hired,
  date_of_joined,
}) {
  return (
    <tr>
      <th scope="row">{srno}</th>
      <td>{emp_id}</td>
      <td>{employee_name}</td>
      <td>{department}</td>
      <td>{designation}</td>
      <td>{gender}</td>
      <td>{date_of_hired}</td>
      <td>{date_of_joined}</td>
      <td>
        <Link to={`/update-employee/${emp_id}`} title="Edit">
          ✏️
        </Link>
      </td>
    </tr>
  );
}

export default EmployeesTableRow;
