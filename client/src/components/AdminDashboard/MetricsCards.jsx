import React from 'react';

const MetricsCards = () => {
	const metrics = [
		{
			title: 'Unique Visitors',
			value: '24.7K',
			change: '+20%',
			changeType: 'positive',
			icon: (
				<svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
				</svg>
			),
			bgColor: 'bg-blue-100'
		},
		{
			title: 'Total Pageviews',
			value: '55.9K',
			change: '+4%',
			changeType: 'positive',
			icon: (
				<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
				</svg>
			),
			bgColor: 'bg-green-100'
		},
		{
			title: 'Bounce Rate',
			value: '54%',
			change: '-1.59%',
			changeType: 'negative',
			icon: (
				<svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
				</svg>
			),
			bgColor: 'bg-red-100'
		},
		{
			title: 'Visit Duration',
			value: '2m 56s',
			change: '+7%',
			changeType: 'positive',
			icon: (
				<svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			bgColor: 'bg-purple-100'
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
			{metrics.map((metric, index) => (
				<div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
					<div className="flex items-center justify-between mb-3">
						<div>
							<p className="text-sm text-gray-500 mb-1">{metric.title}</p>
							<h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
						</div>
						<div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center`}>
							{metric.icon}
						</div>
					</div>
					<div className="flex items-center text-sm">
						<span className={`font-medium ${
							metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
						}`}>
							{metric.change}
						</span>
						<span className="text-gray-500 ml-2">Vs last month</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default MetricsCards;
