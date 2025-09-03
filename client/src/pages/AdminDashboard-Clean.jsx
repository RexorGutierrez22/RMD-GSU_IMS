import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	AnalyticsDashboard,
	BorrowersRequestDashboard,
	InventoryDashboard,
	CalendarDashboard
} from '../components/AdminDashboard';

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

	useEffect(() => {
		const token = localStorage.getItem('admin_token');
		if (!token) {
			navigate('/admin');
			return;
		}

		fetchDashboardData();
	}, [navigate]);

	const fetchDashboardData = async () => {
		try {
			// Simulated data for now
			setStats({
				totalStudents: 1247,
				totalEmployees: 89,
				totalItems: 567,
				pendingRequests: 23
			});
			
			setUser({
				name: 'Admin User',
				email: 'admin@rmd.usep.edu.ph'
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
			
			setUser({
				name: 'Admin User',
				email: 'admin@rmd.usep.edu.ph'
			});
			
			setLoading(false);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('admin_token');
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
			action: () => navigate('/users')
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
			case 'inventory':
				return <InventoryDashboard />;
			case 'calendar':
				return <CalendarDashboard />;
			default:
				return <AnalyticsDashboard />;
		}
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
				fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out 
				lg:translate-x-0 lg:static lg:inset-0`}>
				
				{/* Logo */}
				<div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
					<img src="/Usep_logo.png" alt="USeP Logo" className="h-8 w-8 mr-3" />
					<span className="text-xl font-bold text-gray-800">RMD IMS</span>
				</div>

				{/* Navigation */}
				<nav className="mt-6 px-6 flex-1 overflow-y-auto">
					<ul className="space-y-1">
						{menuStructure.map((item, index) => {
							if (item.type === 'label') {
								return (
									<li key={index} className="px-4 py-3">
										<span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
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
											className="w-full flex items-center justify-between px-4 py-3 text-left rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
																	? 'bg-red-50 text-red-600 border-r-4 border-red-600' 
																	: 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
															}`}
														>
															<span className="w-2 h-2 bg-current rounded-full mr-3 opacity-50"></span>
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
											className="w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
				<div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
					<div className="flex items-center">
						<div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
							<span className="text-white font-semibold text-sm">
								{user?.name?.charAt(0) || 'A'}
							</span>
						</div>
						<div className="ml-3">
							<p className="text-sm font-medium text-gray-700">{user?.name}</p>
							<p className="text-xs text-gray-500">{user?.email}</p>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Top Header */}
				<header className="bg-white shadow-sm border-b border-gray-200">
					<div className="flex items-center justify-between px-6 py-4">
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
									{activeSubmenu === 'inventory' && 'Inventory Management'}
									{activeSubmenu === 'calendar' && 'Calendar'}
								</h1>
								<p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
							</div>
						</div>

						<div className="flex items-center space-x-4">
							{/* Notifications */}
							<button className="p-2 text-gray-400 hover:text-gray-500 relative">
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
								</svg>
								<span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
							</button>

							{/* Logout Button */}
							<button
								onClick={handleLogout}
								className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
							>
								<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								Logout
							</button>
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
		</div>
	);
};

export default AdminDashboard;
