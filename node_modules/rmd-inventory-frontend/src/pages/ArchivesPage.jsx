import React, { useState } from 'react';
import ArchiveViewer from '../components/ArchiveViewer';

const ArchivesPage = () => {
  const [activeTab, setActiveTab] = useState('students');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Archives</h1>
        <p className="text-gray-500 mt-1">
          View and manage archived records from the system
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('students')}
            className={`${
              activeTab === 'students'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Students Archives
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`${
              activeTab === 'employees'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Employees Archives
          </button>
        </nav>
      </div>

      {/* Archive Content */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {activeTab === 'students' ? (
          <ArchiveViewer type="students" />
        ) : (
          <ArchiveViewer type="employees" />
        )}
      </div>

      {/* Information Panel */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-800">About Archives</h3>
        <p className="mt-2 text-sm text-blue-700">
          The archive system stores records of deleted students and employees. 
          These records are kept for historical and auditing purposes.
          The original primary IDs are preserved in the archive to maintain
          reference integrity and traceability.
        </p>
      </div>
    </div>
  );
};

export default ArchivesPage;
