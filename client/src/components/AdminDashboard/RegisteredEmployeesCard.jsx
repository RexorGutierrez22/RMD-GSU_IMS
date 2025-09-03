import React from 'react';

const RegisteredEmployeesCard = ({ totalEmployees = 89, change = '-3.2%' }) => {
	const isPositive = change.startsWith('+');

	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600 mb-1">Registered Employees</p>
					<p className="text-3xl font-bold text-gray-900">{totalEmployees.toLocaleString()}</p>
					<p className={`text-sm mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
						<span className="inline-flex items-center">
							<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
								{isPositive ? (
									<path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
								) : (
									<path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
								)}
							</svg>
							{change} from last month
						</span>
					</p>
				</div>
				<div className="bg-green-50 p-3 rounded-full">
					<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default RegisteredEmployeesCard;
