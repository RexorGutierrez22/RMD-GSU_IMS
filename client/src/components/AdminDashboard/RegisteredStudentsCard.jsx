import React from 'react';

const RegisteredStudentsCard = ({ totalStudents = 1247, change = '+12.5%' }) => {
	return (
		<div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm font-medium text-gray-600 mb-1">Registered Students</p>
					<p className="text-3xl font-bold text-gray-900">{totalStudents.toLocaleString()}</p>
					<p className="text-sm text-green-600 mt-2">
						<span className="inline-flex items-center">
							<svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
							</svg>
							{change} from last month
						</span>
					</p>
				</div>
				<div className="bg-blue-50 p-3 rounded-full">
					<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
					</svg>
				</div>
			</div>
		</div>
	);
};

export default RegisteredStudentsCard;
