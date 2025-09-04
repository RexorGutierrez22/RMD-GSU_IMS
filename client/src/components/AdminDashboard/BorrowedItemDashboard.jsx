import React, { useState, useEffect } from 'react';

const BorrowedItemDashboard = () => {
	const [borrowedItems, setBorrowedItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [categoryFilter, setCategoryFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [sortColumn, setSortColumn] = useState('returnDate'); // 'returnDate' or 'daysLeft'
	const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

	// Sample borrowed items data
	const sampleBorrowedItems = [
		{
			id: 'BRW-001',
			itemName: 'Dell XPS 13 Laptop',
			specification: 'Intel i7, 16GB RAM, 512GB SSD',
			borrowerName: 'John Doe',
			borrowerId: '2021-00001',
			borrowerType: 'Student',
			department: 'College of Engineering',
			dateBorrowed: '2025-01-15',
			returnDate: '2025-01-22',
			actualReturnDate: null,
			status: 'Active',
			category: 'Electronics',
			location: 'Room 101'
		},
		{
			id: 'BRW-002',
			itemName: 'Epson Projector',
			specification: 'HD 1080p, 3000 lumens',
			borrowerName: 'Jane Smith',
			borrowerId: 'EMP-2023-001',
			borrowerType: 'Employee',
			department: 'IT Department',
			dateBorrowed: '2025-01-10',
			returnDate: '2025-01-17',
			actualReturnDate: '2025-01-16',
			status: 'Returned',
			category: 'Electronics',
			location: 'AV Room'
		},
		{
			id: 'BRW-003',
			itemName: 'Scientific Calculator',
			specification: 'TI-84 Plus CE',
			borrowerName: 'Mike Johnson',
			borrowerId: '2022-00045',
			borrowerType: 'Student',
			department: 'College of Mathematics',
			dateBorrowed: '2025-01-05',
			returnDate: '2025-01-12',
			actualReturnDate: null,
			status: 'Overdue',
			category: 'Educational',
			location: 'Math Lab'
		},
		{
			id: 'BRW-004',
			itemName: 'Whiteboard Markers Set',
			specification: 'Pack of 12, Assorted Colors',
			borrowerName: 'Sarah Wilson',
			borrowerId: 'EMP-2023-005',
			borrowerType: 'Employee',
			department: 'Faculty Office',
			dateBorrowed: '2025-01-08',
			returnDate: '2025-01-15',
			actualReturnDate: '2025-01-14',
			status: 'Returned',
			category: 'Stationery',
			location: 'Supply Room'
		},
		{
			id: 'BRW-005',
			itemName: 'USB Hub 4-Port',
			specification: 'USB 3.0, Compact Design',
			borrowerName: 'Alex Brown',
			borrowerId: '2021-00078',
			borrowerType: 'Student',
			department: 'College of Engineering',
			dateBorrowed: '2025-01-18',
			returnDate: '2025-01-25',
			actualReturnDate: null,
			status: 'Active',
			category: 'Electronics',
			location: 'IT Lab'
		},
		{
			id: 'BRW-006',
			itemName: 'Digital Camera',
			specification: 'Canon EOS M50, 24MP',
			borrowerName: 'Lisa Davis',
			borrowerId: '2020-00123',
			borrowerType: 'Student',
			department: 'College of Arts',
			dateBorrowed: '2025-01-12',
			returnDate: '2025-01-19',
			actualReturnDate: null,
			status: 'Due Today',
			category: 'Electronics',
			location: 'Media Room'
		},
		{
			id: 'BRW-007',
			itemName: 'Extension Cord 10m',
			specification: '3-Socket, Heavy Duty',
			borrowerName: 'Robert Chen',
			borrowerId: 'EMP-2023-012',
			borrowerType: 'Employee',
			department: 'Maintenance',
			dateBorrowed: '2025-01-14',
			returnDate: '2025-01-21',
			actualReturnDate: null,
			status: 'Active',
			category: 'Equipment',
			location: 'Storage A'
		},
		{
			id: 'BRW-008',
			itemName: 'Presentation Clicker',
			specification: 'Wireless, 30ft Range',
			borrowerName: 'Maria Garcia',
			borrowerId: 'EMP-2023-018',
			borrowerType: 'Employee',
			department: 'Academic Affairs',
			dateBorrowed: '2025-01-16',
			returnDate: '2025-01-23',
			actualReturnDate: null,
			status: 'Active',
			category: 'Electronics',
			location: 'Conference Room'
		}
	];

	useEffect(() => {
		setBorrowedItems(sampleBorrowedItems);
		setFilteredItems(sampleBorrowedItems);
	}, []);

	// Filter and search functionality
	useEffect(() => {
		let filtered = borrowedItems;

		if (searchTerm) {
			filtered = filtered.filter(item =>
				item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.borrowerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.category.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (statusFilter !== 'All') {
			filtered = filtered.filter(item => item.status === statusFilter);
		}

		if (categoryFilter !== 'All') {
			filtered = filtered.filter(item => item.category === categoryFilter);
		}

		// Sort by selected column
		filtered = filtered.sort((a, b) => {
			let valueA, valueB;
			
			if (sortColumn === 'returnDate') {
				valueA = new Date(a.returnDate);
				valueB = new Date(b.returnDate);
			} else if (sortColumn === 'daysLeft') {
				valueA = getDaysUntilReturnNumeric(a.returnDate, a.status);
				valueB = getDaysUntilReturnNumeric(b.returnDate, b.status);
			}
			
			if (sortOrder === 'asc') {
				return valueA - valueB;
			} else {
				return valueB - valueA;
			}
		});

		setFilteredItems(filtered);
		setCurrentPage(1);
	}, [searchTerm, statusFilter, categoryFilter, sortColumn, sortOrder, borrowedItems]);

	const getStatusColor = (status) => {
		switch (status) {
			case 'Active': return 'bg-green-100 text-green-800';
			case 'Overdue': return 'bg-red-100 text-red-800';
			case 'Due Today': return 'bg-yellow-100 text-yellow-800';
			case 'Returned': return 'bg-blue-100 text-blue-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const getDaysUntilReturn = (returnDate, status) => {
		if (status === 'Returned') return null;
		
		const today = new Date();
		const dueDate = new Date(returnDate);
		const diffTime = dueDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
		if (diffDays === 0) return 'Due today';
		return `${diffDays} days left`;
	};

	// Helper function to get numeric days for sorting
	const getDaysUntilReturnNumeric = (returnDate, status) => {
		if (status === 'Returned') return Infinity; // Put returned items at the end when sorting
		
		const today = new Date();
		const dueDate = new Date(returnDate);
		const diffTime = dueDate - today;
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		
		return diffDays; // Return raw number (negative for overdue, 0 for due today, positive for future)
	};

	const formatDate = (dateString) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	// Pagination
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleMarkReturned = (itemId) => {
		setBorrowedItems(prev =>
			prev.map(item =>
				item.id === itemId
					? { ...item, status: 'Returned', actualReturnDate: new Date().toISOString().split('T')[0] }
					: item
			)
		);
	};

	const handleExtendReturn = (itemId) => {
		const newReturnDate = prompt('Enter new return date (YYYY-MM-DD):');
		if (newReturnDate && /^\d{4}-\d{2}-\d{2}$/.test(newReturnDate)) {
			setBorrowedItems(prev =>
				prev.map(item =>
					item.id === itemId
						? { ...item, returnDate: newReturnDate }
						: item
				)
			);
		}
	};

	const handleSort = (column) => {
		if (sortColumn === column) {
			// If clicking the same column, toggle sort order
			setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
		} else {
			// If clicking a different column, set that column and default to ascending
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-2xl font-bold text-gray-900">Borrowed Items</h3>
					<p className="text-gray-600">Track and manage all borrowed items and their return dates</p>
				</div>
				<div className="flex items-center gap-3">
					<div className="text-sm text-gray-600">
						Total: <span className="font-semibold">{filteredItems.length}</span> items
					</div>
				</div>
			</div>

			{/* Search and Filters */}
			<div className="bg-white rounded-lg shadow-sm border p-6">
				<div className="flex flex-col lg:flex-row gap-4">
					<div className="flex-1">
						<div className="relative">
							<svg className="w-5 h-5 absolute left-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
							</svg>
							<input
								type="text"
								placeholder="Search by item name, borrower, ID, or department..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
							/>
						</div>
					</div>
					<div className="flex gap-4">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
						>
							<option value="All">All Status</option>
							<option value="Active">Active</option>
							<option value="Overdue">Overdue</option>
							<option value="Due Today">Due Today</option>
							<option value="Returned">Returned</option>
						</select>
						<select
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}
							className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
						>
							<option value="All">All Categories</option>
							<option value="Electronics">Electronics</option>
							<option value="Educational">Educational</option>
							<option value="Stationery">Stationery</option>
							<option value="Equipment">Equipment</option>
						</select>
						<div className="flex items-center gap-2">
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
							</select>
						</div>
					</div>
				</div>
			</div>

			{/* Table */}
			<div className="bg-white rounded-lg shadow-sm border overflow-hidden">
				<div className="relative">
					{/* Fixed Header */}
					<div className="absolute top-0 left-0 right-0 z-30 bg-gray-50 border-b shadow-sm">
						<div className="overflow-x-auto">
							<table className="w-full table-fixed min-w-[1500px]">
								<thead>
									<tr>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item ID</th>
										<th className="w-52 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item Details</th>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Category</th>
										<th className="w-44 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Borrower Info</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Date Borrowed</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
											<button
												onClick={() => handleSort('returnDate')}
												className="flex items-center gap-1 hover:text-gray-700 transition-colors"
												title={`Sort by Return Date (${sortColumn === 'returnDate' ? (sortOrder === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'})`}
											>
												<span>Return Date</span>
												{sortColumn === 'returnDate' && (
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														{sortOrder === 'asc' ? (
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
														) : (
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
														)}
													</svg>
												)}
											</button>
										</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
											<button
												onClick={() => handleSort('daysLeft')}
												className="flex items-center gap-1 hover:text-gray-700 transition-colors"
												title={`Sort by Days Left (${sortColumn === 'daysLeft' ? (sortOrder === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'})`}
											>
												<span>Days Left</span>
												{sortColumn === 'daysLeft' && (
													<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														{sortOrder === 'asc' ? (
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
														) : (
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
														)}
													</svg>
												)}
											</button>
										</th>
										<th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
									</tr>
								</thead>
							</table>
						</div>
					</div>

					{/* Table Body */}
					<div className="pt-[49px]">
						<div className="overflow-x-auto">
							<div className="h-96 overflow-y-auto">
								<table className="w-full table-fixed min-w-[1500px]">
									<tbody className="bg-white divide-y divide-gray-200">
										{currentItems.map((item) => (
											<tr key={item.id} className="hover:bg-gray-50">
												<td className="w-28 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={item.id}>
													{item.id}
												</td>
												<td className="w-52 px-4 py-4">
													<div className="flex items-center">
														<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
															<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
															</svg>
														</div>
														<div className="min-w-0 flex-1">
															<div className="text-sm font-medium text-gray-900 truncate" title={item.itemName}>
																{item.itemName}
															</div>
															<div className="text-xs text-gray-500 truncate" title={item.specification}>
																{item.specification}
															</div>
														</div>
													</div>
												</td>
												<td className="w-28 px-4 py-4 whitespace-nowrap text-sm text-gray-900" title={item.category}>
													{item.category}
												</td>
												<td className="w-44 px-4 py-4">
													<div className="text-sm font-medium text-gray-900" title={item.borrowerName}>
														{item.borrowerName}
													</div>
													<div className="text-xs text-gray-500" title={`${item.borrowerId} - ${item.department}`}>
														{item.borrowerId} • {item.borrowerType}
													</div>
													<div className="text-xs text-gray-400 truncate" title={item.department}>
														{item.department}
													</div>
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{formatDate(item.dateBorrowed)}
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{formatDate(item.returnDate)}
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm">
													<span className={`font-medium ${
														item.status === 'Overdue' ? 'text-red-600' :
														item.status === 'Due Today' ? 'text-yellow-600' :
														item.status === 'Returned' ? 'text-gray-500' : 'text-green-600'
													}`}>
														{getDaysUntilReturn(item.returnDate, item.status) || 'Returned'}
													</span>
												</td>
												<td className="w-28 px-4 py-4 whitespace-nowrap">
													<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
														{item.status}
													</span>
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium">
													<div className="flex items-center gap-2">
														{item.status !== 'Returned' && (
															<>
																<button
																	onClick={() => handleMarkReturned(item.id)}
																	className="text-blue-600 hover:text-blue-900"
																	title="Mark as Returned"
																>
																	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																	</svg>
																</button>
																<button
																	onClick={() => handleExtendReturn(item.id)}
																	className="text-green-600 hover:text-green-900"
																	title="Extend Return Date"
																>
																	<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
																	</svg>
																</button>
															</>
														)}
														<button
															className="text-gray-600 hover:text-gray-900"
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
			<div className="bg-white px-4 py-3 border border-gray-200 rounded-lg shadow-sm">
				<div className="flex items-center justify-between">
					<div className="text-sm text-gray-700">
						Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
						<span className="font-medium">{Math.min(indexOfLastItem, filteredItems.length)}</span> of{' '}
						<span className="font-medium">{filteredItems.length}</span> results
					</div>
					<div className="flex items-center space-x-1">
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => handlePageChange(page)}
								className={`px-3 py-2 text-sm font-medium rounded-md ${
									currentPage === page
										? 'bg-red-600 text-white'
										: 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
								}`}
							>
								{page}
							</button>
						))}
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BorrowedItemDashboard;
