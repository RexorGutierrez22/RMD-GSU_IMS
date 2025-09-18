import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArchiveViewer = ({ type }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8001/api/archive/${type}`);
        setRecords(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${type} archives:`, err);
        setError(`Failed to load archived ${type}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, [type]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700">
        <p className="font-medium">Error</p>
        <p>{error}</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200 text-gray-700 text-center">
        <p>No archived {type} found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID (Original)
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {type === 'students' ? 'Department/Year' : 'Department/Position'}
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Deleted At
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Reason
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {record.original_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {`${record.first_name} ${record.middle_name ? record.middle_name + ' ' : ''}${record.last_name}`}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.contact || 'N/A'}
                <br />
                {record.email || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {record.department || 'N/A'}
                <br />
                {type === 'students' 
                  ? `${record.year_level || 'N/A'} - ${record.section || 'N/A'}`
                  : record.position || 'N/A'
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(record.deleted_at)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {record.delete_reason || 'No reason provided'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArchiveViewer;
