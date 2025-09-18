import React, { useState, useEffect } from 'react';

const ReturneeItemDashboard = () => {
	const [returnItems, setReturnItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [conditionFilter, setConditionFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [editingCondition, setEditingCondition] = useState(null);
	const [editingUsability, setEditingUsability] = useState(null);
	const [editingNote, setEditingNote] = useState(null);
	const [sortColumn, setSortColumn] = useState('');
	const [sortOrder, setSortOrder] = useState('asc');

	const itemsPerPage = 10;

	// Mock data - replace with actual API call
	const mockData = [
		{
			id: 1,
			itemName: 'Laptop Dell XPS',
			returnerName: 'John Doe',
			returnedDate: '2024-03-15',
			condition: 'Good',
			usability: 'Functional',
			notes: 'Minor scratches on the lid',
			status: 'Inspected'
		}
	];

	useEffect(() => {
		setReturnItems(mockData);
		setFilteredItems(mockData);
	}, []);

	// Filter and search functionality
	useEffect(() => {
		let filtered = returnItems.filter(item => {
			const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.returnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.id.toString().includes(searchTerm);

			const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
			const matchesCondition = conditionFilter === 'All' || item.condition === conditionFilter;

			return matchesSearch && matchesStatus && matchesCondition;
		});

		// Apply sorting
		if (sortColumn && sortOrder) {
			filtered.sort((a, b) => {
				let aVal = a[sortColumn];
				let bVal = b[sortColumn];

				if (sortColumn === 'returnedDate') {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				} else if (typeof aVal === 'string') {
					aVal = aVal.toLowerCase();
					bVal = bVal.toLowerCase();
				}

				if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
				if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
				return 0;
			});
		}

		setFilteredItems(filtered);
		setCurrentPage(1);
	}, [returnItems, searchTerm, statusFilter, conditionFilter, sortColumn, sortOrder]);

	// Pagination
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
	const currentItems = filteredItems.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	return (
		<div className="bg-gray-50 min-h-screen">
			<div className="container mx-auto px-4 py-6">
				{/* Header Section */}
				<div className="flex justify-between items-center mb-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Returnee Items</h1>
						<p className="text-gray-600">Examine and manage the condition of all returned items</p>
					</div>
					<div className="flex items-center gap-3">
						<div className="text-sm text-gray-600">
							Total Items: <span className="font-semibold text-gray-900">{filteredItems.length}</span>
						</div>
					</div>
				</div>

				{/* Search and Filters */}
				<div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
					<div className="flex flex-col lg:flex-row gap-4">
						<div className="flex-1">
							<label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
							<div className="relative">
								<svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
								</svg>
								<input
									type="text"
									placeholder="Search by item name, returner name, or ID..."
									className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
								/>
							</div>
						</div>
						<div className="flex flex-wrap gap-3">
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
								<select
									value={statusFilter}
									onChange={(e) => setStatusFilter(e.target.value)}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
								>
									<option value="All">All Status</option>
									<option value="Pending Inspection">Pending Inspection</option>
									<option value="Inspected">Inspected</option>
									<option value="Damaged">Damaged</option>
								</select>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
								<select
									value={conditionFilter}
									onChange={(e) => setConditionFilter(e.target.value)}
									className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
								>
									<option value="All">All Conditions</option>
									<option value="Excellent">Excellent</option>
									<option value="Good">Good</option>
									<option value="Fair">Fair</option>
									<option value="Poor">Poor</option>
									<option value="Damaged">Damaged</option>
								</select>
							</div>
						</div>
					</div>
				</div>

				{/* Table */}
				<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Item ID
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Item Name
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Returner
									</th>
									<th 
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort('condition')}
									>
										Condition
									</th>
									<th 
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort('usability')}
									>
										Usability
									</th>
									<th 
										className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
										onClick={() => handleSort('returnedDate')}
									>
										Return Date
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Notes
									</th>
									<th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
										Status
									</th>
								</tr>
							</thead>
							<tbody className="bg-white divide-y divide-gray-200">
								{currentItems.map((item) => (
									<tr key={item.id} className="hover:bg-gray-50">
										<td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
											#{item.id}
										</td>
										<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
											{item.itemName}
										</td>
										<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
											{item.returnerName}
										</td>
										<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
											<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												item.condition === 'Excellent' ? 'bg-green-100 text-green-800' :
												item.condition === 'Good' ? 'bg-blue-100 text-blue-800' :
												item.condition === 'Fair' ? 'bg-yellow-100 text-yellow-800' :
												item.condition === 'Poor' ? 'bg-orange-100 text-orange-800' :
												'bg-red-100 text-red-800'
											}`}>
												{item.condition}
											</span>
										</td>
										<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
											{item.usability}
										</td>
										<td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
											{new Date(item.returnedDate).toLocaleDateString()}
										</td>
										<td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">
											{item.notes}
										</td>
										<td className="px-4 py-4 whitespace-nowrap">
											<span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
												item.status === 'Inspected' ? 'bg-green-100 text-green-800' :
												item.status === 'Pending Inspection' ? 'bg-yellow-100 text-yellow-800' :
												'bg-red-100 text-red-800'
											}`}>
												{item.status}
											</span>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					{/* No results message */}
					{currentItems.length === 0 && (
						<div className="text-center py-12">
							<svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
							</svg>
							<h3 className="mt-2 text-sm font-medium text-gray-900">No returnee items found</h3>
							<p className="mt-1 text-sm text-gray-500">No items match your current search and filter criteria.</p>
						</div>
					)}
				</div>

				{/* Pagination */}
				{filteredItems.length > 0 && totalPages > 1 && (
					<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm border mt-4">
						<div className="flex-1 flex justify-between sm:hidden">
							<button
								onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
								disabled={currentPage === 1}
								className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Previous
							</button>
							<button
								onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
								disabled={currentPage === totalPages}
								className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Next
							</button>
						</div>
						<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
							<div>
								<p className="text-sm text-gray-700">
									Showing <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
									<span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of{' '}
									<span className="font-medium">{filteredItems.length}</span> results
								</p>
							</div>
							<div>
								<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
									<button
										onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
										disabled={currentPage === 1}
										className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<span className="sr-only">Previous</span>
										<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
										</svg>
									</button>
									{Array.from({ length: totalPages }, (_, index) => (
										<button
											key={index}
											onClick={() => handlePageChange(index + 1)}
											className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
												currentPage === index + 1
													? 'z-10 bg-red-50 border-red-500 text-red-600'
													: 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
											}`}
										>
											{index + 1}
										</button>
									))}
									<button
										onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
										disabled={currentPage === totalPages}
										className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
									>
										<span className="sr-only">Next</span>
										<svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
											<path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
										</svg>
									</button>
								</nav>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default ReturneeItemDashboard;
