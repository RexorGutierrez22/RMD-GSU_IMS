import React from 'react';

const RecentTransactionsTable = () => {
	const transactions = [
		{
			id: 1,
			user: 'John Doe',
			action: 'borrowed',
			item: 'iPad Pro',
			time: '2 minutes ago',
			status: 'success',
			icon: (
				<svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
				</svg>
			),
			bgColor: 'bg-green-100'
		},
		{
			id: 2,
			user: 'Sarah Smith',
			action: 'returned',
			item: 'Laptop',
			time: '1 hour ago',
			status: 'success',
			icon: (
				<svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
				</svg>
			),
			bgColor: 'bg-blue-100'
		},
		{
			id: 3,
			user: 'Mike Johnson',
			action: 'overdue',
			item: 'Physics Textbook',
			time: '3 hours ago',
			status: 'warning',
			icon: (
				<svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
				</svg>
			),
			bgColor: 'bg-yellow-100'
		},
		{
			id: 4,
			user: 'Emily Davis',
			action: 'registered',
			item: 'New Account',
			time: '5 hours ago',
			status: 'info',
			icon: (
				<svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
					<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
				</svg>
			),
			bgColor: 'bg-purple-100'
		},
		{
			id: 5,
			user: 'Alex Wilson',
			action: 'borrowed',
			item: 'Projector',
			time: '6 hours ago',
			status: 'success',
			icon: (
				<svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
					<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
				</svg>
			),
			bgColor: 'bg-green-100'
		}
	];

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between mb-6">
				<h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
				<button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
					View All
				</button>
			</div>
			
			<div className="space-y-4">
				{transactions.map((transaction) => (
					<div key={transaction.id} className="flex items-start space-x-3">
						<div className={`w-8 h-8 ${transaction.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
							{transaction.icon}
						</div>
						<div className="flex-1 min-w-0">
							<p className="text-sm font-medium text-gray-900">
								{transaction.user} {transaction.action} {transaction.item}
							</p>
							<p className="text-sm text-gray-500">{transaction.time}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecentTransactionsTable;
