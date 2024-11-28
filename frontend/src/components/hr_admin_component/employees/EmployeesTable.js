import React, {useState, useEffect } from "react";
import EmployeesTableRow from "./EmployeesTableRow";

function EmployeesTable() {
  const token = localStorage.getItem("accessToken");
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/employee/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [token]);
  

  return (
    <table className="employees-table table table-hover bg-light shadow">
      <thead>
        <tr>
          <th scope="col">SrNo</th>
          <th scope="col">Employee Id</th>
          <th scope="col" className="w-25">
            Employee Name
          </th>
          <th scope="col">Department</th>
          <th scope="col">Designation</th>
          <th scope="col">Gender</th>
          <th scope="col">Date Of Hired</th>
          <th scope="col">Date Of Joined</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="employees-tbody">
      {employees && employees.length > 0 ? 
            employees.map((e, i) => (
              <EmployeesTableRow
                key={e.id}
                srno={i + 1}
                emp_id={e.id}
                employee_name={`${e.firstname} ${e.lastname}`}
                department={e.department}
                designation={e.designation}
                gender={e.gender}
                date_of_hired={e.dateOfHired}
                date_of_joined={e.dateOfJoined}
              />
            ))
           :
            <tr>
              <td colSpan="9" className="text-center">
                No Records Found
              </td>
            </tr>
          }

          <tr>
            <th colSpan="8" className="text-center">
              No Records Found
            </th>
          </tr>
      </tbody>
    </table>
  );
}
export default EmployeesTable;
