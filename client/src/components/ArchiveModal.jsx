import React, { useState } from 'react';
import axios from 'axios';

const ArchiveModal = ({ isOpen, onClose, recordId, recordName, recordType, onSuccess }) => {
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleArchive = async () => {
    if (!reason.trim()) {
      setError('Please provide a reason for archiving.');
      return;
    }

    setLoading(true);
    try {
      // Get the correct API endpoint based on record type
      const endpoint = recordType === 'student'
        ? `http://127.0.0.1:8001/api/archive/students/${recordId}`
        : `http://127.0.0.1:8001/api/archive/employees/${recordId}`;

      await axios.delete(endpoint, {
        data: { reason },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Error archiving record:', err);
      setError('Failed to archive record. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg shadow-xl max-w-md mx-auto p-6 w-full">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">
            Archive {recordType === 'student' ? 'Student' : 'Employee'} Record
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <span className="sr-only">Close</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            You are about to archive {recordName}. This record will be moved to the archive and 
            removed from the active records. This action cannot be undone easily.
          </p>

          <div className="mt-4">
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
              Reason for Archiving
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="3"
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              placeholder="Please provide a reason for archiving this record"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleArchive}
            disabled={loading}
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Archiving...
              </>
            ) : (
              'Archive Record'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArchiveModal;
