import React, {useState, useEffect } from "react";
import apiUrls from "../../../libs/apiUrls";
import axios_instance from "../../../libs/interseptor";
import EmployeesTableRow from "./EmployeesTableRow";

function EmployeesTable() {
  const token = localStorage.getItem("accessToken");
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const abc = async() => {
      try {
        const response = await axios_instance.get(apiUrls.ALL_EMPLOYEE_DETAILS);
        setEmployees(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch salary details:", error);
        setIsLoading(false);
      }
    }
    abc()
  }, [token]);
  

  return (
    <table className="employees-table table table-hover bg-light shadow text-sm ">
  <thead>
    <tr>
      <th className="py-2 pl-2">E_Id</th>
      <th className="py-2 pl-2">Name</th>
      <th className="py-2 pl-2">Email</th>
      <th className="py-2 pl-2">Contact</th>
      <th className="py-2 pl-2">Gender</th>
      <th className="py-2 pl-2">Hired_D</th>
      <th className="py-2 pl-2">Joined_D</th>
      <th className="py-2 pl-2">Address</th>
      <th className="py-2 pl-2">Profile Pic</th>
      <th className="py-2 pl-2">Active</th>
    </tr>
  </thead>
  <tbody className="employees-tbody">
    {employees && employees.length > 0 &&
      employees.map((e, i) => (
        <EmployeesTableRow
          key={e.id}
          emp_id={e.id}
          employee_name={`${e.firstname} ${e.lastname}`}
          email={e.email}
          contact={e.contact}
          gender={e.gender}
          date_of_hired={e.dateOfHired}
          date_of_joined={e.dateOfJoined}
          address={e.address}
          profile_pic={e.profilePic}
          active={e.active}
        />
      ))
    }
  </tbody>
</table>

  );
}
export default EmployeesTable;
