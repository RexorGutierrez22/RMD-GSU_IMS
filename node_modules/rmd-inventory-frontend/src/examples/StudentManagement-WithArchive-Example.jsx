// Sample code for integrating the DeleteWithArchiveModal into your Student list page

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteWithArchiveModal from '../components/DeleteWithArchiveModal';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    studentId: null,
    studentName: ''
  });
  
  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8001/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, []);
  
  const handleDeleteClick = (student) => {
    setDeleteModal({
      isOpen: true,
      studentId: student.id,
      studentName: `${student.first_name} ${student.last_name}`
    });
  };
  
  const handleDeleteSuccess = () => {
    // Refresh the student list
    setStudents(students.filter(student => student.id !== deleteModal.studentId));
  };
  
  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      studentId: null,
      studentName: ''
    });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      
      {/* Students Table */}
      {loading ? (
        <p>Loading students...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.first_name} {student.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.student_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{student.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => handleDeleteClick(student)}
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
                  No students found
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
        recordId={deleteModal.studentId}
        recordType="student"
        recordName={deleteModal.studentName}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
};

export default StudentManagement;
