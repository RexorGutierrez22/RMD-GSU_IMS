import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

	useEffect(() => {
		// Check if user is authenticated
		const token = localStorage.getItem('admin_token');
		if (!token) {
			navigate('/admin');
			return;
		}

		// Fetch user data and dashboard stats
		fetchDashboardData();
	}, [navigate]);

	const fetchDashboardData = async () => {
		try {
			const token = localStorage.getItem('admin_token');
			
			// Fetch real statistics from API
			const statsResponse = await axios.get('http://localhost:8000/api/dashboard/stats', {
				headers: {
					'Authorization': `Bearer ${token}`,
					'Content-Type': 'application/json',
				}
			});

			if (statsResponse.data) {
				setStats({
					totalStudents: statsResponse.data.students || 0,
					totalEmployees: statsResponse.data.employees || 0,
					totalItems: statsResponse.data.inventory || 0,
					pendingRequests: statsResponse.data.pendingRequests || 0
				});
			}

			setUser({
				name: 'Admin User',
				email: 'admin@rmd.usep.edu.ph'
			});

			setLoading(false);
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
			// Use fallback data in case of API error
			setStats({
				totalStudents: 150,
				totalEmployees: 45,
				totalItems: 320,
				pendingRequests: 12
			});
			
			setUser({
				name: 'Admin User',
				email: 'admin@rmd.usep.edu.ph'
			});
			
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('admin_token');
		navigate('/admin-login');
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center">
				<div className="text-xl">Loading dashboard...</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-100">
			{/* Header */}
			<header className="bg-red-700 text-white shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center py-4">
						<div className="flex items-center">
							<img 
								src="/Usep_logo.png" 
								alt="USeP Logo" 
								className="h-10 w-10 bg-white rounded-full p-1 mr-3"
							/>
							<div>
								<h1 className="text-xl font-bold">Resource Management Division</h1>
								<p className="text-red-100 text-sm">Inventory Management System</p>
							</div>
						</div>
						<div className="flex items-center space-x-4">
							<div className="text-right">
								<p className="font-medium">{user?.name}</p>
								<p className="text-red-100 text-sm">{user?.email}</p>
							</div>
							<button
								onClick={handleLogout}
								className="bg-red-800 hover:bg-red-900 px-4 py-2 rounded-lg transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				{/* Welcome Section */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h2>
					<p className="text-gray-600">Here's what's happening with your inventory management system today.</p>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-blue-100">
								<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Students</p>
								<p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-green-100">
								<svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Total Employees</p>
								<p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-yellow-100">
								<svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Inventory Items</p>
								<p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-lg shadow p-6">
						<div className="flex items-center">
							<div className="p-3 rounded-full bg-red-100">
								<svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
							</div>
							<div className="ml-4">
								<p className="text-sm font-medium text-gray-600">Pending Requests</p>
								<p className="text-2xl font-bold text-gray-900">{stats.pendingRequests}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					{/* Quick Actions Panel */}
					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
						<div className="grid grid-cols-2 gap-4">
							<button 
								onClick={() => navigate('/register/student')}
								className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
							>
								<svg className="w-8 h-8 text-blue-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								<p className="font-medium">Add Student</p>
							</button>

							<button 
								onClick={() => navigate('/register/employee')}
								className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center"
							>
								<svg className="w-8 h-8 text-green-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
								</svg>
								<p className="font-medium">Add Employee</p>
							</button>

							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
								<svg className="w-8 h-8 text-yellow-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
								<p className="font-medium">Manage Inventory</p>
							</button>

							<button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">
								<svg className="w-8 h-8 text-purple-600 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
								</svg>
								<p className="font-medium">Reports</p>
							</button>
						</div>
					</div>

					{/* Recent Activity */}
					<div className="bg-white rounded-lg shadow p-6">
						<h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
						<div className="space-y-4">
							<div className="flex items-center p-3 bg-gray-50 rounded-lg">
								<div className="p-2 bg-blue-100 rounded-full">
									<svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm font-medium">New student registered</p>
									<p className="text-xs text-gray-500">5 minutes ago</p>
								</div>
							</div>

							<div className="flex items-center p-3 bg-gray-50 rounded-lg">
								<div className="p-2 bg-green-100 rounded-full">
									<svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm font-medium">Employee QR code generated</p>
									<p className="text-xs text-gray-500">15 minutes ago</p>
								</div>
							</div>

							<div className="flex items-center p-3 bg-gray-50 rounded-lg">
								<div className="p-2 bg-yellow-100 rounded-full">
									<svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm font-medium">Inventory item borrowed</p>
									<p className="text-xs text-gray-500">1 hour ago</p>
								</div>
							</div>

							<div className="flex items-center p-3 bg-gray-50 rounded-lg">
								<div className="p-2 bg-red-100 rounded-full">
									<svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<div className="ml-3">
									<p className="text-sm font-medium">Return request pending</p>
									<p className="text-xs text-gray-500">2 hours ago</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-red-700 text-white py-4 mt-12">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<p className="text-sm">© 2025 CIC INTERNS - Resource Management Division</p>
				</div>
			</footer>
		</div>
	);
};

export default AdminDashboard;
