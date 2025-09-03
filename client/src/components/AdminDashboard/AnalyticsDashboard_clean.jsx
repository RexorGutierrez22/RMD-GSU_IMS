import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AnalyticsDashboard = () => {
	const [animatedStats, setAnimatedStats] = useState({
		students: 0, employees: 0, borrowed: 0, lowStock: 0, available: 0, total: 0
	});

	useEffect(() => {
		const finalStats = { students: 150, employees: 45, borrowed: 25, lowStock: 8, available: 295, total: 320 };
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
	}, []);

	const chartData = [
		{ month: 'Jan', borrowed: 45, returned: 42, pending: 3 },
		{ month: 'Feb', borrowed: 52, returned: 48, pending: 4 },
		{ month: 'Mar', borrowed: 48, returned: 44, pending: 4 },
		{ month: 'Apr', borrowed: 61, returned: 58, pending: 3 },
		{ month: 'May', borrowed: 55, returned: 52, pending: 3 },
		{ month: 'Jun', borrowed: 67, returned: 63, pending: 4 }
	];

	const pieData = [
		{ name: 'Electronics', value: 120, color: '#3b82f6' },
		{ name: 'Stationery', value: 85, color: '#10b981' },
		{ name: 'Books', value: 90, color: '#f59e0b' },
		{ name: 'Tools', value: 25, color: '#ef4444' }
	];

	return (
		<div className="w-full h-full">
			{/* Top Metrics - 6 Cards Edge to Edge */}
			<div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-0 mb-0">
				{[
					{ title: 'STUDENTS', subtitle: 'Registered', value: animatedStats.students, icon: '👨‍🎓', bg: 'from-blue-500 to-blue-600' },
					{ title: 'EMPLOYEES', subtitle: 'Active staff', value: animatedStats.employees, icon: '👥', bg: 'from-green-500 to-green-600' },
					{ title: 'BORROWED', subtitle: 'Currently out', value: animatedStats.borrowed, icon: '📦', bg: 'from-orange-500 to-orange-600' },
					{ title: 'LOW STOCK', subtitle: 'Need attention', value: animatedStats.lowStock, icon: '⚠️', bg: 'from-red-500 to-red-600' },
					{ title: 'AVAILABLE', subtitle: 'Ready to use', value: animatedStats.available, icon: '✅', bg: 'from-emerald-500 to-emerald-600' },
					{ title: 'TOTAL', subtitle: 'All items', value: animatedStats.total, icon: '📊', bg: 'from-purple-500 to-purple-600' }
				].map((metric, index) => (
					<div key={index} className={`bg-gradient-to-br ${metric.bg} p-2 text-white border-r border-white/20 last:border-r-0 hover:brightness-110 transition-all duration-300`}>
						<div className="flex flex-col items-center text-center">
							<div className="text-lg mb-1">{metric.icon}</div>
							<div className="text-xs font-medium opacity-90 mb-1">{metric.title}</div>
							<div className="text-lg font-bold mb-1">{metric.value}</div>
							<div className="text-xs opacity-75">{metric.subtitle}</div>
						</div>
					</div>
				))}
			</div>

			{/* Main Content - Edge to Edge */}
			<div className="grid grid-cols-1 lg:grid-cols-4 gap-0 mb-0">
				{/* Chart - Takes 2.5 columns */}
				<div className="lg:col-span-3 bg-white p-3 border-r border-gray-200">
					<div className="flex items-center justify-between mb-2">
						<div>
							<h3 className="text-lg font-bold text-gray-800">Borrowing Trends</h3>
							<p className="text-sm text-gray-500">Monthly overview</p>
						</div>
						<div className="flex space-x-1">
							<button className="px-2 py-1 bg-blue-500 text-white text-xs rounded">Monthly</button>
							<button className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Quarterly</button>
						</div>
					</div>
					<ResponsiveContainer width="100%" height={220}>
						<BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
							<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
							<XAxis dataKey="month" fontSize={11} />
							<YAxis fontSize={11} />
							<Tooltip />
							<Bar dataKey="borrowed" fill="#3b82f6" radius={[2, 2, 0, 0]} />
							<Bar dataKey="returned" fill="#10b981" radius={[2, 2, 0, 0]} />
							<Bar dataKey="pending" fill="#f59e0b" radius={[2, 2, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				{/* Side Panel - Takes 1.5 columns */}
				<div className="bg-white p-3">
					<h3 className="text-lg font-bold text-gray-800 mb-2">Inventory Distribution</h3>
					<ResponsiveContainer width="100%" height={180}>
						<PieChart>
							<Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={65} dataKey="value">
								{pieData.map((entry, index) => (
									<Cell key={`cell-${index}`} fill={entry.color} />
								))}
							</Pie>
							<Tooltip />
						</PieChart>
					</ResponsiveContainer>
					<div className="space-y-1 mt-2">
						{pieData.map((item, index) => (
							<div key={index} className="flex items-center justify-between text-xs">
								<div className="flex items-center">
									<div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
									<span className="text-gray-600">{item.name}</span>
								</div>
								<span className="font-medium">{item.value}</span>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Bottom Row - 3 Cards Edge to Edge */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-0">
				{[
					{ title: 'AVAILABLE ITEMS', value: 295, subtitle: 'Ready to borrow', percentage: '89%', color: 'green', bg: 'bg-green-50', icon: '✅' },
					{ title: 'CONSUMABLE', value: 180, subtitle: 'Single-use items', percentage: '54%', color: 'blue', bg: 'bg-blue-50', icon: '🗑️' },
					{ title: 'REUSABLE', value: 140, subtitle: 'Multi-use items', percentage: '42%', color: 'purple', bg: 'bg-purple-50', icon: '🔄' }
				].map((item, index) => (
					<div key={index} className={`${item.bg} p-3 border-r border-gray-200 last:border-r-0 hover:shadow-lg transition-all duration-300`}>
						<div className="flex items-center justify-between">
							<div className="flex-1">
								<div className="text-xs font-medium text-gray-600 mb-1">{item.title}</div>
								<div className={`text-xl font-bold text-${item.color}-600 mb-1`}>{item.value}</div>
								<div className="text-xs text-gray-500 mb-1">{item.subtitle}</div>
								<div className={`w-full bg-${item.color}-200 rounded-full h-1`}>
									<div className={`bg-${item.color}-500 h-1 rounded-full`} style={{width: item.percentage}}></div>
								</div>
								<div className="text-xs text-gray-500 mt-1">{item.percentage} total</div>
							</div>
							<div className="text-xl ml-2">{item.icon}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default AnalyticsDashboard;
