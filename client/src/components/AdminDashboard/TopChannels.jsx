import React from 'react';

const TopChannels = () => {
	const channels = [
		{ name: 'Google', visitors: '4.7K' },
		{ name: 'Facebook', visitors: '3.4K' },
		{ name: 'Threads', visitors: '2.9K' },
		{ name: 'Direct', visitors: '1.5K' }
	];

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900">Top Channels</h3>
				<button className="text-gray-400 hover:text-gray-600">
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
					</svg>
				</button>
			</div>
			
			<div className="space-y-4">
				<div className="flex items-center justify-between text-sm">
					<span className="text-gray-500">Source</span>
					<span className="text-gray-500">Visitors</span>
				</div>
				
				{channels.map((channel, index) => (
					<div key={index} className="flex items-center justify-between">
						<span className="font-medium text-gray-900">{channel.name}</span>
						<span className="text-gray-600">{channel.visitors}</span>
					</div>
				))}
			</div>
			
			<button className="w-full mt-6 py-2 px-4 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center">
				Channels Report
				<svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
				</svg>
			</button>
		</div>
	);
};

export default TopChannels;
