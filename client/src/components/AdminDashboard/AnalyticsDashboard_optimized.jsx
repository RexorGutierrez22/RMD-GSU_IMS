import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

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

		const duration = 2000;
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

	// Sample data
	const borrowingTrendsData = [
		{ month: 'Jan', borrowed: 45, returned: 42, pending: 3 },
		{ month: 'Feb', borrowed: 52, returned: 48, pending: 4 },
		{ month: 'Mar', borrowed: 38, returned: 35, pending: 3 },
		{ month: 'Apr', borrowed: 61, returned: 58, pending: 3 },
		{ month: 'May', borrowed: 55, returned: 51, pending: 4 },
		{ month: 'Jun', borrowed: 67, returned: 62, pending: 5 }
	];

	const inventoryDistribution = [
		{ name: 'Electronics', value: 120, color: '#3b82f6' },
		{ name: 'Stationery', value: 85, color: '#10b981' },
		{ name: 'Books', value: 90, color: '#f59e0b' },
		{ name: 'Tools', value: 25, color: '#ef4444' }
	];

	return (
		<div className="h-full bg-gray-50">
			<div className="w-full p-2 space-y-2 h-full flex flex-col">

				{/* Top Metrics Row - Full Width Utilization */}
				<div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
					{/* Students */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Students</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-blue-600 transition-colors">{animatedStats.students}</p>
						</div>
					</div>

					{/* Employees */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Employees</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-green-600 transition-colors">{animatedStats.employees}</p>
						</div>
					</div>

					{/* Borrowed Items */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Borrowed</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-orange-600 transition-colors">{animatedStats.borrowedItems}</p>
						</div>
					</div>

					{/* Low Stock Items */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.75 0L4.064 16.5c-.77.833.192 2.5 1.732 2.5z" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Low Stock</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-red-600 transition-colors">{animatedStats.lowStockItems}</p>
						</div>
					</div>

					{/* Available Items */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Available</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-teal-600 transition-colors">{animatedStats.availableItems}</p>
						</div>
					</div>

					{/* Total Items */}
					<div className="bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 group">
						<div className="flex flex-col items-center text-center">
							<div className="w-7 h-7 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-1">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
								</svg>
							</div>
							<p className="text-xs font-semibold text-gray-600 uppercase mb-1">Total</p>
							<p className="text-lg font-black text-gray-900 group-hover:text-purple-600 transition-colors">{animatedStats.consumableItems + animatedStats.reusableItems}</p>
						</div>
					</div>
				</div>

				{/* Main Content Row - Full Width Charts */}
				<div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-2">
					{/* Borrowing Trends Chart - Takes More Space */}
					<div className="lg:col-span-3 bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
						<div className="flex items-center justify-between mb-3">
							<div>
								<h3 className="text-sm font-bold text-gray-900 mb-1">Borrowing Trends</h3>
								<p className="text-xs text-gray-500">Monthly activity overview</p>
							</div>
							<div className="flex bg-gray-50 rounded-lg p-1">
								<button className="px-2 py-1 text-xs font-semibold text-blue-600 bg-white rounded-md shadow-sm">Monthly</button>
								<button className="px-2 py-1 text-xs font-medium text-gray-500 hover:text-gray-700">Quarterly</button>
							</div>
						</div>
						
						<div className="h-48">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={borrowingTrendsData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
									<CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
									<XAxis 
										dataKey="month" 
										stroke="#64748b"
										fontSize={10}
										fontWeight={500}
										tickLine={false}
										axisLine={false}
									/>
									<YAxis 
										stroke="#64748b"
										fontSize={10}
										fontWeight={500}
										tickLine={false}
										axisLine={false}
										width={25}
									/>
									<Tooltip 
										contentStyle={{
											backgroundColor: 'white',
											border: '1px solid #e2e8f0',
											borderRadius: '6px',
											boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
											fontSize: '11px',
											fontWeight: '500'
										}}
									/>
									<Bar dataKey="borrowed" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Borrowed" />
									<Bar dataKey="returned" fill="#10b981" radius={[2, 2, 0, 0]} name="Returned" />
									<Bar dataKey="pending" fill="#f59e0b" radius={[2, 2, 0, 0]} name="Pending" />
								</BarChart>
							</ResponsiveContainer>
						</div>

						<div className="flex items-center justify-center space-x-4 pt-2 border-t border-gray-100 mt-2">
							<div className="flex items-center space-x-1">
								<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
								<span className="text-xs text-gray-700 font-medium">Borrowed</span>
							</div>
							<div className="flex items-center space-x-1">
								<div className="w-2 h-2 bg-green-500 rounded-full"></div>
								<span className="text-xs text-gray-700 font-medium">Returned</span>
							</div>
							<div className="flex items-center space-x-1">
								<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
								<span className="text-xs text-gray-700 font-medium">Pending</span>
							</div>
						</div>
					</div>

					{/* Right Column - Inventory and Alerts */}
					<div className="lg:col-span-1 space-y-2">
						{/* Inventory Distribution */}
						<div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
							<div className="mb-2">
								<h3 className="text-sm font-bold text-gray-900 mb-1">Inventory</h3>
								<p className="text-xs text-gray-500">Distribution</p>
							</div>
							<div className="h-32 mb-2">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={inventoryDistribution}
											cx="50%"
											cy="50%"
											innerRadius={20}
											outerRadius={50}
											paddingAngle={2}
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
												borderRadius: '6px',
												fontSize: '10px',
												fontWeight: '500'
											}}
										/>
									</PieChart>
								</ResponsiveContainer>
							</div>
							<div className="space-y-1">
								{inventoryDistribution.map((item, index) => (
									<div key={index} className="flex items-center justify-between">
										<div className="flex items-center space-x-2">
											<div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
											<span className="text-xs text-gray-700 font-medium">{item.name}</span>
										</div>
										<span className="text-xs text-gray-600 font-bold">{item.value}</span>
									</div>
								))}
							</div>
						</div>

						{/* Alerts */}
						<div className="bg-white rounded-lg p-3 shadow-md hover:shadow-lg transition-shadow duration-300">
							<div className="mb-2">
								<h3 className="text-sm font-bold text-gray-900 mb-1">Alerts</h3>
								<p className="text-xs text-gray-500">Recent</p>
							</div>
							<div className="space-y-2">
								<div className="flex items-center space-x-2 p-2 bg-red-50 rounded-lg">
									<div className="w-2 h-2 bg-red-500 rounded-full"></div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-bold text-gray-900 truncate">Markers</p>
										<p className="text-xs text-red-600 font-medium">Out of stock</p>
									</div>
								</div>
								<div className="flex items-center space-x-2 p-2 bg-yellow-50 rounded-lg">
									<div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-bold text-gray-900 truncate">Paper</p>
										<p className="text-xs text-yellow-600 font-medium">Low stock</p>
									</div>
								</div>
								<div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-bold text-gray-900 truncate">Shipment</p>
										<p className="text-xs text-blue-600 font-medium">Delivered</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Row - Category Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
					{/* Available Items */}
					<div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-bold text-gray-600 uppercase">Available Items</h3>
								<p className="text-xl font-black text-green-600">{animatedStats.availableItems}</p>
								<p className="text-xs text-gray-600">Ready to borrow</p>
							</div>
							<div className="text-right">
								<div className="w-12 bg-green-200 rounded-full h-1 mb-1">
									<div className="bg-green-500 h-1 rounded-full transition-all duration-1000" style={{ width: '89%' }}></div>
								</div>
								<p className="text-xs text-gray-500">89%</p>
							</div>
						</div>
					</div>

					{/* Consumable Items */}
					<div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-bold text-gray-600 uppercase">Consumable</h3>
								<p className="text-xl font-black text-blue-600">{animatedStats.consumableItems}</p>
								<p className="text-xs text-gray-600">Single-use items</p>
							</div>
							<div className="text-right">
								<div className="w-12 bg-blue-200 rounded-full h-1 mb-1">
									<div className="bg-blue-500 h-1 rounded-full transition-all duration-1000" style={{ width: '54%' }}></div>
								</div>
								<p className="text-xs text-gray-500">54%</p>
							</div>
						</div>
					</div>

					{/* Reusable Items */}
					<div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-3 shadow-md hover:shadow-lg transition-all duration-300">
						<div className="flex items-center space-x-3">
							<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
								<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
								</svg>
							</div>
							<div className="flex-1">
								<h3 className="text-xs font-bold text-gray-600 uppercase">Reusable</h3>
								<p className="text-xl font-black text-purple-600">{animatedStats.reusableItems}</p>
								<p className="text-xs text-gray-600">Multi-use items</p>
							</div>
							<div className="text-right">
								<div className="w-12 bg-purple-200 rounded-full h-1 mb-1">
									<div className="bg-purple-500 h-1 rounded-full transition-all duration-1000" style={{ width: '42%' }}></div>
								</div>
								<p className="text-xs text-gray-500">42%</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
