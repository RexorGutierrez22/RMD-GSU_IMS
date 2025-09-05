import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	AnalyticsDashboard,
	BorrowersRequestDashboard,
	BorrowedItemDashboard,
	InventoryDashboard,
	CalendarDashboard
} from '../components/AdminDashboard';
import Inventory from './Inventory.jsx';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open
	const [expandedMenus, setExpandedMenus] = useState({ dashboard: true });
	const [activeSubmenu, setActiveSubmenu] = useState('analytics');

	useEffect(() => {
		const token = localStorage.getItem('admin_token');
		const adminUser = localStorage.getItem('admin_user');
		
		if (!token) {
			console.log('No admin token found, redirecting to login');
			navigate('/admin');
			return;
		}

		// Update URL to /dashboard if currently on /admin/dashboard
		if (window.location.pathname === '/admin/dashboard') {
			navigate('/dashboard', { replace: true });
		}

		// Check for query parameter and set active submenu
		const querySubmenu = searchParams.get('Inventory');
		if (querySubmenu !== null) {
			setActiveSubmenu('inventory');
		}

		// Load user data from localStorage or set default
		try {
			if (adminUser) {
				const userData = JSON.parse(adminUser);
				setUser(userData);
			} else {
				setUser({ name: 'Super Admin', email: 'admin@rmd.usep.edu.ph' });
			}
		} catch (err) {
			console.error('Error parsing admin user data:', err);
			setUser({ name: 'Super Admin', email: 'admin@rmd.usep.edu.ph' });
		}
		
		setLoading(false);
	}, [navigate, searchParams]);

	const toggleMenu = (menuKey) => {
		setExpandedMenus(prev => ({ ...prev, [menuKey]: !prev[menuKey] }));
	};

	const setActiveMenu = (submenu) => {
		setActiveSubmenu(submenu);
		// Update URL query parameter when Inventory is selected
		if (submenu === 'inventory') {
			setSearchParams({ Inventory: '' });
		} else {
			setSearchParams({});
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('admin_token');
		navigate('/admin');
	};

	const menuStructure = [
		{ label: 'MENU', type: 'label' },
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
				{ key: 'analytics', name: 'Analytics' },
				{ key: 'borrowers-request', name: 'Borrowers Request' },
				{ key: 'borrowed-item', name: 'Borrowed Item' },
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
		{ label: 'SUPPORT', type: 'label' },
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
			case 'inventory':
				return <Inventory />;
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
				fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out 
				lg:relative lg:translate-x-0 ${sidebarOpen ? 'lg:block' : 'lg:hidden'}`}
				style={{ backgroundColor: '#BA2C2C' }}>
				
				{/* Logo */}
				<div className="flex flex-col items-center justify-center h-24 px-4 border-b border-red-800 bg-red-900 bg-opacity-30 relative">
					{/* Close button for mobile */}
					<button
						onClick={() => setSidebarOpen(false)}
						className="absolute top-2 right-2 lg:hidden p-1 text-red-200 hover:text-white hover:bg-red-800 hover:bg-opacity-50 rounded transition-colors"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
					
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
					<div className="flex items-center justify-between">
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
						<button
							onClick={handleLogout}
							className="p-2 text-red-200 hover:text-white hover:bg-red-800 hover:bg-opacity-50 rounded-lg transition-colors"
							title="Logout"
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
							</svg>
						</button>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col overflow-hidden">
				{/* Header with toggle and mobile menu button - Top 30% Red Bottom 70% White */}
				<div className="relative shadow-sm border-b border-gray-200 p-4 flex items-center justify-between"
					style={{
						background: 'linear-gradient(to bottom, #BA2C2C 30%, white 30%)'
					}}>
					<div className="flex items-center space-x-4 relative z-10 mt-3">
						{/* Desktop Toggle Button */}
						<button
							onClick={() => setSidebarOpen(!sidebarOpen)}
							className="hidden lg:flex p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition-all duration-200 shadow-sm border border-gray-300 active:scale-95 active:bg-gray-300 active:shadow-inner transform"
							title={sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
						>
							<svg className="w-5 h-5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
						
						{/* Mobile Menu Button */}
						<button
							onClick={() => setSidebarOpen(true)}
							className="lg:hidden p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900 rounded-md transition-all duration-200 shadow-sm border border-gray-300 active:scale-95 active:bg-gray-300 active:shadow-inner transform"
							title="Open Menu"
						>
							<svg className="w-5 h-5 transition-transform duration-150" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						</button>
					</div>
					
					{/* Header Title */}
					<div className="flex-1 text-center">
						<h1 className="text-lg font-semibold text-gray-800 capitalize">
							{activeSubmenu.replace('-', ' ')}
						</h1>
					</div>
					
					{/* Header Actions */}
					<div className="flex items-center space-x-2">
						<button 
							onClick={() => {
								window.scrollTo({
									top: document.body.scrollHeight,
									behavior: 'smooth'
								});
							}}
							className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95 transform group"
							title="Scroll to Bottom"
						>
							<svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1 group-active:translate-y-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5V2h0z" />
							</svg>
						</button>
						<button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
							</svg>
						</button>
					</div>
				</div>

				{/* Dashboard Content */}
				<main className="flex-1 overflow-y-auto bg-gray-50">
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
