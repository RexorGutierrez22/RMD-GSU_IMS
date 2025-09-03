import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
	const [animatedStats, setAnimatedStats] = useState({
		students: 0,
		employees: 0,
		borrowedItems: 0,
		lowStockItems: 0,
		availableItems: 0,
		consumableItems: 0,
		reusableItems: 0
	});

	// Animation effect for numbers
	useEffect(() => {
		const finalStats = {
			students: 150,
			employees: 45,
			borrowedItems: 25,
			lowStockItems: 8,
			availableItems: 295,
			consumableItems: 180,
			reusableItems: 140
		};

		const duration = 2000; // 2 seconds
		const steps = 60;
		const increment = duration / steps;

		let step = 0;
		const timer = setInterval(() => {
			step++;
			const progress = step / steps;
			const easeOutQuart = 1 - Math.pow(1 - progress, 4);

			setAnimatedStats({
				students: Math.round(finalStats.students * easeOutQuart),
				employees: Math.round(finalStats.employees * easeOutQuart),
				borrowedItems: Math.round(finalStats.borrowedItems * easeOutQuart),
				lowStockItems: Math.round(finalStats.lowStockItems * easeOutQuart),
				availableItems: Math.round(finalStats.availableItems * easeOutQuart),
				consumableItems: Math.round(finalStats.consumableItems * easeOutQuart),
				reusableItems: Math.round(finalStats.reusableItems * easeOutQuart)
			});

			if (step >= steps) {
				clearInterval(timer);
				setAnimatedStats(finalStats);
			}
		}, increment);

		return () => clearInterval(timer);
	}, []);

	// Chart data
	const borrowingTrendsData = [
		{ month: 'Jan', borrowed: 45, returned: 42, pending: 3 },
		{ month: 'Feb', borrowed: 52, returned: 48, pending: 4 },
		{ month: 'Mar', borrowed: 38, returned: 35, pending: 3 },
		{ month: 'Apr', borrowed: 61, returned: 58, pending: 3 },
		{ month: 'May', borrowed: 49, returned: 46, pending: 3 },
		{ month: 'Jun', borrowed: 67, returned: 64, pending: 3 }
	];

	const inventoryDistribution = [
		{ name: 'Available', value: 295, color: '#10B981' },
		{ name: 'Borrowed', value: 25, color: '#F59E0B' },
		{ name: 'Low Stock', value: 8, color: '#EF4444' }
	];

	return (
		<div className="h-full bg-gray-50 overflow-hidden">
			<div className="w-full px-1 lg:px-2 xl:px-3 py-3 space-y-3 h-full flex flex-col">

				{/* Top Metrics Row - Full Width Layout */}
				<div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
					{/* Students */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Students</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">{animatedStats.students}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-green-100 rounded-full">
									<svg className="w-2 h-2 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
									<span className="text-xs text-green-700 font-bold">+5.2%</span>
								</div>
							</div>
						</div>
					</div>

					{/* Employees */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Employees</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">{animatedStats.employees}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-green-100 rounded-full">
									<svg className="w-2 h-2 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
									</svg>
									<span className="text-xs text-green-700 font-bold">+2.1%</span>
								</div>
							</div>
						</div>
					</div>

					{/* Borrowed Items */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Borrowed</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">{animatedStats.borrowedItems}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-orange-100 rounded-full">
									<div className="w-1 h-1 bg-orange-500 rounded-full animate-pulse mr-1"></div>
									<span className="text-xs text-orange-700 font-bold">Active</span>
								</div>
							</div>
						</div>
					</div>

					{/* Low Stock Items */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.75 0L4.064 16.5c-.77.833.192 2.5 1.732 2.5z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Low Stock</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-red-600 transition-colors duration-300">{animatedStats.lowStockItems}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-red-100 rounded-full">
									<svg className="w-2 h-2 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.75 0L4.064 16.5c-.77.833.192 2.5 1.732 2.5z" />
									</svg>
									<span className="text-xs text-red-700 font-bold">Critical</span>
								</div>
							</div>
						</div>
					</div>

					{/* Available Items */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Available</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors duration-300">{animatedStats.availableItems}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-emerald-100 rounded-full">
									<div className="w-1 h-1 bg-emerald-500 rounded-full mr-1"></div>
									<span className="text-xs text-emerald-700 font-bold">Ready</span>
								</div>
							</div>
						</div>
					</div>

					{/* Total Items */}
					<div className="bg-white rounded-xl p-3 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md mb-2">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">Total Items</p>
							<p className="text-xl font-black text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">{animatedStats.availableItems + animatedStats.borrowedItems}</p>
							<div className="flex items-center justify-center">
								<div className="flex items-center px-2 py-1 bg-purple-100 rounded-full">
									<div className="w-1 h-1 bg-purple-500 rounded-full mr-1"></div>
									<span className="text-xs text-purple-700 font-bold">Total</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Main Content Row - Full Width Layout */}
				<div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-3">
					{/* Borrowing Trends Chart - Takes up more space */}
					<div className="xl:col-span-3 bg-white rounded-xl p-4 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
						<div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
							<div>
								<h3 className="text-lg font-bold text-gray-900 mb-1">Borrowing Trends</h3>
								<p className="text-xs text-gray-500">Monthly overview of borrowing activities</p>
							</div>
							<div className="flex bg-gray-50 rounded-lg p-1 shadow-inner">
								<button className="px-3 py-1 text-xs font-semibold text-blue-600 bg-white rounded-md shadow-sm hover:shadow-md transition-all duration-200">Monthly</button>
								<button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-md transition-all duration-200">Quarterly</button>
								<button className="px-3 py-1 text-xs font-medium text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-md transition-all duration-200">Annually</button>
							</div>
						</div>
						
						{/* Enhanced Chart with Recharts */}
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={borrowingTrendsData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
									<XAxis 
										dataKey="month" 
										stroke="#64748b"
										fontSize={11}
										fontWeight={500}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis 
										stroke="#64748b"
										fontSize={11}
										fontWeight={500}
										tickLine={false}
										axisLine={false}
									/>
									<Tooltip 
										contentStyle={{
											backgroundColor: 'white',
											border: '1px solid #e2e8f0',
											borderRadius: '8px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
											fontSize: '12px',
											fontWeight: '500'
										}}
									/>
									<Bar 
										dataKey="borrowed" 
										fill="#3b82f6" 
										radius={[4, 4, 0, 0]}
										name="Borrowed"
									/>
									<Bar 
										dataKey="returned" 
										fill="#10b981" 
										radius={[4, 4, 0, 0]}
										name="Returned"
									/>
									<Bar 
										dataKey="pending" 
										fill="#f59e0b" 
										radius={[4, 4, 0, 0]}
										name="Pending"
									/>
								</BarChart>
							</ResponsiveContainer>
						</div>

						{/* Enhanced Legend */}
						<div className="flex flex-wrap items-center justify-center space-x-6 pt-3 border-t border-gray-100">
							<div className="flex items-center space-x-2">
								<div className="w-3 h-3 bg-blue-500 rounded-full shadow-sm"></div>
								<span className="text-xs text-gray-700 font-semibold">Borrowed</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
								<span className="text-xs text-gray-700 font-semibold">Returned</span>
							</div>
							<div className="flex items-center space-x-2">
								<div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
								<span className="text-xs text-gray-700 font-semibold">Pending</span>
							</div>
						</div>
					</div>

					{/* Right Column - Inventory and Alerts */}
					<div className="xl:col-span-1 space-y-3">
						{/* Inventory Distribution Pie Chart */}
						<div className="bg-white rounded-xl p-3 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
							<div className="mb-3">
								<h3 className="text-sm font-bold text-gray-900 mb-1">Inventory Distribution</h3>
								<p className="text-xs text-gray-500">Current inventory breakdown</p>
							</div>
							<div className="h-32 mb-3">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={inventoryDistribution}
											cx="50%"
											cy="50%"
											innerRadius={25}
											outerRadius={50}
											paddingAngle={3}
											dataKey="value"
										>
											{inventoryDistribution.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.color} />
											))}
										</Pie>
										<Tooltip 
											contentStyle={{
												backgroundColor: 'white',
												border: '1px solid #e2e8f0',
												borderRadius: '8px',
												boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
												fontSize: '12px',
												fontWeight: '500'
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
							<div className="space-y-2">
								{inventoryDistribution.map((item, index) => (
									<div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
										<div className="flex items-center space-x-2">
											<div 
												className="w-3 h-3 rounded-full shadow-sm" 
												style={{ backgroundColor: item.color }}
											></div>
											<span className="text-xs font-semibold text-gray-700">{item.name}</span>
										</div>
										<span className="text-sm font-bold text-gray-900">{item.value}</span>
									</div>
								))}
							</div>
						</div>

						{/* Recent Alerts Panel */}
						<div className="bg-white rounded-xl p-3 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
							<div className="flex items-center justify-between mb-3">
								<div>
									<h3 className="text-sm font-bold text-gray-900 mb-1">Recent Alerts</h3>
									<p className="text-xs text-gray-500">Latest system notifications</p>
								</div>
								<div className="w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-sm"></div>
							</div>
							
							<div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
								{/* Critical Alert */}
								<div className="flex items-start space-x-2 p-2 bg-red-50 rounded-lg border border-red-100 hover:bg-red-100 transition-colors duration-200">
									<div className="w-2 h-2 bg-red-500 rounded-full mt-2 shadow-sm"></div>
									<div className="flex-1">
										<p className="text-xs font-bold text-gray-900 mb-1">Whiteboard Markers - Out of stock</p>
										<p className="text-xs text-red-600 font-medium mb-1">Requires immediate attention</p>
										<p className="text-xs text-gray-500">1 hour ago</p>
									</div>
								</div>

								{/* Warning Alert */}
								<div className="flex items-start space-x-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors duration-200">
									<div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 shadow-sm"></div>
									<div className="flex-1">
										<p className="text-xs font-bold text-gray-900 mb-1">Printer Paper - Only 2 units left</p>
										<p className="text-xs text-yellow-600 font-medium mb-1">Low stock warning</p>
										<p className="text-xs text-gray-500">10 min ago</p>
									</div>
								</div>

								{/* Info Alert */}
								<div className="flex items-start space-x-2 p-2 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-200">
									<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shadow-sm"></div>
									<div className="flex-1">
										<p className="text-xs font-bold text-gray-900 mb-1">New shipment arrived</p>
										<p className="text-xs text-blue-600 font-medium mb-1">50 items added to inventory</p>
										<p className="text-xs text-gray-500">2 hours ago</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Row - Category Overview Cards */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
					{/* Available Items */}
					<div className="bg-gradient-to-br from-green-50 via-white to-green-50 rounded-xl p-3 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
						<div className="absolute top-0 right-0 w-12 h-12 bg-green-100 rounded-full -translate-y-6 translate-x-6 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
						<div className="relative z-10 flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">Available Items</h3>
								<p className="text-2xl font-black text-green-600 group-hover:text-green-700 transition-colors duration-300">{animatedStats.availableItems}</p>
								<p className="text-xs text-gray-600 font-semibold">Ready to borrow</p>
							</div>
							<div className="text-right">
								<div className="w-full bg-green-200 rounded-full h-1 mb-1 overflow-hidden">
									<div className="bg-gradient-to-r from-green-500 to-green-600 h-1 rounded-full shadow-inner transition-all duration-1000 ease-out" style={{ width: '89%' }}></div>
								</div>
								<p className="text-xs text-gray-500 font-medium">89% available</p>
							</div>
						</div>
					</div>

					{/* Consumable Items */}
					<div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl p-3 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
						<div className="absolute top-0 right-0 w-12 h-12 bg-blue-100 rounded-full -translate-y-6 translate-x-6 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
						<div className="relative z-10 flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">Consumable Items</h3>
								<p className="text-2xl font-black text-blue-600 group-hover:text-blue-700 transition-colors duration-300">{animatedStats.consumableItems}</p>
								<p className="text-xs text-gray-600 font-semibold">Single-use items</p>
							</div>
							<div className="text-right">
								<div className="w-full bg-blue-200 rounded-full h-1 mb-1 overflow-hidden">
									<div className="bg-gradient-to-r from-blue-500 to-blue-600 h-1 rounded-full shadow-inner transition-all duration-1000 ease-out" style={{ width: '54%' }}></div>
								</div>
								<p className="text-xs text-gray-500 font-medium">54% of total</p>
							</div>
						</div>
					</div>

					{/* Reusable Items */}
					<div className="bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-xl p-3 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden">
						<div className="absolute top-0 right-0 w-12 h-12 bg-purple-100 rounded-full -translate-y-6 translate-x-6 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
						<div className="relative z-10 flex items-center space-x-3">
							<div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
								<svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-black text-gray-600 uppercase tracking-widest">Reusable Items</h3>
								<p className="text-2xl font-black text-purple-600 group-hover:text-purple-700 transition-colors duration-300">{animatedStats.reusableItems}</p>
								<p className="text-xs text-gray-600 font-semibold">Multi-use items</p>
							</div>
							<div className="text-right">
								<div className="w-full bg-purple-200 rounded-full h-1 mb-1 overflow-hidden">
									<div className="bg-gradient-to-r from-purple-500 to-purple-600 h-1 rounded-full shadow-inner transition-all duration-1000 ease-out" style={{ width: '42%' }}></div>
								</div>
								<p className="text-xs text-gray-500 font-medium">42% of total</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
