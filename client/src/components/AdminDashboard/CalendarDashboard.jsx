import React from 'react';

const CalendarDashboard = () => {
	return (
		<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
			<svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
			</svg>
			<h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar</h3>
			<p className="text-gray-500">View scheduled borrowings, returns, and maintenance activities.</p>
		</div>
	);
};

export default CalendarDashboard;
