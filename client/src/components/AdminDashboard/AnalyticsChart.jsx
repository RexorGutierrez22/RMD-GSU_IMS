import React, { useState } from 'react';

const AnalyticsChart = () => {
	const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

	const generateRandomData = () => {
		return Array.from({length: 30}, (_, i) => ({
			day: i + 1,
			value: Math.random() * 200 + 20
		}));
	};

	const chartData = generateRandomData();

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-8">
			<div className="flex items-center justify-between mb-6">
				<div>
					<h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
					<p className="text-sm text-gray-500">Visitor analytics of last 30 days</p>
				</div>
				<div className="flex space-x-2">
					{['Monthly', 'Quarterly', 'Annually'].map((period) => (
						<button
							key={period}
							onClick={() => setSelectedPeriod(period)}
							className={`px-4 py-2 text-sm font-medium rounded-lg ${
								selectedPeriod === period
									? 'text-white bg-blue-600'
									: 'text-gray-500 hover:bg-gray-100'
							}`}
						>
							{period}
						</button>
					))}
				</div>
			</div>
			
			<div className="h-80 relative">
				<svg className="w-full h-full" viewBox="0 0 800 300">
					{/* Grid lines */}
					<defs>
						<pattern id="grid" width="26.67" height="60" patternUnits="userSpaceOnUse">
							<path d="M 26.67 0 L 0 0 0 60" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" />
					
					{/* Y-axis labels */}
					<text x="20" y="30" className="text-xs fill-gray-500">400</text>
					<text x="20" y="90" className="text-xs fill-gray-500">300</text>
					<text x="20" y="150" className="text-xs fill-gray-500">200</text>
					<text x="20" y="210" className="text-xs fill-gray-500">100</text>
					<text x="30" y="270" className="text-xs fill-gray-500">0</text>
					
					{/* Bars */}
					{chartData.map((data, i) => {
						const height = data.value;
						const x = 40 + i * 25;
						const isHighlight = [1, 9, 19, 28].includes(i);
						return (
							<rect
								key={i}
								x={x}
								y={250 - height}
								width="15"
								height={height}
								fill={isHighlight ? "#3b82f6" : "#93c5fd"}
								rx="2"
							/>
						);
					})}
					
					{/* X-axis labels */}
					{chartData.map((data, index) => (
						<text 
							key={data.day} 
							x={47 + index * 25} 
							y={285} 
							className="text-xs fill-gray-500" 
							textAnchor="middle"
						>
							{data.day}
						</text>
					))}
				</svg>
			</div>
		</div>
	);
};

export default AnalyticsChart;
