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
    <table className="w-full text-sm text-center text-gray-500 border border-gray-200 mt-6">
  <thead className="text-xs uppercase bg-gray-200 text-gray-700">
    <tr>
      <th className="py-3 px-2 w-[6%]">E_Id</th>
      <th className="py-3 px-2 w-[8%]">Name</th>
      <th className="py-3 px-2 w-[12%]">Email</th>
      <th className="py-3 px-2 w-[10%]">Contact</th>
      <th className="py-3 px-2 w-[8%]">Gender</th>
      <th className="py-3 px-2 w-[8%]">Hired_D</th>
      <th className="py-3 px-2 w-[8%]">Joined_D</th>
      <th className="py-3 px-2 w-[14%]">Address</th>
      <th className="py-3 px-2 w-[10%]">Profile Pic</th>
      <th className="py-3 px-2 w-[8%]">Active</th>
      <th className="py-3 px-2 w-[4%]"></th>
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
