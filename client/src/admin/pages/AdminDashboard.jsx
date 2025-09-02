import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAuth, adminDashboard } from '../services/adminAPI.js';

const AdminDashboard = () => {
	const navigate = useNavigate();
	const [stats, setStats] = useState({
		totalStudents: 0,
		totalEmployees: 0,
		totalItems: 0,
		pendingRequests: 0,
		lowStockItems: 0,
		borrowedItems: 0,
		availableItems: 0,
		consumableItems: 0,
		reusableItems: 0
	});
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [activeTab, setActiveTab] = useState('dashboard');
	const [notifications, setNotifications] = useState([]);
	const [upcomingReturns, setUpcomingReturns] = useState([]);
	const [borrowTrend, setBorrowTrend] = useState([]);
	const [calendarView, setCalendarView] = useState('month'); // 'month', 'week', 'day'
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [calendarData, setCalendarData] = useState([]);
	const [chartView, setChartView] = useState('month'); // 'week', 'month'

	useEffect(() => {
		// Check if user is authenticated - this is now handled by ProtectedRoute
		// but we'll keep a basic check as a fallback
		if (!adminAuth.isAuthenticated()) {
			navigate('/admin-login');
			return;
		}

		// Fetch user data and dashboard stats
		fetchDashboardData();

		// Update time every minute
		const timer = setInterval(() => {
			setCurrentDate(new Date());
		}, 60000);

		return () => clearInterval(timer);
	}, [navigate]);

	const fetchDashboardData = async () => {
		try {
			// Fetch real statistics from API
			const statsData = await adminDashboard.getStats();
			
			if (statsData) {
				setStats({
					totalStudents: statsData.students || 150,
					totalEmployees: statsData.employees || 45,
					totalItems: statsData.inventory || 320,
					pendingRequests: statsData.pendingRequests || 12,
					lowStockItems: statsData.lowStockItems || 8,
					borrowedItems: statsData.borrowedItems || 25,
					availableItems: statsData.availableItems || 295,
					consumableItems: statsData.consumableItems || 180,
					reusableItems: statsData.reusableItems || 140
				});
			}

			// Mock notifications for low stock
			setNotifications([
				{ id: 1, type: 'warning', message: 'Printer Paper - Only 2 units left', time: '10 min ago' },
				{ id: 2, type: 'danger', message: 'Whiteboard Markers - Out of stock', time: '1 hour ago' },
				{ id: 3, type: 'warning', message: 'USB Cables - Only 3 units left', time: '2 hours ago' }
			]);

			// Mock upcoming returns
			setUpcomingReturns([
				{ id: 1, item: 'Laptop - Dell Inspiron', borrower: 'John Doe', dueDate: '2025-09-03', status: 'due-today' },
				{ id: 2, item: 'Projector - Epson', borrower: 'Jane Smith', dueDate: '2025-09-04', status: 'due-tomorrow' },
				{ id: 3, item: 'Camera - Canon EOS', borrower: 'Mike Johnson', dueDate: '2025-09-05', status: 'upcoming' }
			]);

			// Enhanced calendar data with more items and dates
			setCalendarData([
				{ id: 1, item: 'Laptop - Dell Inspiron', borrower: 'John Doe', studentId: 'S2021001', dueDate: '2025-09-03', status: 'overdue', type: 'laptop' },
				{ id: 2, item: 'Projector - Epson EX3280', borrower: 'Jane Smith', studentId: 'S2021002', dueDate: '2025-09-04', status: 'due-today', type: 'projector' },
				{ id: 3, item: 'Camera - Canon EOS R6', borrower: 'Mike Johnson', employeeId: 'E2021003', dueDate: '2025-09-05', status: 'upcoming', type: 'camera' },
				{ id: 4, item: 'Microscope - Olympus CX23', borrower: 'Sarah Wilson', studentId: 'S2021004', dueDate: '2025-09-06', status: 'upcoming', type: 'microscope' },
				{ id: 5, item: 'Tablet - iPad Pro', borrower: 'David Brown', employeeId: 'E2021005', dueDate: '2025-09-07', status: 'upcoming', type: 'tablet' },
				{ id: 6, item: 'External Hard Drive', borrower: 'Lisa Garcia', studentId: 'S2021006', dueDate: '2025-09-08', status: 'upcoming', type: 'storage' },
				{ id: 7, item: 'Wireless Mouse', borrower: 'Tom Anderson', studentId: 'S2021007', dueDate: '2025-09-10', status: 'upcoming', type: 'accessory' },
				{ id: 8, item: 'USB Hub', borrower: 'Emma Davis', employeeId: 'E2021008', dueDate: '2025-09-12', status: 'upcoming', type: 'accessory' },
				{ id: 9, item: 'Scientific Calculator', borrower: 'James Miller', studentId: 'S2021009', dueDate: '2025-09-15', status: 'upcoming', type: 'calculator' },
				{ id: 10, item: 'Laptop Charger', borrower: 'Nicole Taylor', studentId: 'S2021010', dueDate: '2025-09-18', status: 'upcoming', type: 'charger' }
			]);

			// Mock trend data - Monthly
			setBorrowTrend([
				{ period: 'Jan', borrowed: 45, returned: 42 },
				{ period: 'Feb', borrowed: 52, returned: 48 },
				{ period: 'Mar', borrowed: 38, returned: 41 },
				{ period: 'Apr', borrowed: 61, returned: 58 },
				{ period: 'May', borrowed: 55, returned: 53 },
				{ period: 'Jun', borrowed: 67, returned: 62 }
			]);

			setUser({
				name: 'RMD Administrator',
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
				pendingRequests: 12,
				lowStockItems: 8,
				borrowedItems: 25,
				availableItems: 295,
				consumableItems: 180,
				reusableItems: 140
			});
			
			setUser({
				name: 'RMD Administrator',
				email: 'admin@rmd.usep.edu.ph'
			});
			
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		try {
			await adminAuth.logout();
		} catch (error) {
			console.error('Logout error:', error);
		}
		navigate('/admin-login');
	};

	const formatDate = (date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const getGreeting = () => {
		const hour = currentDate.getHours();
		if (hour < 12) return 'Good Morning';
		if (hour < 18) return 'Good Afternoon';
		return 'Good Evening';
	};

	// Calendar utility functions
	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const getWeekDates = (date) => {
		const startOfWeek = new Date(date);
		const day = startOfWeek.getDay();
		const diff = startOfWeek.getDate() - day;
		startOfWeek.setDate(diff);
		
		const weekDates = [];
		for (let i = 0; i < 7; i++) {
			const weekDate = new Date(startOfWeek);
			weekDate.setDate(startOfWeek.getDate() + i);
			weekDates.push(weekDate);
		}
		return weekDates;
	};

	const getItemsForDate = (date) => {
		const dateStr = date.toISOString().split('T')[0];
		return calendarData.filter(item => item.dueDate === dateStr);
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'overdue': return 'bg-red-500 text-white';
			case 'due-today': return 'bg-orange-500 text-white';
			case 'upcoming': return 'bg-blue-500 text-white';
			default: return 'bg-gray-500 text-white';
		}
	};

	const formatDateForDisplay = (date) => {
		return date.toLocaleDateString('en-US', {
			month: 'short',
			day: 'numeric'
		});
	};

	const navigateCalendar = (direction) => {
		const newDate = new Date(selectedDate);
		
		if (calendarView === 'month') {
			newDate.setMonth(newDate.getMonth() + direction);
		} else if (calendarView === 'week') {
			newDate.setDate(newDate.getDate() + (direction * 7));
		} else if (calendarView === 'day') {
			newDate.setDate(newDate.getDate() + direction);
		}
		
		setSelectedDate(newDate);
	};

	const getChartData = () => {
		if (chartView === 'week') {
			// Mock weekly data
			return [
				{ period: 'Week 1', borrowed: 12, returned: 10 },
				{ period: 'Week 2', borrowed: 15, returned: 13 },
				{ period: 'Week 3', borrowed: 18, returned: 16 },
				{ period: 'Week 4', borrowed: 14, returned: 12 },
				{ period: 'Week 5', borrowed: 20, returned: 18 },
				{ period: 'Week 6', borrowed: 16, returned: 15 }
			];
		}
		return borrowTrend; // Monthly data
	};

	const renderDashboardContent = () => {
		switch (activeTab) {
			case 'dashboard':
				return (
					<div>
						{/* Top Header */}
						<div className="flex justify-between items-center mb-8">
							<div>
								<h1 className="text-3xl font-bold text-gray-800 mb-2">
									{getGreeting()}, {user?.name?.split(' ')[0]}
								</h1>
								<p className="text-gray-600">{formatDate(currentDate)}</p>
							</div>
						</div>

						{/* Stats Cards */}
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
							{/* Students Card */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Students</p>
										<p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalStudents}</p>
										<p className="text-green-500 text-sm mt-1">+5% from last month</p>
									</div>
									<div className="bg-red-100 rounded-full p-3">
										<svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
											<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 616 6H2a6 6 0 616-6z"/>
										</svg>
									</div>
								</div>
							</div>

							{/* Employees Card */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Employees</p>
										<p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalEmployees}</p>
										<p className="text-green-500 text-sm mt-1">+2% from last month</p>
									</div>
									<div className="bg-red-100 rounded-full p-3">
										<svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
											<path d="M9 6a3 3 0 11-6 0 3 3 0 616 0zM17 6a3 3 0 11-6 0 3 3 0 616 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 515 5v1H1v-1a5 5 0 515-5z"/>
										</svg>
									</div>
								</div>
							</div>

							{/* Borrowed Items Card */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Borrowed Items</p>
										<p className="text-3xl font-bold text-gray-800 mt-2">{stats.borrowedItems}</p>
										<p className="text-orange-500 text-sm mt-1">Currently out</p>
									</div>
									<div className="bg-orange-100 rounded-full p-3">
										<svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
										</svg>
									</div>
								</div>
							</div>

							{/* Low Stock Alert Card */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
								<div className="flex items-center justify-between">
									<div>
										<p className="text-gray-600 text-sm font-medium">Low Stock Items</p>
										<p className="text-3xl font-bold text-gray-800 mt-2">{stats.lowStockItems}</p>
										<p className="text-red-500 text-sm mt-1">Needs attention</p>
									</div>
									<div className="bg-red-100 rounded-full p-3">
										<svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
										</svg>
									</div>
								</div>
							</div>
						</div>

						{/* Charts and Notifications Row */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
							{/* Trend Chart */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold text-gray-800">Borrowing Trends</h3>
									
									{/* Chart View Toggle */}
									<div className="bg-gray-100 rounded-lg p-1 flex">
										<button
											onClick={() => setChartView('week')}
											className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
												chartView === 'week' 
												? 'text-white' 
												: 'text-gray-600 hover:text-gray-800'
											}`}
											style={chartView === 'week' ? { backgroundColor: '#dc2626' } : {}}
										>
											Weekly
										</button>
										<button
											onClick={() => setChartView('month')}
											className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
												chartView === 'month' 
												? 'text-white' 
												: 'text-gray-600 hover:text-gray-800'
											}`}
											style={chartView === 'month' ? { backgroundColor: '#dc2626' } : {}}
										>
											Monthly
										</button>
									</div>
								</div>
								
								<div className="h-64 flex items-end justify-between space-x-2">
									{getChartData().map((item, index) => (
										<div key={index} className="flex flex-col items-center flex-1">
											<div className="w-full flex justify-center space-x-1 mb-2">
												<div 
													className="rounded-t w-6"
													style={{ 
														height: `${(item.borrowed / (chartView === 'week' ? 25 : 70)) * 180}px`,
														backgroundColor: '#dc2626'
													}}
												></div>
												<div 
													className="rounded-t w-6"
													style={{ 
														height: `${(item.returned / (chartView === 'week' ? 25 : 70)) * 180}px`,
														backgroundColor: '#059669'
													}}
												></div>
											</div>
											<span className="text-xs text-gray-600">{item.period}</span>
										</div>
									))}
								</div>
								<div className="flex justify-center mt-4 space-x-4">
									<div className="flex items-center">
										<div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#dc2626' }}></div>
										<span className="text-sm text-gray-600">Borrowed</span>
									</div>
									<div className="flex items-center">
										<div className="w-3 h-3 rounded mr-2" style={{ backgroundColor: '#059669' }}></div>
										<span className="text-sm text-gray-600">Returned</span>
									</div>
								</div>
							</div>

							{/* Notifications */}
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Notifications</h3>
								<div className="space-y-3">
									{notifications.map((notification) => (
										<div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
											notification.type === 'danger' ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
										}`}>
											<p className="font-medium text-gray-800">{notification.message}</p>
											<p className="text-sm text-gray-500 mt-1">{notification.time}</p>
										</div>
									))}
								</div>
							</div>
						</div>

						{/* Item Statistics */}
						<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h4 className="font-semibold text-gray-800 mb-4">Available Items</h4>
								<div className="text-center">
									<div className="text-4xl font-bold text-red-600 mb-2">{stats.availableItems}</div>
									<p className="text-gray-600">Ready to borrow</p>
								</div>
							</div>
							
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h4 className="font-semibold text-gray-800 mb-4">Consumable Items</h4>
								<div className="text-center">
									<div className="text-4xl font-bold text-red-500 mb-2">{stats.consumableItems}</div>
									<p className="text-gray-600">Single-use items</p>
								</div>
							</div>
							
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h4 className="font-semibold text-gray-800 mb-4">Reusable Items</h4>
								<div className="text-center">
									<div className="text-4xl font-bold text-red-700 mb-2">{stats.reusableItems}</div>
									<p className="text-gray-600">Multi-use items</p>
								</div>
							</div>
						</div>
					</div>
				);

			case 'calendar':
				return (
					<div>
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold text-gray-800">Return Calendar</h1>
							<div className="flex items-center space-x-4">
								{/* View Toggle */}
								<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-1 flex">
									<button
										onClick={() => setCalendarView('month')}
										className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
											calendarView === 'month' 
											? 'text-white' 
											: 'text-gray-600 hover:text-gray-800'
										}`}
										style={calendarView === 'month' ? { backgroundColor: '#dc2626' } : {}}
									>
										Month
									</button>
									<button
										onClick={() => setCalendarView('week')}
										className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
											calendarView === 'week' 
											? 'text-white' 
											: 'text-gray-600 hover:text-gray-800'
										}`}
										style={calendarView === 'week' ? { backgroundColor: '#dc2626' } : {}}
									>
										Week
									</button>
									<button
										onClick={() => setCalendarView('day')}
										className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
											calendarView === 'day' 
											? 'text-white' 
											: 'text-gray-600 hover:text-gray-800'
										}`}
										style={calendarView === 'day' ? { backgroundColor: '#dc2626' } : {}}
									>
										Day
									</button>
								</div>
								
								{/* Navigation */}
								<div className="flex items-center space-x-2">
									<button
										onClick={() => navigateCalendar(-1)}
										className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
										</svg>
									</button>
									<button
										onClick={() => setSelectedDate(new Date())}
										className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 text-sm font-medium"
									>
										Today
									</button>
									<button
										onClick={() => navigateCalendar(1)}
										className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 hover:bg-gray-50"
									>
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
										</svg>
									</button>
								</div>
							</div>
						</div>

						{/* Calendar Content */}
						<div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
							{/* Calendar Header */}
							<div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
								<h2 className="text-xl font-semibold text-gray-800">
									{calendarView === 'month' && selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
									{calendarView === 'week' && `Week of ${getWeekDates(selectedDate)[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${getWeekDates(selectedDate)[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
									{calendarView === 'day' && selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
								</h2>
							</div>

							{/* Month View */}
							{calendarView === 'month' && (
								<div className="p-6">
									{/* Day Headers */}
									<div className="grid grid-cols-7 gap-1 mb-4">
										{['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
											<div key={day} className="p-3 text-center font-medium text-gray-600 text-sm">
												{day.substr(0, 3)}
											</div>
										))}
									</div>
									
									{/* Calendar Grid */}
									<div className="grid grid-cols-7 gap-1">
										{/* Empty cells for days before month starts */}
										{Array.from({ length: getFirstDayOfMonth(selectedDate) }, (_, i) => (
											<div key={`empty-${i}`} className="h-24 p-2 border border-gray-100 bg-gray-50"></div>
										))}
										
										{/* Days of the month */}
										{Array.from({ length: getDaysInMonth(selectedDate) }, (_, i) => {
											const dayDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i + 1);
											const dayItems = getItemsForDate(dayDate);
											const isToday = dayDate.toDateString() === new Date().toDateString();
											
											return (
												<div key={i + 1} className={`h-24 p-2 border border-gray-100 hover:bg-gray-50 ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
													<div className={`text-sm font-medium mb-1 ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
														{i + 1}
													</div>
													<div className="space-y-1">
														{dayItems.slice(0, 2).map(item => (
															<div
																key={item.id}
																className={`text-xs px-2 py-1 rounded truncate ${getStatusColor(item.status)}`}
																title={`${item.item} - ${item.borrower}`}
															>
																{item.item.length > 15 ? item.item.substring(0, 15) + '...' : item.item}
															</div>
														))}
														{dayItems.length > 2 && (
															<div className="text-xs text-gray-600 px-2">
																+{dayItems.length - 2} more
															</div>
														)}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* Week View */}
							{calendarView === 'week' && (
								<div className="p-6">
									<div className="grid grid-cols-7 gap-4">
										{getWeekDates(selectedDate).map((date, index) => {
											const dayItems = getItemsForDate(date);
											const isToday = date.toDateString() === new Date().toDateString();
											
											return (
												<div key={index} className={`border border-gray-200 rounded-lg p-4 min-h-48 ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-white'}`}>
													<div className={`text-center mb-3 ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
														<div className="font-medium text-sm">
															{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][index]}
														</div>
														<div className={`text-lg font-bold ${isToday ? 'bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1' : ''}`}>
															{date.getDate()}
														</div>
													</div>
													<div className="space-y-2">
														{dayItems.map(item => (
															<div
																key={item.id}
																className={`text-xs px-2 py-2 rounded ${getStatusColor(item.status)}`}
															>
																<div className="font-medium truncate">{item.item}</div>
																<div className="truncate opacity-80">{item.borrower}</div>
															</div>
														))}
													</div>
												</div>
											);
										})}
									</div>
								</div>
							)}

							{/* Day View */}
							{calendarView === 'day' && (
								<div className="p-6">
									<div className="max-w-2xl mx-auto">
										<div className="space-y-4">
											{getItemsForDate(selectedDate).length > 0 ? (
												getItemsForDate(selectedDate).map(item => (
													<div key={item.id} className={`p-4 rounded-lg border-l-4 ${
														item.status === 'overdue' ? 'bg-red-50 border-red-400' :
														item.status === 'due-today' ? 'bg-orange-50 border-orange-400' :
														'bg-blue-50 border-blue-400'
													}`}>
														<div className="flex justify-between items-start">
															<div className="flex-1">
																<h4 className="font-semibold text-gray-800 text-lg">{item.item}</h4>
																<p className="text-gray-600 mt-1">Borrowed by: <span className="font-medium">{item.borrower}</span></p>
																<p className="text-gray-600">
																	ID: <span className="font-medium">{item.studentId || item.employeeId}</span>
																</p>
																<p className="text-gray-600">
																	Type: <span className="capitalize font-medium">{item.type}</span>
																</p>
															</div>
															<div className="text-right">
																<span className={`text-xs px-3 py-1 rounded-full font-medium ${
																	item.status === 'overdue' ? 'bg-red-100 text-red-800' :
																	item.status === 'due-today' ? 'bg-orange-100 text-orange-800' :
																	'bg-blue-100 text-blue-800'
																}`}>
																	{item.status === 'overdue' ? 'Overdue' :
																	 item.status === 'due-today' ? 'Due Today' : 'Due Soon'}
																</span>
																<div className="text-sm text-gray-600 mt-2">
																	Due: {new Date(item.dueDate).toLocaleDateString()}
																</div>
															</div>
														</div>
													</div>
												))
											) : (
												<div className="text-center py-12">
													<svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
													</svg>
													<h3 className="text-lg font-medium text-gray-600 mb-2">No Returns Today</h3>
													<p className="text-gray-500">No items are scheduled to be returned on this date.</p>
												</div>
											)}
										</div>
									</div>
								</div>
							)}
						</div>

						{/* Legend */}
						<div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
							<h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
							<div className="flex flex-wrap gap-4">
								<div className="flex items-center">
									<div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
									<span className="text-sm text-gray-600">Overdue</span>
								</div>
								<div className="flex items-center">
									<div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
									<span className="text-sm text-gray-600">Due Today</span>
								</div>
								<div className="flex items-center">
									<div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
									<span className="text-sm text-gray-600">Upcoming</span>
								</div>
							</div>
						</div>
					</div>
				);

			case 'inventory':
				return (
					<div>
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold text-gray-800">Inventory Management</h1>
							<button 
								className="text-white px-4 py-2 rounded-lg font-medium transition-colors hover:opacity-90"
								style={{ backgroundColor: '#dc2626' }}
							>
								Add New Item
							</button>
						</div>
						
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Consumable Items</h3>
								<div className="space-y-3">
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>Printer Paper</span>
										<span className="text-red-600 font-medium">2 units</span>
									</div>
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>Whiteboard Markers</span>
										<span className="text-red-600 font-medium">0 units</span>
									</div>
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>USB Cables</span>
										<span className="text-yellow-600 font-medium">3 units</span>
									</div>
								</div>
							</div>
							
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Reusable Items</h3>
								<div className="space-y-3">
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>Laptops</span>
										<span className="text-green-600 font-medium">15 available</span>
									</div>
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>Projectors</span>
										<span className="text-green-600 font-medium">8 available</span>
									</div>
									<div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
										<span>Cameras</span>
										<span className="text-green-600 font-medium">5 available</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				);

			case 'settings':
				return (
					<div>
						<div className="flex justify-between items-center mb-8">
							<h1 className="text-3xl font-bold text-gray-800">Settings</h1>
						</div>
						
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Student Management</h3>
								<div className="space-y-3">
									<button 
										onClick={() => navigate('/register/student')}
										className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors hover:opacity-90"
										style={{ backgroundColor: '#dc2626' }}
									>
										Add New Student
									</button>
									<button 
										className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
									>
										View All Students
									</button>
									<button 
										className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors hover:opacity-90"
										style={{ backgroundColor: '#b91c1c' }}
									>
										Edit Student Records
									</button>
								</div>
							</div>
							
							<div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">Employee Management</h3>
								<div className="space-y-3">
									<button 
										onClick={() => navigate('/register/employee')}
										className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors hover:opacity-90"
										style={{ backgroundColor: '#dc2626' }}
									>
										Add New Employee
									</button>
									<button 
										className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
									>
										View All Employees
									</button>
									<button 
										className="w-full text-white py-3 px-4 rounded-lg font-medium transition-colors hover:opacity-90"
										style={{ backgroundColor: '#b91c1c' }}
									>
										Edit Employee Records
									</button>
								</div>
							</div>
						</div>
					</div>
				);

			default:
				return null;
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-gray-50 flex items-center justify-center">
				<div className="bg-white rounded-lg shadow-lg p-8">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderBottomColor: '#dc2626' }}></div>
					<p className="text-gray-600 mt-4 text-center">Loading Dashboard...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Sidebar */}
			<div className="fixed left-0 top-0 w-64 h-full text-white shadow-lg" style={{ backgroundColor: '#BA2C2C' }}>
				<div className="p-6">
					<div className="flex items-center mb-8">
						<div className="bg-white rounded-full p-2 mr-3">
							<img 
								src="/Usep_logo.png" 
								alt="USeP Logo" 
								className="h-8 w-8"
							/>
						</div>
						<div>
							<h1 className="text-lg font-bold">RMD-IMS</h1>
							<p className="text-red-200 text-sm">Admin Panel</p>
						</div>
					</div>

					{/* Navigation Menu */}
					<nav className="space-y-2">
						<button 
							onClick={() => setActiveTab('dashboard')}
							className={`w-full text-left p-3 rounded-lg transition-colors ${
								activeTab === 'dashboard' ? 'bg-red-800' : 'hover:bg-red-700'
							}`}
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
									</svg>
								</div>
								<span className="font-medium">Dashboard</span>
							</div>
						</button>

						<button 
							onClick={() => setActiveTab('calendar')}
							className={`w-full text-left p-3 rounded-lg transition-colors ${
								activeTab === 'calendar' ? 'bg-red-800' : 'hover:bg-red-700'
							}`}
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"/>
									</svg>
								</div>
								<span>Calendar</span>
							</div>
						</button>

						<button 
							onClick={() => setActiveTab('inventory')}
							className={`w-full text-left p-3 rounded-lg transition-colors ${
								activeTab === 'inventory' ? 'bg-red-800' : 'hover:bg-red-700'
							}`}
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
									</svg>
								</div>
								<span>Inventory</span>
							</div>
						</button>

						<button 
							onClick={() => navigate('/register/student')}
							className="w-full text-left p-3 rounded-lg hover:bg-red-700 transition-colors"
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 616 6H2a6 6 0 616-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
									</svg>
								</div>
								<span>Students</span>
							</div>
						</button>

						<button 
							onClick={() => navigate('/register/employee')}
							className="w-full text-left p-3 rounded-lg hover:bg-red-700 transition-colors"
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path d="M9 6a3 3 0 11-6 0 3 3 0 616 0zM17 6a3 3 0 11-6 0 3 3 0 616 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 515 5v1H1v-1a5 5 0 515-5z"/>
									</svg>
								</div>
								<span>Employees</span>
							</div>
						</button>

						<button 
							onClick={() => setActiveTab('settings')}
							className={`w-full text-left p-3 rounded-lg transition-colors ${
								activeTab === 'settings' ? 'bg-red-800' : 'hover:bg-red-700'
							}`}
						>
							<div className="flex items-center">
								<div className="w-5 h-5 mr-3">
									<svg fill="currentColor" viewBox="0 0 20 20">
										<path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
									</svg>
								</div>
								<span>Settings</span>
							</div>
						</button>
					</nav>

					{/* User Info at Bottom */}
					<div className="absolute bottom-6 left-6 right-6">
						<div className="bg-red-800 rounded-lg p-4">
							<div className="flex items-center mb-3">
								<div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3">
									<span className="text-red-600 font-bold text-sm">
										{user?.name?.charAt(0) || 'A'}
									</span>
								</div>
								<div className="flex-1">
									<p className="font-medium text-sm">{user?.name}</p>
									<p className="text-red-200 text-xs">{user?.email}</p>
								</div>
							</div>
							<button 
								onClick={handleLogout}
								className="w-full bg-red-900 hover:bg-red-950 text-white py-2 px-3 rounded text-sm transition-colors"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="ml-64 p-8">
				{renderDashboardContent()}
			</div>
		</div>
	);
};

export default AdminDashboard;
