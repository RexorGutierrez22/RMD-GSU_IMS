import React from 'react';

const AdditionalMetrics = () => {
	const metrics = [
		{
			title: 'Avg. Client Rating',
			value: '7.8/10',
			change: '+20%',
			changeType: 'positive',
			icon: (
				<svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			),
			bgColor: 'bg-yellow-100'
		},
		{
			title: 'Instagram Followers',
			value: '5,934',
			change: '-3.5%',
			changeType: 'negative',
			icon: (
				<svg className="w-5 h-5 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
				</svg>
			),
			bgColor: 'bg-pink-100'
		},
		{
			title: 'Total Revenue',
			value: '$9,758',
			change: '+15%',
			changeType: 'positive',
			icon: (
				<svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
				</svg>
			),
			bgColor: 'bg-green-100'
		}
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
			{metrics.map((metric, index) => (
				<div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
					<div className="flex items-center mb-4">
						<div className={`w-10 h-10 ${metric.bgColor} rounded-lg flex items-center justify-center mr-3`}>
							{metric.icon}
						</div>
						<div>
							<p className="text-sm text-gray-500">{metric.title}</p>
							<h3 className="text-2xl font-bold text-gray-900">{metric.value}</h3>
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

export default AdditionalMetrics;
