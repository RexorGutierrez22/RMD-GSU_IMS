import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

const UserAccessDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Debug log to verify component is loading
  console.log('🔍 UserAccessDashboard component loaded - Modern UI should be visible');
  console.log('🔐 isAuthenticated:', isAuthenticated);
  
  const [students, setStudents] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // CRUD Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'create', 'edit', 'view', 'delete'
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  // Handle super admin login
  const handleSuperAdminLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');

    try {
      // Try database authentication first
      const response = await fetch('http://127.0.0.1:8001/api/dashboard/super-admin/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })
      });

      const data = await response.json();

      if (data.success) {
        // Database authentication successful
        localStorage.setItem('super_admin_access', 'true');
        localStorage.setItem('super_admin_info', JSON.stringify(data.admin));
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        // Fallback to hardcoded credentials (hidden in code for security)
        if ((loginForm.username === 'superadmin' && loginForm.password === 'admin123') ||
            (loginForm.username === 'Rexor22' && loginForm.password === import.meta.env.VITE_ADMIN_PASSWORD) ||
            (loginForm.username === 'RMD_Staff' && loginForm.password === import.meta.env.VITE_ADMIN_PASSWORD)) {
          
          localStorage.setItem('super_admin_access', 'true');
          setIsAuthenticated(true);
          setLoginError('');
        } else {
          setLoginError('Invalid super admin credentials. Please try again.');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
      // Fallback to hardcoded credentials on network error (hidden in code for security)
      if ((loginForm.username === 'superadmin' && loginForm.password === 'admin123') ||
          (loginForm.username === 'Rexor22' && loginForm.password === import.meta.env.VITE_ADMIN_PASSWORD) ||
          (loginForm.username === 'RMD_Staff' && loginForm.password === import.meta.env.VITE_ADMIN_PASSWORD)) {
        
        localStorage.setItem('super_admin_access', 'true');
        setIsAuthenticated(true);
        setLoginError('');
      } else {
        setLoginError('Network error. Please check your connection or try the default credentials.');
      }
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle logout
  const handleSuperAdminLogout = () => {
    localStorage.removeItem('super_admin_access');
    localStorage.removeItem('super_admin_info');
    setIsAuthenticated(false);
    setLoginForm({ username: '', password: '' });
    setLoginError('');
  };

  // Check authentication status on component mount
  useEffect(() => {
    const savedAuthStatus = localStorage.getItem('super_admin_access');
    if (savedAuthStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch all data
  useEffect(() => {
    console.log("Authentication state changed:", isAuthenticated);
    if (isAuthenticated) {
      fetchAllUserData();
    }
  }, [isAuthenticated]);

  const fetchAllUserData = async () => {
    console.log("Fetching all user data...");
    setLoading(true);
    try {
      // Fetch real student data from the API
      try {
        const studentsResponse = await fetch('http://127.0.0.1:8001/api/dashboard/all-students');
        if (studentsResponse.ok) {
          const studentsData = await studentsResponse.json();
          
          if (studentsData.success && Array.isArray(studentsData.data)) {
            // Format student data to match our UI needs
            const formattedStudents = studentsData.data.map(student => ({
              id: student.id,
              student_id: student.studentId,
              name: `${student.firstName} ${student.lastName}`,
              email: student.email,
              contact: student.contact || 'N/A',
              year_level: student.yearLevel,
              program: student.course,
              status: student.status
            }));
            
            setStudents(formattedStudents);
          }
        } else {
          console.error('Failed to fetch students:', studentsResponse.statusText);
          // Fallback to sample data if API fails
          setStudents([
            { id: 'STU-001', student_id: 'STU001', name: 'John Doe', email: 'john.doe@example.com', contact: '09123456789', year_level: '1st Year', program: 'Computer Science', status: 'Active' },
            { id: 'STU-002', student_id: 'STU002', name: 'Jane Smith', email: 'jane.smith@example.com', contact: '09234567890', year_level: '2nd Year', program: 'Information Technology', status: 'Active' },
            { id: 'STU-003', student_id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@example.com', contact: '09345678901', year_level: '3rd Year', program: 'Software Engineering', status: 'Active' },
          ]);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        // Fallback to sample data
        setStudents([
          { id: 'STU-001', student_id: 'STU001', name: 'John Doe', email: 'john.doe@example.com', contact: '09123456789', year_level: '1st Year', program: 'Computer Science', status: 'Active' },
          { id: 'STU-002', student_id: 'STU002', name: 'Jane Smith', email: 'jane.smith@example.com', contact: '09234567890', year_level: '2nd Year', program: 'Information Technology', status: 'Active' },
          { id: 'STU-003', student_id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@example.com', contact: '09345678901', year_level: '3rd Year', program: 'Software Engineering', status: 'Active' },
        ]);
      }
      
      // Fetch real employee data from the API using axios
      try {
        console.log('Fetching employee data from API at:', new Date().toISOString());
        // Use window.fetch instead of axios to test if that's the issue
        const employeesResponse = await fetch('http://127.0.0.1:8001/api/dashboard/all-employees', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Employee API raw response:', employeesResponse);
        
        if (employeesResponse.ok) {
          const employeesData = await employeesResponse.json();
          console.log('Employee API response data parsed successfully:', employeesData);
          
          // Add enhanced debugging to see when the API returns successful data
          if (employeesData.success && Array.isArray(employeesData.data)) {
            // Add alert for debugging purposes to confirm API data is being received
            console.log('%cAPI SUCCESS: Received employee data!', 'background: green; color: white; padding: 2px 5px; border-radius: 3px;');
            
            if (employeesData.data.length > 0) {
              console.log('First employee data item:', employeesData.data[0]);
            } else {
              console.warn('API returned empty employees array');
            }
            
            // Format employee data to match our UI needs
            const formattedEmployees = employeesData.data.map(employee => ({
              id: employee.id,
              employee_id: employee.employeeId,
              name: `${employee.firstName} ${employee.lastName}`,
              email: employee.email,
              contact: employee.contact || 'N/A',
              position: employee.position,
              department: employee.department,
              category: employee.category || 'Staff', // Use default if category is not available
              status: employee.status
            }));
            
            // Log successful employee data retrieval
            console.log('Successfully retrieved employee data:', formattedEmployees);
            
            // Set all employee data regardless of category
            setEmployees(formattedEmployees);
            
            // For the admins tab, we'll keep any employees with Admin category if it exists
            // If category doesn't exist in the data, use other criteria to determine admins
            const adminEmployees = formattedEmployees.filter(emp => {
              // If category exists and is Admin, include it
              if (emp.category === 'Admin') {
                return true;
              }
              // Additional criteria could be added here, like position containing 'Admin'
              // return emp.position && emp.position.toLowerCase().includes('admin');
              return false;
            });
            setAdmins(adminEmployees);
          } else {
            // Fallback to sample data if API response is invalid
            console.error('API response invalid format. Using sample data instead.', employeesData);
            useSampleEmployeeData();
          }
        } else {
          console.error('Failed to fetch employees:', employeesResponse.status, employeesResponse.statusText);
          // Fallback to sample data if API fails
          useSampleEmployeeData();
        }
        
        if (employeesResponse.status === 200) {
          const employeesData = employeesResponse.data;
          console.log('Employee API response data:', employeesData);
          
          if (employeesData.success && Array.isArray(employeesData.data)) {
            // Format employee data to match our UI needs
            const formattedEmployees = employeesData.data.map(employee => ({
              id: employee.id,
              employee_id: employee.employeeId,
              name: `${employee.firstName} ${employee.lastName}`,
              email: employee.email,
              contact: employee.contact || 'N/A',
              position: employee.position,
              department: employee.department,
              category: employee.category || 'Staff', // Use default if category is not available
              status: employee.status
            }));
            
            // Log successful employee data retrieval
            console.log('Successfully retrieved employee data:', formattedEmployees);
            
            // Set all employee data regardless of category
            setEmployees(formattedEmployees);
            
            // For the admins tab, we'll keep any employees with Admin category if it exists
            // If category doesn't exist in the data, use other criteria to determine admins
            const adminEmployees = formattedEmployees.filter(emp => {
              // If category exists and is Admin, include it
              if (emp.category === 'Admin') {
                return true;
              }
              // Additional criteria could be added here, like position containing 'Admin'
              // return emp.position && emp.position.toLowerCase().includes('admin');
              return false;
            });
            setAdmins(adminEmployees);
          } else {
            // Fallback to sample data if API response is invalid
            console.error('API response invalid format. Using sample data instead.', employeesData);
            useSampleEmployeeData();
          }
        } else {
          console.error('Failed to fetch employees:', employeesResponse.status, employeesResponse.statusText);
          // Fallback to sample data if API fails
          useSampleEmployeeData();
        }
      } catch (error) {
        console.error('Error fetching employees:', error.name, error.message);
        // Log detailed fetch error information for debugging
        console.error('Fetch error details:', {
          error: error,
          message: error.message,
          stack: error.stack
        });
        // Fallback to sample data
        useSampleEmployeeData();
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to sample data for all types if there's a global error
      setStudents([
        { id: 'STU-001', student_id: 'STU001', name: 'John Doe', email: 'john.doe@example.com', contact: '09123456789', year_level: '1st Year', program: 'Computer Science', status: 'Active' },
        { id: 'STU-002', student_id: 'STU002', name: 'Jane Smith', email: 'jane.smith@example.com', contact: '09234567890', year_level: '2nd Year', program: 'Information Technology', status: 'Active' },
        { id: 'STU-003', student_id: 'STU003', name: 'Mike Johnson', email: 'mike.johnson@example.com', contact: '09345678901', year_level: '3rd Year', program: 'Software Engineering', status: 'Active' },
      ]);
      useSampleEmployeeData();
    } finally {
      setLoading(false);
    }
  };

  // Helper function to set sample employee data
  const useSampleEmployeeData = () => {
    const sampleEmployees = [
      { id: 1, employee_id: 'EMP001', name: 'Alice Brown', email: 'alice.brown@example.com', contact: '09456789012', position: 'Professor', department: 'Computer Science', status: 'Active' },
      { id: 2, employee_id: 'EMP002', name: 'Bob Wilson', email: 'bob.wilson@example.com', contact: '09567890123', position: 'IT Specialist', department: 'Information Technology', status: 'Active' },
      { id: 3, employee_id: 'EMP003', name: 'Carol Davis', email: 'carol.davis@example.com', contact: '09678901234', position: 'Lab Coordinator', department: 'Engineering', status: 'Active' },
    ];
    
    const sampleAdmins = [
      { id: 4, employee_id: 'ADM001', name: 'David Miller', email: 'david.miller@example.com', contact: '09789012345', position: 'System Administrator', department: 'IT Department', role: 'Super Admin', status: 'Active' },
      { id: 5, employee_id: 'ADM002', name: 'Emma Taylor', email: 'emma.taylor@example.com', contact: '09890123456', position: 'Database Administrator', department: 'IT Department', role: 'Admin', status: 'Active' },
    ];

    setEmployees(sampleEmployees);
    setAdmins(sampleAdmins);
  };

  // CRUD Operations
  const handleCreate = () => {
    setModalType('create');
    setSelectedUser(null);
    
    // Initialize form data based on active tab
    if (activeTab === 'students') {
      setFormData({
        status: 'Active'
      });
    } else if (activeTab === 'employees') {
      setFormData({
        status: 'Active'
      });
    } else if (activeTab === 'admins') {
      setFormData({
        status: 'Active',
        role: 'Admin'
      });
    } else {
      setFormData({});
    }
    
    setShowModal(true);
  };

  const handleView = (user) => {
    setModalType('view');
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setModalType('edit');
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setModalType('delete');
    setSelectedUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({});
    setModalType('create');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      // Here you would make API calls based on modalType
      if (modalType === 'create') {
        // Create new user
      } else if (modalType === 'edit') {
        // Update existing user
      } else if (modalType === 'delete') {
        // Delete user
      }
      
      // Refresh data after operation
      await fetchAllUserData();
      handleModalClose();
    } catch (error) {
      console.error('Error performing CRUD operation:', error);
    } finally {
      setFormLoading(false);
    }
  };

  // Filter and pagination logic
  const getCurrentData = () => {
    let currentData = [];
    switch (activeTab) {
      case 'students':
        currentData = students;
        break;
      case 'employees':
        currentData = employees; // No filtering by category
        break;
      case 'admins':
        currentData = admins;
        break;
      default:
        currentData = students;
    }

    // Apply search filter
    if (searchTerm) {
      currentData = currentData.filter(item => 
        Object.values(item).some(value => 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return currentData;
  };

  const currentData = getCurrentData();
  const totalPages = Math.ceil(currentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentData.slice(startIndex, endIndex);

  // Login form component
  if (!isAuthenticated) {
    console.log('🚀 RENDERING MODERN UI - UserAccessDashboard login form');
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        
        {/* Card-like gradient background container - much smaller and centered like your drawing */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-[500px] rounded-3xl bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-2xl opacity-75 animate-pulse-slow overflow-hidden">
          {/* Animated particles background - now inside the smaller card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-100 rounded-full animate-ping" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
            <div className="absolute top-1/2 right-1/3 w-1.5 h-1.5 bg-red-200 rounded-full animate-ping" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
          </div>

          {/* Floating geometric shapes - now inside the smaller card */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-8 left-8 w-8 h-8 border border-white/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '0s' }}></div>
            <div className="absolute top-16 right-8 w-6 h-6 border border-white/10 rounded-full animate-float-reverse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-12 left-12 w-10 h-10 border border-white/10 rounded-xl rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-20 right-8 w-4 h-4 border border-white/10 rounded-lg animate-float-reverse" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>
        
        {/* Elegant header with slide-in animation - positioned above the smaller card */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-10 py-3 rounded-full font-bold text-xl border-4 border-white/30 z-50 shadow-2xl animate-slide-down backdrop-blur-sm whitespace-nowrap">
          <span className="animate-bounce inline-block">🎉</span> SUPER ADMIN <span className="animate-bounce inline-block" style={{ animationDelay: '0.2s' }}>🎉</span>
        </div>
        
        <div className="max-w-md w-full relative animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {/* Animated Background Elements with enhanced effects */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-slow"></div>
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-slow animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob-slow animation-delay-4000"></div>
          </div>

          {/* Login Card with enhanced animations */}
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 space-y-8 transform transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] animate-card-entrance" style={{ animationDelay: '0.5s' }}>
            {/* Header with staggered animations */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <div className="mx-auto h-20 w-20 bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-3xl flex items-center justify-center shadow-2xl mb-6 transform transition-all duration-500 hover:rotate-12 hover:scale-110 animate-icon-bounce">
                <svg className="h-10 w-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-3 animate-title-glow">
                Super Admin Access
              </h2>
              <p className="text-gray-600 font-medium text-lg animate-fade-in" style={{ animationDelay: '0.9s' }}>
                Secure authentication required
              </p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-full mx-auto mt-6 animate-width-expand" style={{ animationDelay: '1.1s' }}></div>
            </div>

            {/* Login Form with staggered field animations */}
            <form className="space-y-6 animate-fade-in-up" style={{ animationDelay: '1.3s' }} onSubmit={handleSuperAdminLogin}>
              <div className="space-y-6">
                {/* Username Field with enhanced animations */}
                <div className="floating-label-input group animate-slide-in-right" style={{ animationDelay: '1.5s' }}>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="peer w-full px-6 py-4 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 focus:bg-white transition-all duration-500 ease-in-out transform hover:border-red-300 hover:shadow-lg focus:scale-[1.02]"
                    placeholder="Username"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                  />
                  <label 
                    htmlFor="username" 
                    className="floating-label peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-red-600 peer-focus:text-sm peer-focus:-top-3 peer-focus:bg-white peer-focus:px-3 peer-focus:mx-2 text-sm -top-3 bg-white px-3 mx-2 text-red-600 absolute left-2 transition-all duration-300 ease-in-out transform origin-left pointer-events-none font-medium"
                  >
                    Username
                  </label>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <svg className="h-6 w-6 text-gray-400 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                {/* Password Field with enhanced animations */}
                <div className="floating-label-input group animate-slide-in-left" style={{ animationDelay: '1.7s' }}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="peer w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-2xl bg-gray-50/50 text-gray-900 placeholder-transparent focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/20 focus:bg-white transition-all duration-500 ease-in-out transform hover:border-red-300 hover:shadow-lg focus:scale-[1.02]"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  />
                  <label 
                    htmlFor="password" 
                    className="floating-label peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:text-red-600 peer-focus:text-sm peer-focus:-top-3 peer-focus:bg-white peer-focus:px-3 peer-focus:mx-2 text-sm -top-3 bg-white px-3 mx-2 text-red-600 absolute left-2 transition-all duration-300 ease-in-out transform origin-left pointer-events-none font-medium"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 group"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <div className="p-2 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110 active:scale-95">
                      <svg className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showPassword ? "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" : "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"} />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
              
              {/* Error Message with dramatic animation */}
              {loginError && (
                <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 text-red-700 px-6 py-4 rounded-2xl text-sm font-semibold flex items-center space-x-3 animate-shake-intense shadow-lg">
                  <svg className="h-6 w-6 text-red-600 flex-shrink-0 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="animate-fade-in">{loginError}</span>
                </div>
              )}
              
              {/* Submit Button with spectacular animations */}
              <div className="animate-fade-in-up" style={{ animationDelay: '1.9s' }}>
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 focus:outline-none focus:ring-4 focus:ring-red-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-500 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl active:scale-[0.97] disabled:hover:scale-100 animate-button-glow overflow-hidden"
                >
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                  
                  <span className="absolute left-0 inset-y-0 flex items-center pl-4">
                    {loginLoading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent shadow-lg"></div>
                    ) : (
                      <svg className="h-6 w-6 text-red-200 group-hover:text-white transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </span>
                  {loginLoading ? (
                    <span className="flex items-center space-x-3">
                      <span className="animate-pulse">Authenticating</span>
                      <span className="flex space-x-1">
                        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></span>
                        <span className="h-2 w-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></span>
                      </span>
                    </span>
                  ) : (
                    <span className="relative z-10 tracking-wide">Access Super Admin Panel</span>
                  )}
                </button>
              </div>
            </form>

            {/* Footer with fade animation */}
            <div className="text-center pt-6 animate-fade-in" style={{ animationDelay: '2.1s' }}>
              <p className="text-sm text-gray-500 font-medium">
                🔒 Secure access to administrative functions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Debug Panel component
  const DebugPanel = () => {
    if (!isAuthenticated) return null;
    
    const checkDataStatus = () => {
      console.log('--- DEBUG INFORMATION ---');
      console.log('Current Tab:', activeTab);
      console.log('Students Data:', students);
      console.log('Employees Data:', employees);
      console.log('Admins Data:', admins);
      console.log('Current Items:', currentItems);
      console.log('Loading State:', loading);
      
      // Force a reload of the data
      fetchAllUserData();    // Test API directly
      fetch('http://127.0.0.1:8001/api/dashboard/all-employees')
        .then(response => {
          console.log('API Test Status:', response.status);
          return response.json();
        })
        .then(data => {
          console.log('API Test Data:', data);
          if (data.success && Array.isArray(data.data)) {
            alert(`API returned ${data.data.length} employees successfully!`);
          } else {
            alert('API response format issue');
          }
        })
        .catch(error => {
          console.error('API Test Error:', error);
          alert(`API test failed: ${error.message}`);
        });
    };
    
    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
        <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
          Employees: {employees.length} | API Port: 8001
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={checkDataStatus}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Reload Data
          </button>
          <button 
            onClick={() => setActiveTab('employees')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Show Employees
          </button>
        </div>
      </div>
    );
  };

  // Return component JSX
  return (
    <div className="p-6">
      {/* Debug Panel */}
      <DebugPanel />
      
      {/* Header and Actions */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">User Access Management</h2>
            <p className="text-gray-600">Manage student and employee access to the system</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCreate}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span>Create New</span>
            </button>
            <button
              onClick={handleSuperAdminLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg border border-red-200 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
              </svg>
              <span>Super Admin Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('students');
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'students'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Students ({students.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('employees');
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'employees'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Employees ({employees.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('admins');
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'admins'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Admins ({admins.length})
            </button>
          </nav>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Show:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">entries</span>
          </div>
        </div>
      </div>

      {/* Table Container with Fixed Header - Inventory Style */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="relative">
          {/* Absolutely Fixed Header */}
          <div className="absolute top-0 left-0 right-0 z-30 bg-gray-50 border-b shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed min-w-[1200px]">
                <thead>
                  <tr>
                    {activeTab === 'students' && (
                      <>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Student ID</th>
                        <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Name</th>
                        <th className="w-56 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Email</th>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Contact</th>
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Year Level</th>
                        <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Program</th>
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
                        <th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
                      </>
                    )}
                    {(activeTab === 'employees' || activeTab === 'admins') && (
                      <>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Employee ID</th>
                        <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Name</th>
                        <th className="w-56 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Email</th>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Contact</th>
                        <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Position</th>
                        <th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Department</th>
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Type</th>
                        {activeTab === 'admins' && (
                          <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Role</th>
                        )}
                        <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
                        <th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
                      </>
                    )}
                  </tr>
                </thead>
              </table>
            </div>
          </div>

          {/* Table Body with Top Margin for Header */}
          <div className="pt-[49px]"> {/* Exact height of header */}
            <div className="overflow-x-auto">
              <div className="h-96 overflow-y-auto"> {/* Fixed height instead of max-h */}
                <table className="w-full table-fixed min-w-[1200px]">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan={activeTab === 'admins' ? 9 : activeTab === 'employees' ? 8 : 7} className="px-4 py-12 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-500">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : currentItems.length === 0 ? (
                      <tr>
                        <td colSpan={activeTab === 'admins' ? 9 : activeTab === 'employees' ? 8 : 7} className="px-4 py-12 text-center text-gray-500">
                          No {activeTab} found.
                        </td>
                      </tr>
                    ) : (
                      currentItems.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          {activeTab === 'students' && (
                            <>
                              <td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={item.student_id}>
                                {item.student_id}
                              </td>
                              <td className="w-48 px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-blue-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 truncate" title={item.name}>{item.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="w-56 px-4 py-4 text-sm text-gray-900 truncate" title={item.email}>{item.email}</td>
                              <td className="w-32 px-4 py-4 text-sm text-gray-900 truncate" title={item.contact}>{item.contact}</td>
                              <td className="w-24 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={item.year_level}>{item.year_level}</td>
                              <td className="w-40 px-4 py-4 text-sm text-gray-900 truncate" title={item.program}>{item.program}</td>
                              <td className="w-24 px-4 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  item.status === 'Active' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="w-28 px-4 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleView(item)}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="View"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="text-green-600 hover:text-green-900"
                                    title="Edit"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                          {(activeTab === 'employees' || activeTab === 'admins') && (
                            <>
                              <td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={item.employee_id}>
                                {item.employee_id}
                              </td>
                              <td className="w-48 px-4 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H10a2 2 0 00-2 2v4.01M15 20l4-4m0 0l-4-4m4 4H7a8 8 0 018-8" />
                                    </svg>
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900 truncate" title={item.name}>{item.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="w-56 px-4 py-4 text-sm text-gray-900 truncate" title={item.email}>{item.email}</td>
                              <td className="w-32 px-4 py-4 text-sm text-gray-900 truncate" title={item.contact}>{item.contact}</td>
                              <td className="w-32 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={item.position}>{item.position}</td>
                              <td className="w-40 px-4 py-4 text-sm text-gray-900 truncate" title={item.department}>{item.department}</td>
                              <td className="w-24 px-4 py-4 whitespace-nowrap">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                  {activeTab === 'admins' ? 'Admin' : 'Employee'}
                                </span>
                              </td>
                              {activeTab === 'admins' && (
                                <td className="w-24 px-4 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                    item.role === 'Super Admin' 
                                      ? 'bg-red-100 text-red-800'
                                      : 'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {item.role || 'Admin'}
                                  </span>
                                </td>
                              )}
                              <td className="w-24 px-4 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  item.status === 'Active' 
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {item.status}
                                </span>
                              </td>
                              <td className="w-28 px-4 py-4 whitespace-nowrap text-sm font-medium">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleView(item)}
                                    className="text-blue-600 hover:text-blue-900"
                                    title="View"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleEdit(item)}
                                    className="text-green-600 hover:text-green-900"
                                    title="Edit"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item)}
                                    className="text-red-600 hover:text-red-900"
                                    title="Delete"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                            </>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <Modal isOpen={showModal} onClose={handleModalClose} title={
        modalType === 'create' ? 'Create New User' :
        modalType === 'edit' ? 'Edit User' :
        modalType === 'view' ? 'View User Details' :
        modalType === 'delete' ? 'Confirm Deletion' : ''
      }>
        {modalType === 'delete' ? (
          <div className="p-6">
            <p className="text-gray-700 mb-6">Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={handleModalClose} 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Make API call to delete the user
                  console.log('Deleting user', selectedUser);
                  
                  // For now we'll just remove from local state
                  if (activeTab === 'students') {
                    setStudents(students.filter(s => s.id !== selectedUser.id));
                  } else if (activeTab === 'employees') {
                    setEmployees(employees.filter(e => e.id !== selectedUser.id));
                  } else if (activeTab === 'admins') {
                    setAdmins(admins.filter(a => a.id !== selectedUser.id));
                  }
                  
                  handleModalClose();
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <form onSubmit={(e) => {
              e.preventDefault();
              
              // Handle form submission
              if (modalType === 'create') {
                // API call to create new user
                console.log('Creating user with data:', formData);
                
                // For now just add to local state
                if (activeTab === 'students') {
                  const newStudent = { ...formData, id: Date.now() };
                  setStudents([...students, newStudent]);
                } else if (activeTab === 'employees') {
                  const newEmployee = { ...formData, id: Date.now() };
                  setEmployees([...employees, newEmployee]);
                } else if (activeTab === 'admins') {
                  const newAdmin = { ...formData, id: Date.now() };
                  setAdmins([...admins, newAdmin]);
                }
              } else if (modalType === 'edit') {
                // API call to update user
                console.log('Updating user with data:', formData);
                
                // Update local state
                if (activeTab === 'students') {
                  setStudents(students.map(s => s.id === selectedUser.id ? { ...formData } : s));
                } else if (activeTab === 'employees') {
                  setEmployees(employees.map(e => e.id === selectedUser.id ? { ...formData } : e));
                } else if (activeTab === 'admins') {
                  setAdmins(admins.map(a => a.id === selectedUser.id ? { ...formData } : a));
                }
              }
              
              handleModalClose();
            }}>
              <div className="space-y-4">
                {/* Common fields for all user types */}
                {(activeTab === 'students' || activeTab === 'employees' || activeTab === 'admins') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                      <input
                        type="text"
                        value={formData.contact || ''}
                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </>
                )}
                
                {/* Student specific fields */}
                {activeTab === 'students' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                      <input
                        type="text"
                        value={formData.student_id || ''}
                        onChange={(e) => setFormData({...formData, student_id: e.target.value})}
                        disabled={modalType === 'view' || modalType === 'edit'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year Level</label>
                      <select
                        value={formData.year_level || ''}
                        onChange={(e) => setFormData({...formData, year_level: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Program</label>
                      <input
                        type="text"
                        value={formData.program || ''}
                        onChange={(e) => setFormData({...formData, program: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </>
                )}
                
                {/* Employee specific fields */}
                {activeTab === 'employees' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input
                        type="text"
                        value={formData.employee_id || ''}
                        onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                        disabled={modalType === 'view' || modalType === 'edit'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                  </>
                )}
                
                {/* Admin specific fields */}
                {activeTab === 'admins' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                      <input
                        type="text"
                        value={formData.employee_id || ''}
                        onChange={(e) => setFormData({...formData, employee_id: e.target.value})}
                        disabled={modalType === 'view' || modalType === 'edit'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={formData.position || ''}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department || ''}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select
                        value={formData.role || 'Admin'}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        disabled={modalType === 'view'}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                      </select>
                    </div>
                  </>
                )}
                
                {/* Status field for all types */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || 'Active'}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    disabled={modalType === 'view'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
              
              {modalType !== 'view' && (
                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={handleModalClose} 
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {modalType === 'create' ? 'Create' : 'Update'}
                  </button>
                </div>
              )}
              
              {modalType === 'view' && (
                <div className="mt-6 flex justify-end">
                  <button 
                    type="button"
                    onClick={handleModalClose} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Close
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </Modal>

      {/* Debug Panel - API Testing and Data Status */}
      <DebugPanel />

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(endIndex, currentData.length)} of {currentData.length} entries
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border rounded text-sm transition-colors ${
                  page === currentPage
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccessDashboard;
