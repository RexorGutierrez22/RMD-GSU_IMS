import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const UserAccess = ({ standalone = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('students');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Form state for user creation/editing
  const [userForm, setUserForm] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    role: 'student',
    studentId: '',
    employeeId: '',
    department: '',
    course: '',
    yearLevel: '',
    status: 'active'
  });

  // Sample data - replace with API calls
  const [users, setUsers] = useState({
    students: [
      {
        id: 'STU001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@student.usep.edu.ph',
        username: 'johndoe',
        studentId: '2021-00001',
        course: 'Computer Science',
        yearLevel: '4th Year',
        department: 'College of Engineering',
        status: 'active',
        dateCreated: '2024-01-15'
      },
      {
        id: 'STU002',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@student.usep.edu.ph',
        username: 'janesmith',
        studentId: '2022-00005',
        course: 'Information Technology',
        yearLevel: '3rd Year',
        department: 'College of Engineering',
        status: 'active',
        dateCreated: '2024-01-16'
      }
    ],
    employees: [
      {
        id: 'EMP001',
        firstName: 'Maria',
        lastName: 'Garcia',
        email: 'maria.garcia@usep.edu.ph',
        username: 'mariagarcia',
        employeeId: 'EMP-2023-001',
        department: 'Registrar Office',
        position: 'Records Officer',
        status: 'active',
        dateCreated: '2024-01-10'
      }
    ],
    admins: [
      {
        id: 'ADM001',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@usep.edu.ph',
        username: 'admin',
        role: 'admin',
        department: 'IT Department',
        permissions: ['dashboard', 'inventory', 'users'],
        status: 'active',
        dateCreated: '2024-01-01'
      }
    ]
  });

  // Super Admin login credentials
  const SUPER_ADMIN_CREDENTIALS = {
    username: 'superadmin',
    password: 'password'
  };

  useEffect(() => {
    // Check if already logged in (from localStorage)
    const savedAuth = localStorage.getItem('superAdminAuth');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (loginForm.username === SUPER_ADMIN_CREDENTIALS.username && 
        loginForm.password === SUPER_ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('superAdminAuth', 'true');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('superAdminAuth');
    setLoginForm({ username: '', password: '' });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    
    if (modalType === 'add') {
      // Create new user
      const newUser = {
        ...userForm,
        id: `${userForm.role.toUpperCase().substring(0, 3)}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      
      setUsers(prev => ({
        ...prev,
        [userForm.role === 'admin' ? 'admins' : userForm.role === 'employee' ? 'employees' : 'students']: [
          ...prev[userForm.role === 'admin' ? 'admins' : userForm.role === 'employee' ? 'employees' : 'students'],
          newUser
        ]
      }));
    } else {
      // Update existing user
      const targetArray = editingUser.role === 'admin' ? 'admins' : editingUser.role === 'employee' ? 'employees' : 'students';
      setUsers(prev => ({
        ...prev,
        [targetArray]: prev[targetArray].map(user => 
          user.id === editingUser.id ? { ...userForm, id: editingUser.id, dateCreated: editingUser.dateCreated } : user
        )
      }));
    }

    // Reset form and close modal
    setShowModal(false);
    setEditingUser(null);
    setUserForm({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      role: 'student',
      studentId: '',
      employeeId: '',
      department: '',
      course: '',
      yearLevel: '',
      status: 'active'
    });
  };

  const handleEdit = (user, userType) => {
    setEditingUser({ ...user, role: userType });
    setUserForm({ ...user, role: userType });
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = (userId, userType) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      const targetArray = userType === 'admin' ? 'admins' : userType === 'employee' ? 'employees' : 'students';
      setUsers(prev => ({
        ...prev,
        [targetArray]: prev[targetArray].filter(user => user.id !== userId)
      }));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'suspended': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterUsers = (userList) => {
    if (!searchTerm) return userList;
    return userList.filter(user => 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.studentId && user.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.employeeId && user.employeeId.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  // Login Form Component
  if (!isAuthenticated) {
    return (
      <div className={standalone ? "min-h-screen bg-gray-50" : "bg-gray-50"}>
        {standalone && <Header title="Super Admin Access" />}
        
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Super Admin Access
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Sign in to manage all system users
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleLogin}>
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="username" className="sr-only">Username</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                    className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Password"
                  />
                </div>
              </div>

              {loginError && (
                <div className="text-red-600 text-sm text-center">{loginError}</div>
              )}

              <div className="text-xs text-gray-500 text-center bg-gray-100 p-2 rounded">
                <strong>Default Credentials:</strong><br />
                Username: superadmin<br />
                Password: password
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {standalone && <Footer />}
      </div>
    );
  }

  // Main User Management Interface
  return (
    <div className={standalone ? "min-h-screen bg-gray-50" : "bg-gray-50"}>
      {standalone && <Header title="User Management" />}
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage all system users and create admin accounts</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setModalType('add');
                setUserForm({
                  id: '',
                  firstName: '',
                  lastName: '',
                  email: '',
                  username: '',
                  password: '',
                  role: 'student',
                  studentId: '',
                  employeeId: '',
                  department: '',
                  course: '',
                  yearLevel: '',
                  status: 'active'
                });
                setShowModal(true);
              }}
              className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="relative">
            <svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search users by name, email, username, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              {[
                { key: 'students', name: 'Students', count: users.students.length },
                { key: 'employees', name: 'Employees', count: users.employees.length },
                { key: 'admins', name: 'Admins', count: users.admins.length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 text-sm font-medium border-b-2 flex items-center gap-2 ${
                    activeTab === tab.key
                      ? 'border-red-500 text-red-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.key
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </nav>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {activeTab === 'students' ? 'Academic Info' : activeTab === 'employees' ? 'Employment Info' : 'Role Info'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filterUsers(users[activeTab]).map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {user.firstName[0]}{user.lastName[0]}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        {activeTab === 'students' ? `ID: ${user.studentId}` : 
                         activeTab === 'employees' ? `ID: ${user.employeeId}` : 
                         `Role: ${user.role}`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {activeTab === 'students' ? user.course :
                         activeTab === 'employees' ? user.position :
                         user.department}
                      </div>
                      <div className="text-sm text-gray-500">
                        {activeTab === 'students' ? `${user.yearLevel} - ${user.department}` :
                         activeTab === 'employees' ? user.department :
                         user.permissions ? user.permissions.join(', ') : 'No permissions'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(user, activeTab.slice(0, -1))}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user.id, activeTab.slice(0, -1))}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Add/Edit User */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {modalType === 'add' ? 'Add New User' : 'Edit User'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleUserSubmit} className="space-y-4">
                {/* User Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Role *</label>
                  <select
                    required
                    value={userForm.role}
                    onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="student">Student</option>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin/Staff</option>
                  </select>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.firstName}
                      onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={userForm.lastName}
                      onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      required
                      value={userForm.email}
                      onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                    <input
                      type="text"
                      required
                      value={userForm.username}
                      onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>

                {modalType === 'add' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                    <input
                      type="password"
                      required
                      value={userForm.password}
                      onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                )}

                {/* Role-specific fields */}
                {userForm.role === 'student' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID *</label>
                        <input
                          type="text"
                          required
                          value={userForm.studentId}
                          onChange={(e) => setUserForm({...userForm, studentId: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
                        <input
                          type="text"
                          required
                          value={userForm.course}
                          onChange={(e) => setUserForm({...userForm, course: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year Level *</label>
                        <select
                          required
                          value={userForm.yearLevel}
                          onChange={(e) => setUserForm({...userForm, yearLevel: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        >
                          <option value="">Select Year Level</option>
                          <option value="1st Year">1st Year</option>
                          <option value="2nd Year">2nd Year</option>
                          <option value="3rd Year">3rd Year</option>
                          <option value="4th Year">4th Year</option>
                          <option value="5th Year">5th Year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                        <input
                          type="text"
                          required
                          value={userForm.department}
                          onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {userForm.role === 'employee' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
                      <input
                        type="text"
                        required
                        value={userForm.employeeId}
                        onChange={(e) => setUserForm({...userForm, employeeId: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                      <input
                        type="text"
                        required
                        value={userForm.department}
                        onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                )}

                {userForm.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <input
                      type="text"
                      required
                      value={userForm.department}
                      onChange={(e) => setUserForm({...userForm, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={userForm.status}
                    onChange={(e) => setUserForm({...userForm, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingUser(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                  >
                    {modalType === 'add' ? 'Add User' : 'Update User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {standalone && <Footer />}
    </div>
  );
};

export default UserAccess;
