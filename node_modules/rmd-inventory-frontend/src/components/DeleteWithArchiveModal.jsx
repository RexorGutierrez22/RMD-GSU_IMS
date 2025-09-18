import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';

const DeleteWithArchiveModal = ({ 
  isOpen, 
  onClose, 
  recordId, 
  recordType,  // 'student' or 'employee'
  recordName,  // Display name of the record 
  onSuccess 
}) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!reason.trim()) {
      setError('Please provide a reason for deletion');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Authentication required. Please log in again.');
        setLoading(false);
        return;
      }

      // Call appropriate API endpoint
      const endpoint = `http://127.0.0.1:8001/api/records/${recordType}s/${recordId}`;
      
      await axios.delete(endpoint, {
        data: { reason },
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error deleting record:', err);
      setError(err.response?.data?.message || 'Failed to delete record');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Delete ${recordType === 'student' ? 'Student' : 'Employee'}`}>
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-700 mb-2">
            You are about to delete <strong>{recordName}</strong>. This record will be archived before deletion.
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Please provide a reason for this deletion. This will help with record-keeping and auditing.
          </p>
          
          <div className="mb-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for deletion
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
              rows="3"
              placeholder="Enter reason for deletion"
            ></textarea>
            {error && (
              <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
          </div>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {loading ? 'Processing...' : 'Delete Record'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteWithArchiveModal;
