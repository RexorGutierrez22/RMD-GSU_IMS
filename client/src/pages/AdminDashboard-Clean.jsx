import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AnalyticsDashboard,
	BorrowersRequestDashboard,
	BorrowedItemDashboard,
	InventoryDashboard,
	CalendarDashboard,
	ReturneeItemDashboard
} from '../components/AdminDashboard';
import Inventory from './Inventory.jsx';
import { adminAuth } from '../admin/services/adminAPI';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [stats, setStats] = useState({
		totalStudents: 0,
		totalEmployees: 0,
		totalItems: 0,
		pendingRequests: 0
	});
	
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [expandedMenus, setExpandedMenus] = useState({ dashboard: true });
	const [activeSubmenu, setActiveSubmenu] = useState('analytics');
	
	// Super Admin States
	const [superAdminAuthenticated, setSuperAdminAuthenticated] = useState(false);
	const [superAdminLoginForm, setSuperAdminLoginForm] = useState({ username: '', password: '' });
	const [superAdminLoginError, setSuperAdminLoginError] = useState('');
	const [superAdminActiveTab, setSuperAdminActiveTab] = useState('students');
	const [superAdminSearchTerm, setSuperAdminSearchTerm] = useState('');
	const [showUserModal, setShowUserModal] = useState(false);
	const [userModalType, setUserModalType] = useState('add');
	const [editingUser, setEditingUser] = useState(null);
	
	// Super Admin Credentials
	const SUPER_ADMIN_CREDENTIALS = { username: 'superadmin', password: 'password' };
	
	// User Form State
	const [userForm, setUserForm] = useState({
		firstName: '', lastName: '', email: '', username: '', password: '',
		role: 'student', studentId: '', employeeId: '', department: '',
		course: '', yearLevel: '', status: 'active'
	});
	
	// Sample Users Data
	const [users, setUsers] = useState({
		students: [
			{
				id: 'STU001', firstName: 'John', lastName: 'Doe', email: 'john.doe@student.usep.edu.ph',
				username: 'johndoe', studentId: '2021-00001', course: 'Computer Science',
				yearLevel: '4th Year', department: 'College of Engineering', status: 'active', dateCreated: '2024-01-15'
			},
			{
				id: 'STU002', firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@student.usep.edu.ph',
				username: 'janesmith', studentId: '2022-00005', course: 'Information Technology',
				yearLevel: '3rd Year', department: 'College of Engineering', status: 'active', dateCreated: '2024-01-16'
			}
		],
		employees: [
			{
				id: 'EMP001', firstName: 'Maria', lastName: 'Garcia', email: 'maria.garcia@usep.edu.ph',
				username: 'mariagarcia', employeeId: 'EMP-2023-001', department: 'Registrar Office',
				position: 'Records Officer', status: 'active', dateCreated: '2024-01-10'
			}
		],
		admins: [
			{
				id: 'ADM001', firstName: 'Admin', lastName: 'User', email: 'admin@usep.edu.ph',
				username: 'admin', role: 'admin', department: 'IT Department',
				permissions: ['dashboard', 'inventory', 'users'], status: 'active', dateCreated: '2024-01-01'
			}
		]
	});

	useEffect(() => {
		const token = localStorage.getItem('admin_token');
		if (!token) {
			navigate('/admin');
			return;
		}

		// Check for superadmin URL parameter
		const urlParams = new URLSearchParams(window.location.search);
		if (urlParams.has('superadmin')) {
			setSuperAdminAuthenticated(true);
			setActiveSubmenu('user-access');
			// Ensure we stay on the dashboard route
			if (window.location.pathname !== '/dashboard') {
				navigate('/dashboard?superadmin');
			}
		}

		fetchDashboardData();
	}, [navigate]);

	const fetchDashboardData = async () => {
		try {
			// Get current admin data from localStorage or verify with server
			let currentAdmin = adminAuth.getCurrentAdmin();
			
			if (!currentAdmin) {
				// If no admin data in localStorage, try to verify token
				try {
					const verifyResponse = await adminAuth.verifyToken();
					currentAdmin = verifyResponse.admin;
					localStorage.setItem('admin_user', JSON.stringify(currentAdmin));
				} catch (error) {
					console.error('Token verification failed:', error);
					navigate('/admin');
					return;
				}
			}
			
			// Simulated data for now
			setStats({
				totalStudents: 1247,
				totalEmployees: 89,
				totalItems: 567,
				pendingRequests: 23
			});
			
			setUser({
				name: currentAdmin.full_name || currentAdmin.username,
				email: currentAdmin.email,
				username: currentAdmin.username,
				id: currentAdmin.id
			});

			setLoading(false);
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
			setStats({
				totalStudents: 150,
				totalEmployees: 45,
				totalItems: 320,
				pendingRequests: 12
			});
			
			// Fallback to localStorage admin data if available
			const fallbackAdmin = adminAuth.getCurrentAdmin();
			setUser({
				name: fallbackAdmin?.full_name || fallbackAdmin?.username || 'Admin User',
				email: fallbackAdmin?.email || 'admin@rmd.usep.edu.ph',
				username: fallbackAdmin?.username || 'admin',
				id: fallbackAdmin?.id || 1
			});
			
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		try {
			await adminAuth.logout();
		} catch (error) {
			console.error('Logout error:', error);
			// Clear local storage even if server logout fails
			localStorage.removeItem('admin_token');
			localStorage.removeItem('admin_user');
		}
		navigate('/admin');
	};

	const toggleMenu = (menuKey) => {
		setExpandedMenus(prev => ({
			...prev,
			[menuKey]: !prev[menuKey]
		}));
	};

	const setActiveMenu = (submenu) => {
		setActiveSubmenu(submenu);
	};

	// Super Admin Functions
	const handleSuperAdminLogin = (e) => {
		e.preventDefault();
		setSuperAdminLoginError('');
		
		if (superAdminLoginForm.username === SUPER_ADMIN_CREDENTIALS.username && 
			superAdminLoginForm.password === SUPER_ADMIN_CREDENTIALS.password) {
			setSuperAdminAuthenticated(true);
		} else {
			setSuperAdminLoginError('Invalid username or password');
		}
	};

	const handleSuperAdminLogout = () => {
		setSuperAdminAuthenticated(false);
		setSuperAdminLoginForm({ username: '', password: '' });
		setSuperAdminLoginError('');
	};

	const handleUserSubmit = (e) => {
		e.preventDefault();
		
		if (userModalType === 'add') {
			const newUser = {
				...userForm,
				id: `${userForm.role.toUpperCase().substring(0, 3)}${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
				dateCreated: new Date().toISOString().split('T')[0]
			};
			
			const targetArray = userForm.role === 'admin' ? 'admins' : userForm.role === 'employee' ? 'employees' : 'students';
			setUsers(prev => ({
				...prev,
				[targetArray]: [...prev[targetArray], newUser]
			}));
		} else {
			const targetArray = editingUser.role === 'admin' ? 'admins' : editingUser.role === 'employee' ? 'employees' : 'students';
			setUsers(prev => ({
				...prev,
				[targetArray]: prev[targetArray].map(user => 
					user.id === editingUser.id ? { ...userForm, id: editingUser.id, dateCreated: editingUser.dateCreated } : user
				)
			}));
		}

		setShowUserModal(false);
		setEditingUser(null);
		setUserForm({
			firstName: '', lastName: '', email: '', username: '', password: '',
			role: 'student', studentId: '', employeeId: '', department: '',
			course: '', yearLevel: '', status: 'active'
		});
	};

	const handleEditUser = (user, userType) => {
		setEditingUser({ ...user, role: userType });
		setUserForm({ ...user, role: userType });
		setUserModalType('edit');
		setShowUserModal(true);
	};

	const handleDeleteUser = (userId, userType) => {
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
		if (!superAdminSearchTerm) return userList;
		return userList.filter(user => 
			user.firstName.toLowerCase().includes(superAdminSearchTerm.toLowerCase()) ||
			user.lastName.toLowerCase().includes(superAdminSearchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(superAdminSearchTerm.toLowerCase()) ||
			user.username.toLowerCase().includes(superAdminSearchTerm.toLowerCase()) ||
			(user.studentId && user.studentId.toLowerCase().includes(superAdminSearchTerm.toLowerCase())) ||
			(user.employeeId && user.employeeId.toLowerCase().includes(superAdminSearchTerm.toLowerCase()))
		);
	};

	const menuStructure = [
		{
			label: 'MENU',
			type: 'label'
		},
		{
			key: 'dashboard',
			name: 'DASHBOARD',
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0a2 2 0 01-2 2H10a2 2 0 01-2-2v0z" />
				</svg>
			),
			type: 'dropdown',
			submenus: [
				{ key: 'analytics', name: 'Analytics', active: true },
				{ key: 'borrowers-request', name: 'Borrowers Request' },
				{ key: 'borrowed-item', name: 'Borrowed Item' },
				{ key: 'returnee-item', name: 'Returnee Item' },
				{ key: 'inventory', name: 'Inventory' },
				{ key: 'calendar', name: 'Calendar' }
			]
		},
		{
			key: 'user-access',
			name: 'USER ACCESS',
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
				</svg>
			),
			type: 'single',
			action: () => {
				setActiveSubmenu('user-access');
				// Clear any superadmin authentication when accessing via sidebar
				setSuperAdminAuthenticated(false);
				setSuperAdminLoginForm({ username: '', password: '' });
				setSuperAdminLoginError('');
			}
		},
		{
			label: 'SUPPORT',
			type: 'label'
		},
		{
			key: 'chat',
			name: 'Chat',
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
				</svg>
			),
			type: 'single'
		},
		{
			key: 'email',
			name: 'Email',
			icon: (
				<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
				</svg>
			),
			type: 'single'
		}
	];

	// Render appropriate dashboard content based on active submenu
	const renderDashboardContent = () => {
		switch (activeSubmenu) {
			case 'analytics':
				return <AnalyticsDashboard />;
			case 'borrowers-request':
				return <BorrowersRequestDashboard />;
			case 'borrowed-item':
				return <BorrowedItemDashboard />;
			case 'returnee-item':
				return <ReturneeItemDashboard />;
			case 'inventory':
				return <Inventory />;
			case 'calendar':
				return <CalendarDashboard />;
			case 'user-access':
				return renderUserAccessContent();
			default:
				return <AnalyticsDashboard />;
		}
	};

	// Render Super Admin User Access Content
	const renderUserAccessContent = () => {
		// Check if accessed via URL parameter
		const urlParams = new URLSearchParams(window.location.search);
		const isUrlAccess = urlParams.has('superadmin');
		
		if (!superAdminAuthenticated && !isUrlAccess) {
			// Login Form
			return (
				<div className="max-w-md mx-auto mt-16">
					<div className="bg-white rounded-lg shadow-lg p-8">
						<div className="text-center mb-8">
							<div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gradient-to-r from-red-100 to-red-200 mb-4 shadow-lg">
								<svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
								</svg>
							</div>
							<h3 className="text-2xl font-bold text-gray-900 mb-2">Super Admin Access</h3>
							<p className="text-gray-600">Enter your credentials to manage all system users</p>
						</div>

						<form onSubmit={handleSuperAdminLogin} className="space-y-6">
							<div className="relative">
								<input
									type="text"
									required
									value={superAdminLoginForm.username}
									onChange={(e) => setSuperAdminLoginForm({...superAdminLoginForm, username: e.target.value})}
									className="peer w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-transparent"
									placeholder="Username"
									id="username"
								/>
								<label 
									htmlFor="username"
									className="absolute left-3 -top-2 text-sm font-medium text-red-600 bg-white px-1 transition-all peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-red-600 peer-focus:text-sm"
								>
									Username
								</label>
							</div>
							<div className="relative">
								<input
									type="password"
									required
									value={superAdminLoginForm.password}
									onChange={(e) => setSuperAdminLoginForm({...superAdminLoginForm, password: e.target.value})}
									className="peer w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 placeholder-transparent"
									placeholder="Password"
									id="password"
								/>
								<label 
									htmlFor="password"
									className="absolute left-3 -top-2 text-sm font-medium text-red-600 bg-white px-1 transition-all peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-2 peer-focus:text-red-600 peer-focus:text-sm"
								>
									Password
								</label>
							</div>

							{superAdminLoginError && (
								<div className="text-red-600 text-sm text-center">{superAdminLoginError}</div>
							)}

							<button
								type="submit"
								className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
							>
								Sign In
							</button>
						</form>
					</div>
				</div>
			);
		}

		// User Management Interface
		return (
			<div className="space-y-6">
				{/* Header */}
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-2xl font-bold text-gray-900">User Management</h3>
						<p className="text-gray-600">Manage all system users and create admin accounts</p>
					</div>
					<div className="flex items-center gap-3">
						<button
							onClick={() => {
								setUserModalType('add');
								setUserForm({
									firstName: '', lastName: '', email: '', username: '', password: '',
									role: 'student', studentId: '', employeeId: '', department: '',
									course: '', yearLevel: '', status: 'active'
								});
								setShowUserModal(true);
							}}
							className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
							</svg>
							Add User
						</button>
						<button
							onClick={handleSuperAdminLogout}
							className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
						>
							Logout
						</button>
					</div>
				</div>

				{/* Search Bar */}
				<div className="bg-white rounded-lg shadow p-4">
					<div className="relative">
						<svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<input
							type="text"
							placeholder="Search users by name, email, username, or ID..."
							value={superAdminSearchTerm}
							onChange={(e) => setSuperAdminSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
						/>
					</div>
				</div>

				{/* Tabs */}
				<div className="bg-white rounded-lg shadow">
					<div className="border-b border-gray-200">
						<nav className="-mb-px flex">
							{[
								{ key: 'students', name: 'Students', count: users.students.length },
								{ key: 'employees', name: 'Employees', count: users.employees.length },
								{ key: 'admins', name: 'Admins', count: users.admins.length }
							].map((tab) => (
								<button
									key={tab.key}
									onClick={() => setSuperAdminActiveTab(tab.key)}
									className={`px-6 py-4 text-sm font-medium border-b-2 flex items-center gap-2 transition-all duration-200 ${
										superAdminActiveTab === tab.key
											? 'border-red-600 text-red-700 bg-gradient-to-t from-red-50 to-transparent'
											: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
									}`}
								>
									{tab.name}
									<span className={`px-2 py-1 rounded-full text-xs transition-all duration-200 ${
										superAdminActiveTab === tab.key
											? 'bg-gradient-to-r from-red-100 to-red-200 text-red-700'
											: 'bg-gray-100 text-gray-600'
									}`}>
										{tab.count}
									</span>
								</button>
							))}
						</nav>
					</div>

					{/* Users Table */}
					<div className="relative">
						{/* Fixed Header */}
						<div className="absolute top-0 left-0 right-0 z-30 bg-gray-50 border-b shadow-sm">
							<div className="overflow-x-auto">
								<table className="w-full table-fixed min-w-[1200px]">
									<thead>
										<tr>
											<th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">User</th>
											<th className="w-56 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Contact Info</th>
											<th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Primary Info</th>
											<th className="w-48 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Secondary Info</th>
											<th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Department</th>
											<th className="w-28 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
											<th className="w-32 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
										</tr>
									</thead>
								</table>
							</div>
						</div>

						{/* Table Body */}
						<div className="pt-[49px]">
							<div className="overflow-x-auto">
								<div className="h-96 overflow-y-auto">
									<table className="w-full table-fixed min-w-[1200px]">
										<tbody className="bg-white divide-y divide-gray-200">
											{filterUsers(users[superAdminActiveTab]).map((user) => (
												<tr key={user.id} className="hover:bg-gray-50">
													<td className="w-48 px-6 py-4 whitespace-nowrap">
														<div className="flex items-center">
															<div className="h-10 w-10 flex-shrink-0">
																<div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
																	<span className="text-sm font-medium text-gray-700">
																		{user.firstName[0]}{user.lastName[0]}
																	</span>
																</div>
															</div>
															<div className="ml-4 min-w-0 flex-1">
																<div className="text-sm font-medium text-gray-900 truncate" title={`${user.firstName} ${user.lastName}`}>
																	{user.firstName} {user.lastName}
																</div>
																<div className="text-sm text-gray-500 truncate" title={`@${user.username}`}>@{user.username}</div>
															</div>
														</div>
													</td>
													<td className="w-56 px-6 py-4">
														<div className="text-sm text-gray-900 truncate" title={user.email}>{user.email}</div>
														<div className="text-sm text-gray-500 truncate" title={
															superAdminActiveTab === 'students' ? `ID: ${user.studentId}` : 
															superAdminActiveTab === 'employees' ? `ID: ${user.employeeId}` : 
															`Role: ${user.role}`
														}>
															{superAdminActiveTab === 'students' ? `ID: ${user.studentId}` : 
															 superAdminActiveTab === 'employees' ? `ID: ${user.employeeId}` : 
															 `Role: ${user.role}`}
														</div>
													</td>
													<td className="w-48 px-6 py-4">
														<div className="text-sm text-gray-900 truncate" title={
															superAdminActiveTab === 'students' ? user.course :
															superAdminActiveTab === 'employees' ? (user.position || 'Employee') :
															user.department
														}>
															{superAdminActiveTab === 'students' ? user.course :
															 superAdminActiveTab === 'employees' ? (user.position || 'Employee') :
															 user.department}
														</div>
														<div className="text-sm text-gray-500 truncate" title={
															superAdminActiveTab === 'students' ? user.yearLevel :
															superAdminActiveTab === 'employees' ? 'Employee' :
															'Admin User'
														}>
															{superAdminActiveTab === 'students' ? user.yearLevel :
															 superAdminActiveTab === 'employees' ? 'Employee' :
															 'Admin User'}
														</div>
													</td>
													<td className="w-48 px-6 py-4">
														<div className="text-sm text-gray-900 truncate" title={user.department}>
															{user.department}
														</div>
														<div className="text-sm text-gray-500 truncate" title={
															superAdminActiveTab === 'students' ? 'Student Account' :
															superAdminActiveTab === 'employees' ? 'Employee Account' :
															(user.permissions ? user.permissions.join(', ') : 'No permissions')
														}>
															{superAdminActiveTab === 'students' ? 'Student Account' :
															 superAdminActiveTab === 'employees' ? 'Employee Account' :
															 (user.permissions ? user.permissions.join(', ') : 'No permissions')}
														</div>
													</td>
													<td className="w-32 px-6 py-4 whitespace-nowrap">
														<div className="text-sm text-gray-900 truncate" title={user.department}>
															{user.department.length > 15 ? user.department.substring(0, 15) + '...' : user.department}
														</div>
													</td>
													<td className="w-28 px-6 py-4 whitespace-nowrap">
														<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
															{user.status}
														</span>
													</td>
													<td className="w-32 px-6 py-4 whitespace-nowrap text-sm font-medium">
														<div className="flex items-center gap-2">
															<button
																onClick={() => handleEditUser(user, superAdminActiveTab.slice(0, -1))}
																className="text-blue-600 hover:text-blue-900"
																title="Edit"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																</svg>
															</button>
															<button
																onClick={() => handleDeleteUser(user.id, superAdminActiveTab.slice(0, -1))}
																className="text-red-600 hover:text-red-900"
																title="Delete"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
																</svg>
															</button>
															<button
																className="text-gray-600 hover:text-gray-900"
																title="View Details"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
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
					</div>
				</div>
			</div>
		);
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="flex items-center space-x-2">
					<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
					<span className="text-gray-600">Loading dashboard...</span>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-gray-50">
			{/* Sidebar */}
			<div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
				fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out 
				lg:translate-x-0 lg:static lg:inset-0`}
				style={{ backgroundColor: '#BA2C2C' }}>
				
				{/* Logo */}
				<div className="flex flex-col items-center justify-center h-24 px-4 border-b border-red-800 bg-red-900 bg-opacity-30 relative">
					<div className="flex items-center mb-2">
						<img src="/Usep_logo.png" alt="USeP Logo" className="h-10 w-10 mr-3 bg-white rounded-full p-1 shadow-md" />
						<div className="text-center">
							<div className="text-base font-bold text-white tracking-wide">RMD</div>
							<div className="text-xs text-red-200 font-medium">USEP</div>
						</div>
					</div>
					<div className="text-center">
						<div className="text-xs font-semibold text-white opacity-90 leading-tight">Resource Management Division</div>
						<div className="text-xs font-medium text-red-100 leading-tight">Inventory Management System</div>
					</div>
				</div>

				{/* Navigation */}
				<nav className="mt-6 px-6 flex-1 overflow-y-auto">
					<ul className="space-y-1">
						{menuStructure.map((item, index) => {
							if (item.type === 'label') {
								return (
									<li key={index} className="px-4 py-3">
										<span className="text-xs font-bold text-red-200 uppercase tracking-wider">
											{item.label}
										</span>
									</li>
								);
							}

							if (item.type === 'dropdown') {
								return (
									<li key={index}>
										<button
											onClick={() => toggleMenu(item.key)}
											className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 text-white hover:bg-red-800 hover:bg-opacity-50"
										>
											<div className="flex items-center">
												{item.icon}
												<span className="ml-3 font-medium">{item.name}</span>
											</div>
											<svg 
												className={`w-4 h-4 transition-transform duration-200 ${expandedMenus[item.key] ? 'rotate-180' : ''}`}
												fill="none" 
												stroke="currentColor" 
												viewBox="0 0 24 24"
											>
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
											</svg>
										</button>
										
										{expandedMenus[item.key] && (
											<ul className="ml-4 mt-2 space-y-1">
												{item.submenus.map((submenu, subIndex) => (
													<li key={subIndex}>
														<button
															onClick={() => setActiveMenu(submenu.key)}
															className={`w-full flex items-center px-4 py-2 text-left rounded-lg transition-colors duration-200 text-sm ${
																activeSubmenu === submenu.key 
																	? 'bg-white text-red-600 shadow-sm font-medium' 
																	: 'text-red-100 hover:bg-red-800 hover:bg-opacity-50 hover:text-white'
															}`}
														>
															<span className="w-2 h-2 bg-current rounded-full mr-3 opacity-70"></span>
															{submenu.name}
														</button>
													</li>
												))}
											</ul>
										)}
									</li>
								);
							}

							if (item.type === 'single') {
								return (
									<li key={index}>
										<button
											onClick={item.action}
											className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 text-white hover:bg-red-800 hover:bg-opacity-50"
										>
											{item.icon}
											<span className="ml-3 font-medium">{item.name}</span>
										</button>
									</li>
								);
							}

							return null;
						})}
					</ul>
				</nav>

				{/* User Profile */}
				<div className="absolute bottom-0 left-0 right-0 p-6 border-t border-red-800">
					<div className="flex items-center">
						<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
							<span className="text-red-600 font-semibold text-sm">
								{user?.name?.charAt(0) || 'A'}
							</span>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-white">{user?.name}</p>
							<p className="text-xs text-red-200">{user?.email}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Header */}
				<header className="bg-white shadow-sm border-b border-gray-200 relative">
					{/* Red top section */}
					<div className="absolute top-0 left-0 right-0 h-8" style={{ backgroundColor: '#BA2C2C' }}>
						{/* Buttons in red section */}
						<div className="flex items-center justify-end h-full px-6 space-x-3">
							{/* Notifications */}
							<button className="p-1 text-white hover:text-red-200 relative">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
								</svg>
								<span className="absolute -top-1 -right-1 block h-3 w-3 rounded-full bg-yellow-400 border border-white"></span>
							</button>

							{/* Logout Button */}
							<button
								onClick={handleLogout}
								className="flex items-center px-3 py-1 text-xs text-white bg-red-800 hover:bg-red-900 rounded transition-colors duration-200 shadow-sm"
							>
								<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Logout
							</button>
						</div>
					</div>
					
					<div className="flex items-center justify-between px-6 py-4 relative z-10">
						<div className="flex items-center">
							<button
								onClick={() => setSidebarOpen(!sidebarOpen)}
								className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							</button>
							<div className="ml-4 lg:ml-0">
								<h1 className="text-2xl font-semibold text-gray-900">
									{activeSubmenu === 'analytics' && 'Analytics Dashboard'}
									{activeSubmenu === 'borrowers-request' && 'Borrowers Request'}
									{activeSubmenu === 'borrowed-item' && 'Borrowed Item'}
									{activeSubmenu === 'returnee-item' && 'Returnee Item'}
									{activeSubmenu === 'inventory' && 'Inventory Management'}
									{activeSubmenu === 'calendar' && 'Calendar'}
									{activeSubmenu === 'user-access' && 'User Access Management'}
								</h1>
								<p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							{/* Empty space since buttons are now in red section */}
						</div>
					</div>
				</header>

				{/* Dashboard Content */}
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
					{renderDashboardContent()}
				</main>
			</div>

			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<div 
					className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}

			{/* User Modal */}
			{showUserModal && (
				<div className="fixed inset-0 z-60 bg-black bg-opacity-50 flex items-center justify-center p-4">
					<div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
						<div className="p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="text-lg font-bold text-gray-900">
									{userModalType === 'add' ? 'Add New User' : 'Edit User'}
								</h3>
								<button
									onClick={() => {
										setShowUserModal(false);
										setEditingUser(null);
									}}
									className="text-gray-500 hover:text-gray-700"
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							<form onSubmit={handleUserSubmit} className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">User Role *</label>
									<select
										required
										value={userForm.role}
										onChange={(e) => setUserForm({...userForm, role: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
									>
										<option value="student">Student</option>
										<option value="employee">Employee</option>
										<option value="admin">Admin/Staff</option>
									</select>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
										<input
											type="text"
											required
											value={userForm.firstName}
											onChange={(e) => setUserForm({...userForm, firstName: e.target.value})}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
										<input
											type="text"
											required
											value={userForm.lastName}
											onChange={(e) => setUserForm({...userForm, lastName: e.target.value})}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
										/>
									</div>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
									<input
										type="email"
										required
										value={userForm.email}
										onChange={(e) => setUserForm({...userForm, email: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
									<input
										type="text"
										required
										value={userForm.username}
										onChange={(e) => setUserForm({...userForm, username: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
									/>
								</div>

								{userModalType === 'add' && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
										<input
											type="password"
											required
											value={userForm.password}
											onChange={(e) => setUserForm({...userForm, password: e.target.value})}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
										/>
									</div>
								)}

								{/* Role-specific fields */}
								{userForm.role === 'student' && (
									<>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Student ID *</label>
											<input
												type="text"
												required
												value={userForm.studentId}
												onChange={(e) => setUserForm({...userForm, studentId: e.target.value})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Course *</label>
											<input
												type="text"
												required
												value={userForm.course}
												onChange={(e) => setUserForm({...userForm, course: e.target.value})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
											/>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-1">Year Level *</label>
											<select
												required
												value={userForm.yearLevel}
												onChange={(e) => setUserForm({...userForm, yearLevel: e.target.value})}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
											>
												<option value="">Select Year Level</option>
												<option value="1st Year">1st Year</option>
												<option value="2nd Year">2nd Year</option>
												<option value="3rd Year">3rd Year</option>
												<option value="4th Year">4th Year</option>
												<option value="5th Year">5th Year</option>
											</select>
										</div>
									</>
								)}

								{userForm.role === 'employee' && (
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-1">Employee ID *</label>
										<input
											type="text"
											required
											value={userForm.employeeId}
											onChange={(e) => setUserForm({...userForm, employeeId: e.target.value})}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
										/>
									</div>
								)}

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
									<input
										type="text"
										required
										value={userForm.department}
										onChange={(e) => setUserForm({...userForm, department: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
									<select
										value={userForm.status}
										onChange={(e) => setUserForm({...userForm, status: e.target.value})}
										className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
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
											setShowUserModal(false);
											setEditingUser(null);
										}}
										className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
									>
										Cancel
									</button>
									<button
										type="submit"
										className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all duration-200 text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
									>
										{userModalType === 'add' ? 'Add User' : 'Update User'}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
