import React, { useState, useEffect } from 'react';

const BorrowersRequestDashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [priorityFilter, setPriorityFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedRequest, setSelectedRequest] = useState(null);

	// Sample data
	const [borrowingRequests] = useState([
		{
			id: 'BRQ-001',
			requesterName: 'John Doe',
			requesterEmail: 'john.doe@usep.edu.ph',
			itemName: 'Laptop Dell Inspiron',
			itemSpecification: '15.6" Intel Core i5 8GB RAM',
			category: 'Electronics',
			quantity: 1,
			requestDate: '2024-01-15',
			borrowPeriod: '7 days',
			purpose: 'Final thesis presentation',
			priority: 'High',
			status: 'Pending'
		},
		{
			id: 'BRQ-002',
			requesterName: 'Jane Smith',
			requesterEmail: 'jane.smith@usep.edu.ph',
			itemName: 'Projector Epson',
			itemSpecification: '3000 lumens HD ready',
			category: 'Electronics',
			quantity: 1,
			requestDate: '2024-01-14',
			borrowPeriod: '3 days',
			purpose: 'Class presentation',
			priority: 'Medium',
			status: 'Approved'
		},
		{
			id: 'BRQ-003',
			requesterName: 'Mike Johnson',
			requesterEmail: 'mike.johnson@usep.edu.ph',
			itemName: 'Microphone Wireless',
			itemSpecification: 'UHF Professional Grade',
			category: 'Audio',
			quantity: 2,
			requestDate: '2024-01-13',
			borrowPeriod: '1 day',
			purpose: 'School event hosting',
			priority: 'High',
			status: 'Processing'
		},
		{
			id: 'BRQ-004',
			requesterName: 'Sarah Wilson',
			requesterEmail: 'sarah.wilson@usep.edu.ph',
			itemName: 'Camera DSLR Canon',
			itemSpecification: 'EOS 90D with 18-55mm lens',
			category: 'Photography',
			quantity: 1,
			requestDate: '2024-01-12',
			borrowPeriod: '5 days',
			purpose: 'Student organization documentation',
			priority: 'Medium',
			status: 'Rejected'
		},
		{
			id: 'BRQ-005',
			requesterName: 'Robert Brown',
			requesterEmail: 'robert.brown@usep.edu.ph',
			itemName: 'Whiteboard Markers',
			itemSpecification: 'Set of 12 assorted colors',
			category: 'Stationery',
			quantity: 3,
			requestDate: '2024-01-11',
			borrowPeriod: '14 days',
			purpose: 'Classroom teaching activities',
			priority: 'Low',
			status: 'Approved'
		}
	]);

	// Filter requests based on search and filters
	const filteredRequests = borrowingRequests.filter(request => {
		const matchesSearch = request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
		
		const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
		const matchesPriority = priorityFilter === 'All' || request.priority === priorityFilter;
		
		return matchesSearch && matchesStatus && matchesPriority;
	});

	// Calculate current page data
	const currentPageData = filteredRequests.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);
	const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

	// Helper functions
	const getStatusColor = (status) => {
		switch (status) {
			case 'Approved': return 'bg-green-100 text-green-800';
			case 'Pending': return 'bg-yellow-100 text-yellow-800';
			case 'Processing': return 'bg-blue-100 text-blue-800';
			case 'Rejected': return 'bg-red-100 text-red-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const getPriorityColor = (priority) => {
		switch (priority) {
			case 'High': return 'bg-red-100 text-red-800';
			case 'Medium': return 'bg-yellow-100 text-yellow-800';
			case 'Low': return 'bg-green-100 text-green-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const handleApprove = (requestId) => {
		// Implementation for approve action
		console.log('Approve request:', requestId);
	};

	const handleReject = (requestId) => {
		// Implementation for reject action
		console.log('Reject request:', requestId);
	};

	const handleProcess = (requestId) => {
		// Implementation for process action
		console.log('Process request:', requestId);
	};

	return (
		<div className="mx-auto px-4 py-6">
			{/* Header */}
			<div className="mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Borrowers Request</h1>
						<p className="mt-1 text-sm text-gray-600">Manage your borrowing requests</p>
					</div>
					<div className="mt-4 sm:mt-0">
						<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm">
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
							</svg>
							Export Report
						</button>
					</div>
				</div>
			</div>

			{/* Filters Section */}
			<div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
				<div className="flex flex-col md:flex-row gap-4">
					<div className="flex-1">
						<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
						<div className="relative">
							<svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								type="text"
								placeholder="Search by requester name, item, or purpose..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>
					</div>
					<div className="w-full md:w-48">
						<label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
						>
							<option value="All">All Status</option>
							<option value="Pending">Pending</option>
							<option value="Processing">Processing</option>
							<option value="Approved">Approved</option>
							<option value="Rejected">Rejected</option>
						</select>
					</div>
					<div className="w-full md:w-48">
						<label className="block text-sm font-medium text-gray-700 mb-2">Priority Filter</label>
						<select
							value={priorityFilter}
							onChange={(e) => setPriorityFilter(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
						>
							<option value="All">All Priority</option>
							<option value="High">High</option>
							<option value="Medium">Medium</option>
							<option value="Low">Low</option>
						</select>
					</div>
				</div>
				
				{/* Clear Filters Button */}
				{(searchTerm || statusFilter !== 'All' || priorityFilter !== 'All') && (
					<div className="mt-4 pt-4 border-t border-gray-200">
						<button
							onClick={() => {
								setSearchTerm('');
								setStatusFilter('All');
								setPriorityFilter('All');
							}}
							className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Clear all filters
						</button>
					</div>
				)}
			</div>

			{/* Results Count and Summary */}
			<div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="flex items-center gap-4">
					<p className="text-sm text-gray-600">
						Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} items
						{filteredRequests.length !== borrowingRequests.length && (
							<span className="text-gray-500 ml-1">
								(filtered from {borrowingRequests.length} total)
							</span>
						)}
					</p>
					{(searchTerm || statusFilter !== 'All' || priorityFilter !== 'All') && (
						<span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
							<svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
							</svg>
							Filtered
						</span>
					)}
				</div>
				
				{/* Items per page selector */}
				<div className="flex items-center gap-2 text-sm">
					<span className="text-gray-600">Items per page:</span>
					<select
						value={itemsPerPage}
						onChange={(e) => {
							setItemsPerPage(parseInt(e.target.value));
							setCurrentPage(1);
						}}
						className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
				<div className="relative">
					{/* Absolutely Fixed Header */}
					<div className="absolute top-0 left-0 right-0 z-30 bg-gray-50 border-b shadow-sm">
						<div className="overflow-x-auto">
							<table className="w-full table-fixed min-w-[1400px]">
								<thead>
									<tr>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Request ID</th>
										<th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Requester Info</th>
										<th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item Details</th>
										<th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Category</th>
										<th className="w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Qty</th>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Request Date</th>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Borrow Period</th>
										<th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Purpose</th>
										<th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Priority</th>
										<th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					
					{/* Table Body with Top Margin for Header */}
					<div className="pt-[49px]">
						<div className="overflow-x-auto">
							<div className="h-96 overflow-y-auto">
								<table className="w-full table-fixed min-w-[1400px]">
									<tbody className="bg-white divide-y divide-gray-200">
										{currentPageData.map((request) => (
											<tr key={request.id} className="hover:bg-gray-50">
												<td className="w-28 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={request.id}>
													{request.id}
												</td>
												<td className="w-48 px-4 py-4 whitespace-nowrap">
													<div className="flex items-center">
														<div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
															<svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
															</svg>
														</div>
														<div className="min-w-0 flex-1">
															<div className="text-sm font-medium text-gray-900 truncate" title={request.requesterName}>
																{request.requesterName}
															</div>
															<div className="text-sm text-gray-500 truncate" title={request.requesterEmail}>
																{request.requesterEmail}
															</div>
														</div>
													</div>
												</td>
												<td className="w-40 px-4 py-4 text-sm text-gray-900">
													<div className="truncate" title={request.itemName}>
														<div className="font-medium">{request.itemName}</div>
														<div className="text-gray-500 text-xs truncate" title={request.itemSpecification}>
															{request.itemSpecification}
														</div>
													</div>
												</td>
												<td className="w-20 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={request.category}>
													{request.category}
												</td>
												<td className="w-16 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{request.quantity}
												</td>
												<td className="w-28 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{new Date(request.requestDate).toLocaleDateString()}
												</td>
												<td className="w-28 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{request.borrowPeriod}
												</td>
												<td className="w-40 px-4 py-4 text-sm text-gray-900 truncate" title={request.purpose}>
													{request.purpose}
												</td>
												<td className="w-20 px-4 py-4 whitespace-nowrap">
													<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(request.priority)}`}>
														{request.priority}
													</span>
												</td>
												<td className="w-24 px-4 py-4 whitespace-nowrap">
													<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
														{request.status}
													</span>
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium">
													<div className="flex items-center gap-2">
														{request.status === 'Pending' && (
															<>
																<button
																	onClick={() => handleApprove(request.id)}
																	className="text-green-600 hover:text-green-900"
																	title="Approve"
																>
																	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																	</svg>
																</button>
																<button
																	onClick={() => handleReject(request.id)}
																	className="text-red-600 hover:text-red-900"
																	title="Reject"
																>
																	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
																	</svg>
																</button>
															</>
														)}
														{request.status === 'Approved' && (
															<button
																onClick={() => handleProcess(request.id)}
																className="text-blue-600 hover:text-blue-900"
																title="Process"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
																</svg>
															</button>
														)}
														<button
															onClick={() => setSelectedRequest(request)}
															className="text-indigo-600 hover:text-indigo-900"
															title="View Details"
														>
															<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
															</svg>
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Pagination */}
			<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-6 py-3 rounded-lg shadow-sm border">
				<div className="flex items-center text-sm text-gray-600">
					<span>Page {currentPage} of {totalPages}</span>
					<span className="ml-4">
						Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
					</span>
				</div>
				
				<nav className="flex items-center space-x-2" aria-label="Pagination">
					<button
						onClick={() => setCurrentPage(1)}
						disabled={currentPage === 1}
						className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
					>
						First
					</button>
					
					<button
						onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
						className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
						</svg>
					</button>
					
					{/* Page numbers */}
					<div className="flex space-x-1">
						{Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
							const page = Math.max(1, currentPage - 2) + i;
							if (page > totalPages) return null;
							
							return (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={`px-3 py-1 text-sm rounded transition-colors ${
										page === currentPage
											? 'bg-red-600 text-white'
											: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
									}`}
								>
									{page}
								</button>
							);
						})}
					</div>
					
					<button
						onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
						disabled={currentPage === totalPages}
						className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
					>
						<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
					
					<button
						onClick={() => setCurrentPage(totalPages)}
						disabled={currentPage === totalPages}
						className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed"
					>
						Last
					</button>
				</nav>
			</div>

			{/* Request Detail Modal */}
			{selectedRequest && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
							<button
								onClick={() => setSelectedRequest(null)}
								className="text-gray-400 hover:text-gray-600"
							>
								<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium text-gray-700">Request ID:</p>
								<p className="text-sm text-gray-900">{selectedRequest.id}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Status:</p>
								<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
									{selectedRequest.status}
								</span>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Requester:</p>
								<p className="text-sm text-gray-900">{selectedRequest.requesterName}</p>
								<p className="text-xs text-gray-500">{selectedRequest.requesterEmail}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Priority:</p>
								<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(selectedRequest.priority)}`}>
									{selectedRequest.priority}
								</span>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Item:</p>
								<p className="text-sm text-gray-900">{selectedRequest.itemName}</p>
								<p className="text-xs text-gray-500">{selectedRequest.itemSpecification}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Quantity:</p>
								<p className="text-sm text-gray-900">{selectedRequest.quantity}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Request Date:</p>
								<p className="text-sm text-gray-900">{new Date(selectedRequest.requestDate).toLocaleString()}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-gray-700">Borrow Period:</p>
								<p className="text-sm text-gray-900">{selectedRequest.borrowPeriod}</p>
							</div>
							<div className="col-span-2">
								<p className="text-sm font-medium text-gray-700">Purpose:</p>
								<p className="text-sm text-gray-900">{selectedRequest.purpose}</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default BorrowersRequestDashboard;
