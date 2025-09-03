import React from 'react';

const BorrowersRequestDashboard = () => {
	return (
		<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
			<svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
			</svg>
			<h3 className="text-lg font-semibold text-gray-900 mb-2">Borrowers Request</h3>
			<p className="text-gray-500">Manage and review borrowing requests from students and employees.</p>
		</div>
	);
};

export default BorrowersRequestDashboard;
