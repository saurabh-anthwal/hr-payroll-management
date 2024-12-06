import React, { useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import ConfirmationModal from "../../Modal/ConfirmationModal";

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
  active,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true); // Open the modal when delete button is clicked
  };

  const handleConfirmDelete = () => {
    console.log(`Deleting employee ${employee_name} with ID ${emp_id}`);
    setIsModalOpen(false); // Close the modal after confirmation
    // Perform the delete action (e.g., API call)
  };

  const handleCancelDelete = () => {
    setIsModalOpen(false); // Close the modal if the action is canceled
  };

  return (
    <>
      <tr className="border-b border-gray-200">
        <td className="py-3 px-2">{emp_id}</td>
        <td className="py-3 px-2">{employee_name}</td>
        <td className="py-3 px-2">{email}</td>
        <td className="py-3 px-2">{contact}</td>
        <td className="py-3 px-2">{gender}</td>
        <td className="py-3 px-2">{date_of_hired}</td>
        <td className="py-3 px-2">{date_of_joined}</td>
        <td className="py-3 px-2">{address}</td>
        <td className="py-3 px-2">
          <img
            src={"https://storage.googleapis.com/a1aa/image/fM4bjeZeUVEdlp65TEuJT7c7VaheI9jMDLnNOejMHijfZ9y9E.jpg" || profile_pic}
            alt="Profile"
            className="h-10"
          />
        </td>
        <td className="py-3 px-2">
          {active ? <span className="text-green-500">Active</span> : <span className="text-red-500">Inactive</span>}
        </td>
        <td className="py-3 px-2 text-red-400 hover:text-red-600 text-lg cursor-pointer" onClick={handleDeleteClick}>
          <AiTwotoneDelete />
        </td>
      </tr>

      {/* Reusable Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title={`Delete Employee: ${employee_name}`}
        message={`Are you sure you want to delete the record of ${employee_name}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}

export default EmployeesTableRow;
