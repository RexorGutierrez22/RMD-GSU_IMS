// Sample code for integrating the DeleteWithArchiveModal into your Employee list page

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteWithArchiveModal from '../components/DeleteWithArchiveModal';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employeeId: null,
    employeeName: ''
  });
  
  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEmployees();
  }, []);
  
  const handleDeleteClick = (employee) => {
    setDeleteModal({
      isOpen: true,
      employeeId: employee.id,
      employeeName: `${employee.first_name} ${employee.last_name}`
    });
  };
  
  const handleDeleteSuccess = () => {
    // Refresh the employee list
    setEmployees(employees.filter(employee => employee.id !== deleteModal.employeeId));
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      employeeId: null,
      employeeName: ''
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      
      {/* Employees Table */}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.length > 0 ? (
              employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {employee.first_name} {employee.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.employee_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{employee.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDeleteClick(employee)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      
      {/* Delete with Archive Modal */}
      <DeleteWithArchiveModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        recordId={deleteModal.employeeId}
        recordType="employee"
        recordName={deleteModal.employeeName}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default EmployeeManagement;
