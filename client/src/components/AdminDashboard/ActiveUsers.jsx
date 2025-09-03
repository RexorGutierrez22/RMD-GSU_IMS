import React from 'react';

const ActiveUsers = () => {
	const liveVisitors = 364;
	const avgDaily = 224;
	const avgWeekly = '1.4K';
	const avgMonthly = '22.1K';

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
				<button className="text-gray-400 hover:text-gray-600">
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</button>
			</div>
			
			<div className="text-center mb-6">
				<div className="inline-flex items-center">
					<div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
					<span className="text-2xl font-bold text-gray-900">{liveVisitors}</span>
					<span className="text-sm text-gray-500 ml-1">Live visitors</span>
				</div>
			</div>
			
			{/* Simple line chart */}
			<div className="h-24 mb-6">
				<svg className="w-full h-full" viewBox="0 0 300 80">
					<polyline
						fill="none"
						stroke="#3b82f6"
						strokeWidth="2"
						points="10,60 50,50 90,55 130,45 170,40 210,35 250,30 290,25"
					/>
					<circle cx="290" cy="25" r="3" fill="#3b82f6" />
				</svg>
			</div>
			
			<div className="grid grid-cols-3 gap-4 text-center">
				<div>
					<p className="text-lg font-bold text-gray-900">{avgDaily}</p>
					<p className="text-xs text-gray-500">Avg. Daily</p>
				</div>
				<div>
					<p className="text-lg font-bold text-gray-900">{avgWeekly}</p>
					<p className="text-xs text-gray-500">Avg. Weekly</p>
				</div>
				<div>
					<p className="text-lg font-bold text-gray-900">{avgMonthly}</p>
					<p className="text-xs text-gray-500">Avg. Monthly</p>
				</div>
			</div>
		</div>
	);
};

export default ActiveUsers;
