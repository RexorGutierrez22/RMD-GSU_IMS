import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { dashboardApi } from '../../services/api';

const AnalyticsDashboard = () => {
	const [animatedStats, setAnimatedStats] = useState({
		students: 0, employees: 0, borrowed: 0, lowStock: 0, available: 0, total: 0
	});
	
	const [realStats, setRealStats] = useState({
		students: 150, employees: 45, borrowed: 25, lowStock: 8, available: 295, total: 320
	});
	
	const [loading, setLoading] = useState(true);
	const [activeTimeRange, setActiveTimeRange] = useState('monthly');

	// Fetch real data from database
	useEffect(() => {
		const fetchStats = async () => {
			try {
				setLoading(true);
				
				// Try to fetch data from multiple endpoints
				const [studentsRes, employeesRes, inventoryRes] = await Promise.allSettled([
					fetch('http://127.0.0.1:8001/api/dashboard/students-count'),
					fetch('http://127.0.0.1:8001/api/dashboard/employees-count'),
					fetch('http://127.0.0.1:8001/api/dashboard/inventory-stats')
				]);

				let studentsCount = 150; // default
				let employeesCount = 45; // default
				let totalItems = 320; // default
				let borrowedItems = 25; // default
				let lowStockItems = 8; // default

				// Process students data
				if (studentsRes.status === 'fulfilled' && studentsRes.value.ok) {
					const studentsData = await studentsRes.value.json();
					studentsCount = studentsData.count || studentsData.total || 150;
				}

				// Process employees data
				if (employeesRes.status === 'fulfilled' && employeesRes.value.ok) {
					const employeesData = await employeesRes.value.json();
					employeesCount = employeesData.count || employeesData.total || 45;
				}

				// Process inventory data
				if (inventoryRes.status === 'fulfilled' && inventoryRes.value.ok) {
					const inventoryData = await inventoryRes.value.json();
					totalItems = inventoryData.total_items || 320;
					borrowedItems = inventoryData.borrowed_items || 25;
					lowStockItems = inventoryData.low_stock_items || 8;
				}

				const availableItems = totalItems - borrowedItems;
				
				setRealStats({
					students: studentsCount,
					employees: employeesCount,
					borrowed: borrowedItems,
					lowStock: lowStockItems,
					available: availableItems,
					total: totalItems
				});
				
			} catch (error) {
				console.error('Failed to fetch dashboard stats:', error);
				// Keep default mock values if API fails
				setRealStats({
					students: 150, 
					employees: 45, 
					borrowed: 25, 
					lowStock: 8, 
					available: 295, 
					total: 320
				});
			} finally {
				setLoading(false);
			}
		};

		fetchStats();
	}, []);

	// Animation effect - now uses real data
	useEffect(() => {
		if (!loading) {
			const finalStats = realStats;
			const duration = 2000, steps = 60, increment = duration / steps;
			let step = 0;
			const timer = setInterval(() => {
				step++;
				const progress = step / steps;
				const easeOutQuart = 1 - Math.pow(1 - progress, 4);
				setAnimatedStats({
					students: Math.round(finalStats.students * easeOutQuart),
					employees: Math.round(finalStats.employees * easeOutQuart),
					borrowed: Math.round(finalStats.borrowed * easeOutQuart),
					lowStock: Math.round(finalStats.lowStock * easeOutQuart),
					available: Math.round(finalStats.available * easeOutQuart),
					total: Math.round(finalStats.total * easeOutQuart)
				});
				if (step >= steps) {
					clearInterval(timer);
					setAnimatedStats(finalStats);
				}
			}, increment);
			
			return () => clearInterval(timer);
		}
	}, [loading, realStats]);

	const getChartData = () => {
		switch (activeTimeRange) {
			case 'monthly':
				return [
					{ period: 'Jan', borrowed: 45, returned: 42, pending: 3 },
					{ period: 'Feb', borrowed: 52, returned: 48, pending: 4 },
					{ period: 'Mar', borrowed: 48, returned: 44, pending: 4 },
					{ period: 'Apr', borrowed: 61, returned: 58, pending: 3 },
					{ period: 'May', borrowed: 55, returned: 52, pending: 3 },
					{ period: 'Jun', borrowed: 67, returned: 63, pending: 4 }
				];
			case 'quarterly':
				return [
					{ period: 'Q1 2024', borrowed: 145, returned: 134, pending: 11 },
					{ period: 'Q2 2024', borrowed: 183, returned: 173, pending: 10 },
					{ period: 'Q3 2024', borrowed: 167, returned: 159, pending: 8 },
					{ period: 'Q4 2024', borrowed: 201, returned: 189, pending: 12 }
				];
			case 'annually':
				return [
					{ period: '2020', borrowed: 520, returned: 495, pending: 25 },
					{ period: '2021', borrowed: 580, returned: 545, pending: 35 },
					{ period: '2022', borrowed: 645, returned: 620, pending: 25 },
					{ period: '2023', borrowed: 696, returned: 655, pending: 41 },
					{ period: '2024', borrowed: 712, returned: 681, pending: 31 }
				];
			default:
				return [];
		}
	};

	const chartData = getChartData();

	const pieData = [
		{ name: 'Electronics', value: 120, color: '#3b82f6' },
		{ name: 'Stationery', value: 85, color: '#10b981' },
		{ name: 'Books', value: 90, color: '#f59e0b' },
		{ name: 'Tools', value: 25, color: '#ef4444' }
	];

	return (
		<div className="w-full h-full overflow-y-auto">
			<div className="p-4 bg-gray-50 min-h-full">
			{/* Top Metrics Row - Professional Spacing */}
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
				{[
					{ title: 'Students', subtitle: 'Registered users', value: animatedStats.students, change: '+20%', trend: 'up', icon: '👨‍🎓', color: 'blue' },
					{ title: 'Employees', subtitle: 'Active staff', value: animatedStats.employees, change: '+4%', trend: 'up', icon: '👥', color: 'green' },
					{ title: 'Borrowed Items', subtitle: 'Currently out', value: animatedStats.borrowed, change: '-15%', trend: 'down', icon: '📦', color: 'orange' },
					{ title: 'Available Items', subtitle: 'Ready to use', value: animatedStats.available, change: '+7%', trend: 'up', icon: '✅', color: 'purple' }
				].map((metric, index) => (
					<div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
								<p className="text-2xl font-bold text-gray-900 mb-2">
									{loading ? (
										<div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
									) : (
										metric.value.toLocaleString()
									)}
								</p>
								<div className="flex items-center space-x-2">
									<span className={`text-sm font-medium ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
										{metric.change}
									</span>
									<span className="text-xs text-gray-500">{metric.subtitle}</span>
								</div>
							</div>
							<div className="text-2xl">{metric.icon}</div>
						</div>
					</div>
				))}
			</div>

			{/* Main Analytics Section */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
				{/* Main Chart - Takes 2 columns */}
				<div className="lg:col-span-2 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between mb-4">
						<div>
							<h3 className="text-lg font-semibold text-gray-900">Borrowing Trends</h3>
							<p className="text-sm text-gray-500">Monthly activity overview</p>
						</div>
						<div className="flex rounded-lg bg-gray-100 p-1">
							<button 
								onClick={() => setActiveTimeRange('monthly')}
								className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
									activeTimeRange === 'monthly' 
										? 'text-white bg-blue-500 shadow-sm' 
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
								}`}
							>
								Monthly
							</button>
							<button 
								onClick={() => setActiveTimeRange('quarterly')}
								className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
									activeTimeRange === 'quarterly' 
										? 'text-white bg-blue-500 shadow-sm' 
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
								}`}
							>
								Quarterly
							</button>
							<button 
								onClick={() => setActiveTimeRange('annually')}
								className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
									activeTimeRange === 'annually' 
										? 'text-white bg-blue-500 shadow-sm' 
										: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
								}`}
							>
								Annually
							</button>
						</div>
					</div>
					<div className="h-56">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={chartData} margin={{ top: 15, right: 25, left: 15, bottom: 15 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
								<XAxis 
									dataKey="period" 
									stroke="#6b7280"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<YAxis 
									stroke="#6b7280"
									fontSize={12}
									tickLine={false}
									axisLine={false}
								/>
								<Tooltip 
									contentStyle={{
										backgroundColor: 'white',
										border: '1px solid #e5e7eb',
										borderRadius: '8px',
										boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
									}}
								/>
								<Bar dataKey="borrowed" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Borrowed" />
								<Bar dataKey="returned" fill="#10b981" radius={[4, 4, 0, 0]} name="Returned" />
								<Bar dataKey="pending" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Pending" />
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				{/* Side Panel - Takes 1 column */}
				<div className="space-y-4">
					{/* Most Borrowed Items */}
					<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Most Borrowed Items</h3>
						<div className="space-y-3">
							{[
								{ name: 'Laptop - Dell XPS 13', count: 45, trend: '+12%', color: 'bg-blue-500' },
								{ name: 'Projector - Epson', count: 32, trend: '+8%', color: 'bg-green-500' },
								{ name: 'Markers - Whiteboard', count: 28, trend: '-5%', color: 'bg-orange-500' },
								{ name: 'Calculator - Scientific', count: 24, trend: '+15%', color: 'bg-purple-500' }
							].map((item, index) => (
								<div key={index} className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<div className={`w-3 h-3 rounded-full ${item.color}`}></div>
										<div>
											<p className="text-sm font-medium text-gray-700">{item.name}</p>
											<p className="text-xs text-gray-500">{item.count} times borrowed</p>
										</div>
									</div>
									<span className={`text-xs font-medium ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
										{item.trend}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Low Stock Notifications */}
					<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
						<h3 className="text-lg font-semibold text-gray-900 mb-4">Low Stock Alerts</h3>
						<div className="space-y-3">
							{[
								{ name: 'A4 Paper', stock: 2, level: 'critical', icon: '📄' },
								{ name: 'Markers', stock: 5, level: 'low', icon: '🖊️' },
								{ name: 'USB Cables', stock: 8, level: 'warning', icon: '🔌' }
							].map((item, index) => (
								<div key={index} className={`p-2 rounded-lg ${
									item.level === 'critical' ? 'bg-red-50 border border-red-200' :
									item.level === 'low' ? 'bg-orange-50 border border-orange-200' :
									'bg-yellow-50 border border-yellow-200'
								}`}>
									<div className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<span className="text-lg">{item.icon}</span>
											<div>
												<p className="text-sm font-medium text-gray-700">{item.name}</p>
												<p className="text-xs text-gray-500">{item.stock} remaining</p>
											</div>
										</div>
										<span className={`text-xs font-medium px-2 py-1 rounded ${
											item.level === 'critical' ? 'bg-red-100 text-red-700' :
											item.level === 'low' ? 'bg-orange-100 text-orange-700' :
											'bg-yellow-100 text-yellow-700'
										}`}>
											{item.level}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Recent Transactions */}
				<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
						<button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View all</button>
					</div>
					<div className="space-y-4">
						{[
							{
								id: 'TRX-001',
								user: 'John Doe',
								item: 'Laptop - Dell XPS 13',
								type: 'borrowed',
								time: '2 hours ago',
								status: 'active'
							},
							{
								id: 'TRX-002',
								user: 'Jane Smith',
								item: 'Projector - Epson',
								type: 'returned',
								time: '4 hours ago',
								status: 'completed'
							},
							{
								id: 'TRX-003',
								user: 'Mike Johnson',
								item: 'Calculator - Scientific',
								type: 'borrowed',
								time: '6 hours ago',
								status: 'overdue'
							},
							{
								id: 'TRX-004',
								user: 'Sarah Wilson',
								item: 'Markers - Whiteboard',
								type: 'returned',
								time: '1 day ago',
								status: 'completed'
							},
							{
								id: 'TRX-005',
								user: 'Alex Brown',
								item: 'USB Hub - 4 Port',
								type: 'borrowed',
								time: '1 day ago',
								status: 'active'
							}
						].map((transaction, index) => (
							<div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
								<div className="flex items-center space-x-3">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
										transaction.type === 'borrowed' ? 'bg-blue-500' : 'bg-green-500'
									}`}>
										{transaction.type === 'borrowed' ? '↗' : '↙'}
									</div>
									<div>
										<div className="flex items-center space-x-2">
											<p className="text-sm font-medium text-gray-900">{transaction.user}</p>
											<span className={`text-xs px-2 py-1 rounded-full ${
												transaction.status === 'active' ? 'bg-blue-100 text-blue-700' :
												transaction.status === 'completed' ? 'bg-green-100 text-green-700' :
												'bg-red-100 text-red-700'
											}`}>
												{transaction.status}
											</span>
										</div>
										<p className="text-xs text-gray-500">{transaction.item}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-xs text-gray-500">{transaction.time}</p>
									<p className="text-xs text-gray-400">{transaction.id}</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Recent Activity (Admin) */}
				<div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
					<div className="flex items-center justify-between mb-4">
						<h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
						<button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View all</button>
					</div>
					<div className="space-y-4">
						{[
							{
								action: 'Item Added',
								description: 'Added 10 new calculators to inventory',
								user: 'Admin',
								time: '1 hour ago',
								icon: '➕',
								color: 'bg-green-500'
							},
							{
								action: 'User Registered',
								description: 'New student registered: Maria Garcia',
								user: 'System',
								time: '3 hours ago',
								icon: '👤',
								color: 'bg-blue-500'
							},
							{
								action: 'Item Updated',
								description: 'Updated laptop specifications',
								user: 'Admin',
								time: '5 hours ago',
								icon: '✏️',
								color: 'bg-orange-500'
							},
							{
								action: 'Overdue Alert',
								description: 'Generated overdue notification for 3 items',
								user: 'System',
								time: '8 hours ago',
								icon: '⚠️',
								color: 'bg-red-500'
							},
							{
								action: 'Backup Created',
								description: 'Daily database backup completed',
								user: 'System',
								time: '1 day ago',
								icon: '💾',
								color: 'bg-purple-500'
							}
						].map((activity, index) => (
							<div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
								<div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${activity.color}`}>
									{activity.icon}
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-gray-900">{activity.action}</p>
										<p className="text-xs text-gray-500 ml-2">{activity.time}</p>
									</div>
									<p className="text-sm text-gray-600 mt-1">{activity.description}</p>
									<p className="text-xs text-gray-400 mt-1">by {activity.user}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
		</div>
	);
};

export default AnalyticsDashboard;
