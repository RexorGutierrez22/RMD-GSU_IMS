import React, { useState, useEffect } from 'react';

const BorrowersRequestDashboard = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [priorityFilter, setPriorityFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [selectedRequest, setSelectedRequest] = useState(null);

	// Sample data - optimized structure
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

	// Optimized filtering - memoized for performance
	const filteredRequests = React.useMemo(() => {
		return borrowingRequests.filter(request => {
			const matchesSearch = 
				request.requesterName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				request.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				request.purpose.toLowerCase().includes(searchTerm.toLowerCase());
			
			const matchesStatus = statusFilter === 'All' || request.status === statusFilter;
			const matchesPriority = priorityFilter === 'All' || request.priority === priorityFilter;
			
			return matchesSearch && matchesStatus && matchesPriority;
		});
	}, [borrowingRequests, searchTerm, statusFilter, priorityFilter]);

	// Optimized pagination
	const { currentPageData, totalPages } = React.useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const pageData = filteredRequests.slice(startIndex, endIndex);
		const pages = Math.ceil(filteredRequests.length / itemsPerPage);
		
		return {
			currentPageData: pageData,
			totalPages: pages
		};
	}, [filteredRequests, currentPage, itemsPerPage]);

	// Optimized utility functions
	const getStatusColor = React.useCallback((status) => {
		const statusColors = {
			'Approved': 'bg-green-100 text-green-800',
			'Pending': 'bg-yellow-100 text-yellow-800',
			'Processing': 'bg-blue-100 text-blue-800',
			'Rejected': 'bg-red-100 text-red-800'
		};
		return statusColors[status] || 'bg-gray-100 text-gray-800';
	}, []);

	const getPriorityColor = React.useCallback((priority) => {
		const priorityColors = {
			'High': 'bg-red-100 text-red-800',
			'Medium': 'bg-yellow-100 text-yellow-800',
			'Low': 'bg-green-100 text-green-800'
		};
		return priorityColors[priority] || 'bg-gray-100 text-gray-800';
	}, []);

	// Optimized handlers
	const handleApprove = React.useCallback((requestId) => {
		console.log('Approve request:', requestId);
		// API call would go here
	}, []);

	const handleReject = React.useCallback((requestId) => {
		console.log('Reject request:', requestId);
		// API call would go here
	}, []);

	const handleProcess = React.useCallback((requestId) => {
		console.log('Process request:', requestId);
		// API call would go here
	}, []);

	const handleClearFilters = React.useCallback(() => {
		setSearchTerm('');
		setStatusFilter('All');
		setPriorityFilter('All');
		setCurrentPage(1);
	}, []);

	// Reset to first page when filters change
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, statusFilter, priorityFilter]);

	return (
		<div className="mx-auto px-4 py-6">
			{/* Header */}
			<div className="mb-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Borrowers Request</h1>
						<p className="mt-1 text-sm text-gray-600">Manage your borrowing requests efficiently</p>
					</div>
					<div className="mt-4 sm:mt-0">
						<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-sm transition-colors">
							<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m4-6H8" />
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
						<label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
							Search
						</label>
						<div className="relative">
							<svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								id="search"
								type="text"
								placeholder="Search by requester name, item, or purpose..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
							/>
						</div>
					</div>
					<div className="w-full md:w-48">
						<label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-2">
							Status Filter
						</label>
						<select
							id="statusFilter"
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
						>
							<option value="All">All Status</option>
							<option value="Pending">Pending</option>
							<option value="Processing">Processing</option>
							<option value="Approved">Approved</option>
							<option value="Rejected">Rejected</option>
						</select>
					</div>
					<div className="w-full md:w-48">
						<label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700 mb-2">
							Priority Filter
						</label>
						<select
							id="priorityFilter"
							value={priorityFilter}
							onChange={(e) => setPriorityFilter(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
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
							onClick={handleClearFilters}
							className="text-sm text-red-600 hover:text-red-800 font-medium flex items-center gap-1 transition-colors"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Clear all filters
						</button>
					</div>
				)}
			</div>

			{/* Results Summary */}
			<div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
				<div className="flex items-center gap-4">
					<p className="text-sm text-gray-600">
						Showing {filteredRequests.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} items
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
					<label htmlFor="itemsPerPage" className="text-gray-600">Items per page:</label>
					<select
						id="itemsPerPage"
						value={itemsPerPage}
						onChange={(e) => {
							setItemsPerPage(parseInt(e.target.value));
							setCurrentPage(1);
						}}
						className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
					</select>
				</div>
			</div>

			{/* Professional Table */}
			<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
				<div className="relative">
					{/* Fixed Header */}
					<div className="sticky top-0 z-10 bg-gray-50 border-b">
						<div className="overflow-x-auto">
							<table className="w-full table-fixed min-w-[1400px]">
								<thead>
									<tr>
										<th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">ID</th>
										<th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Requester</th>
										<th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item</th>
										<th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Category</th>
										<th className="w-16 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Qty</th>
										<th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Date</th>
										<th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Period</th>
										<th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Purpose</th>
										<th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Priority</th>
										<th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>
					
					{/* Table Body */}
					<div className="overflow-x-auto">
						<div className="h-96 overflow-y-auto">
							{filteredRequests.length === 0 ? (
								<div className="flex flex-col items-center justify-center h-full py-12">
									<svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
									</svg>
									<h3 className="text-lg font-medium text-gray-900 mb-1">No requests found</h3>
									<p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
								</div>
							) : (
								<table className="w-full table-fixed min-w-[1400px]">
									<tbody className="bg-white divide-y divide-gray-200">
										{currentPageData.map((request) => (
											<tr key={request.id} className="hover:bg-gray-50 transition-colors">
												<td className="w-24 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={request.id}>
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
														<div className="font-medium truncate">{request.itemName}</div>
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
												<td className="w-24 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{new Date(request.requestDate).toLocaleDateString()}
												</td>
												<td className="w-24 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
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
												<td className="w-20 px-4 py-4 whitespace-nowrap">
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
																	className="text-green-600 hover:text-green-900 transition-colors"
																	title="Approve"
																>
																	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																	</svg>
																</button>
																<button
																	onClick={() => handleReject(request.id)}
																	className="text-red-600 hover:text-red-900 transition-colors"
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
																className="text-blue-600 hover:text-blue-900 transition-colors"
																title="Process"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h4" />
																</svg>
															</button>
														)}
														<button
															onClick={() => setSelectedRequest(request)}
															className="text-indigo-600 hover:text-indigo-900 transition-colors"
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
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white px-6 py-3 rounded-lg shadow-sm border">
					<div className="flex items-center text-sm text-gray-600">
						<span>Page {currentPage} of {totalPages}</span>
						<span className="ml-4">
							Showing {filteredRequests.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)} of {filteredRequests.length} results
						</span>
					</div>
					
					<nav className="flex items-center space-x-2" aria-label="Pagination">
						<button
							onClick={() => setCurrentPage(1)}
							disabled={currentPage === 1}
							className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
						>
							First
						</button>
						
						<button
							onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
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
							className="p-2 text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
						>
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
							</svg>
						</button>
						
						<button
							onClick={() => setCurrentPage(totalPages)}
							disabled={currentPage === totalPages}
							className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:text-gray-300 disabled:cursor-not-allowed transition-colors"
						>
							Last
						</button>
					</nav>
				</div>
			)}

			{/* Request Detail Modal */}
			{selectedRequest && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
					<div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900">Request Details</h3>
							<button
								onClick={() => setSelectedRequest(null)}
								className="text-gray-400 hover:text-gray-600 transition-colors"
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
