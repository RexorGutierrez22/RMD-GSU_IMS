import React, { useState, useEffect } from 'react';

const ReturneeItemDashboard = () => {
	const [returneeItems, setReturneeItems] = useState([]);
	const [filteredItems, setFilteredItems] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('All');
	const [categoryFilter, setCategoryFilter] = useState('All');
	const [conditionFilter, setConditionFilter] = useState('All');
	const [usabilityFilter, setUsabilityFilter] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [sortColumn, setSortColumn] = useState('returnedDate');
	const [sortOrder, setSortOrder] = useState('desc');
	const [editingNote, setEditingNote] = useState(null);
	const [editingCondition, setEditingCondition] = useState(null);
	const [editingUsability, setEditingUsability] = useState(null);
	const [tempNoteValue, setTempNoteValue] = useState('');
	const [tempConditionValue, setTempConditionValue] = useState('');
	const [tempUsabilityValue, setTempUsabilityValue] = useState('');

	// Sample returnee items data
	const sampleReturneeItems = [
		{
			id: 'RET-001',
			itemName: 'Dell XPS 13 Laptop',
			specification: 'Intel i7, 16GB RAM, 512GB SSD',
			returnerName: 'John Doe',
			returnerId: '2021-00001',
			returnerType: 'Student',
			department: 'College of Engineering',
			returnedDate: '2025-01-22',
			condition: 'Good',
			conditionNotes: 'Minor scratches on lid',
			usability: 'Usable',
			status: 'Pending Inspection',
			category: 'Electronics',
			location: 'Room 101',
			originalBorrowDate: '2025-01-15'
		},
		{
			id: 'RET-002',
			itemName: 'Epson Projector',
			specification: 'HD 1080p, 3000 lumens',
			returnerName: 'Jane Smith',
			returnerId: 'EMP-2023-001',
			returnerType: 'Employee',
			department: 'IT Department',
			returnedDate: '2025-01-20',
			condition: 'Excellent',
			conditionNotes: 'No visible damage',
			usability: 'Usable',
			status: 'Inspected',
			category: 'Electronics',
			location: 'AV Room',
			originalBorrowDate: '2025-01-10'
		},
		{
			id: 'RET-003',
			itemName: 'Scientific Calculator',
			specification: 'TI-84 Plus CE',
			returnerName: 'Mike Johnson',
			returnerId: '2022-00045',
			returnerType: 'Student',
			department: 'College of Mathematics',
			returnedDate: '2025-01-18',
			condition: 'Fair',
			conditionNotes: 'Screen slightly faded, buttons work fine',
			usability: 'Usable',
			status: 'Needs Repair',
			category: 'Educational',
			location: 'Math Lab',
			originalBorrowDate: '2025-01-05'
		},
		{
			id: 'RET-004',
			itemName: 'Whiteboard Markers Set',
			specification: 'Pack of 12, Assorted Colors',
			returnerName: 'Sarah Wilson',
			returnerId: 'EMP-2023-005',
			returnerType: 'Employee',
			department: 'Faculty Office',
			returnedDate: '2025-01-19',
			condition: 'Good',
			conditionNotes: '3 markers dried out',
			usability: 'Partially Usable',
			status: 'Processed',
			category: 'Stationery',
			location: 'Supply Room',
			originalBorrowDate: '2025-01-08'
		},
		{
			id: 'RET-005',
			itemName: 'USB Hub 4-Port',
			specification: 'USB 3.0, Compact Design',
			returnerName: 'Alex Brown',
			returnerId: '2021-00078',
			returnerType: 'Student',
			department: 'College of Engineering',
			returnedDate: '2025-01-21',
			condition: 'Poor',
			conditionNotes: 'One port not working, cable damaged',
			usability: 'Not Usable',
			status: 'Damaged',
			category: 'Electronics',
			location: 'IT Lab',
			originalBorrowDate: '2025-01-18'
		},
		{
			id: 'RET-006',
			itemName: 'Digital Camera',
			specification: 'Canon EOS M50, 24MP',
			returnerName: 'Lisa Davis',
			returnerId: '2020-00123',
			returnerType: 'Student',
			department: 'College of Arts',
			returnedDate: '2025-01-23',
			condition: 'Excellent',
			conditionNotes: 'Perfect condition, all accessories included',
			usability: 'Usable',
			status: 'Inspected',
			category: 'Electronics',
			location: 'Media Lab',
			originalBorrowDate: '2025-01-12'
		}
	];

	useEffect(() => {
		// Initialize with sample data
		setReturneeItems(sampleReturneeItems);
		setFilteredItems(sampleReturneeItems);
	}, []);

	useEffect(() => {
		// Apply filters and search
		let filtered = returneeItems;

		if (searchTerm) {
			filtered = filtered.filter(item =>
				item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.returnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.returnerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.id.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (statusFilter !== 'All') {
			filtered = filtered.filter(item => item.status === statusFilter);
		}

		if (categoryFilter !== 'All') {
			filtered = filtered.filter(item => item.category === categoryFilter);
		}

		if (conditionFilter !== 'All') {
			filtered = filtered.filter(item => item.condition === conditionFilter);
		}

		if (usabilityFilter !== 'All') {
			filtered = filtered.filter(item => item.usability === usabilityFilter);
		}

		// Apply sorting
		if (sortColumn && sortOrder) {
			filtered.sort((a, b) => {
				let aVal = a[sortColumn];
				let bVal = b[sortColumn];

				if (sortColumn === 'returnedDate') {
					aVal = new Date(aVal);
					bVal = new Date(bVal);
				}

				if (sortOrder === 'asc') {
					return aVal > bVal ? 1 : -1;
				} else {
					return aVal < bVal ? 1 : -1;
				}
			});
		}

		setFilteredItems(filtered);
		setCurrentPage(1); // Reset to first page when filters change
	}, [returneeItems, searchTerm, statusFilter, categoryFilter, conditionFilter, usabilityFilter, sortColumn, sortOrder]);

	const getStatusColor = (status) => {
		switch (status) {
			case 'Pending Inspection': return 'bg-yellow-100 text-yellow-800';
			case 'Inspected': return 'bg-green-100 text-green-800';
			case 'Needs Repair': return 'bg-orange-100 text-orange-800';
			case 'Damaged': return 'bg-red-100 text-red-800';
			case 'Processed': return 'bg-blue-100 text-blue-800';
			default: return 'bg-gray-100 text-gray-800';
		}
	};

	const getConditionColor = (condition) => {
		switch (condition) {
			case 'Excellent': return 'text-green-600 font-medium';
			case 'Good': return 'text-blue-600 font-medium';
			case 'Fair': return 'text-yellow-600 font-medium';
			case 'Poor': return 'text-red-600 font-medium';
			default: return 'text-gray-600';
		}
	};

	const getUsabilityColor = (usability) => {
		switch (usability) {
			case 'Usable': return 'text-green-600 font-medium';
			case 'Partially Usable': return 'text-yellow-600 font-medium';
			case 'Not Usable': return 'text-red-600 font-medium';
			default: return 'text-gray-600';
		}
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

	const handleSort = (column) => {
		if (sortColumn === column) {
			setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const handleUpdateStatus = (itemId, newStatus) => {
		setReturneeItems(prev =>
			prev.map(item =>
				item.id === itemId
					? { ...item, status: newStatus }
					: item
			)
		);
	};

	const handleEditNote = (itemId, currentNote) => {
		setEditingNote(itemId);
		setTempNoteValue(currentNote);
	};

	const handleSaveNote = (itemId) => {
		setReturneeItems(prev =>
			prev.map(item =>
				item.id === itemId
					? { ...item, conditionNotes: tempNoteValue }
					: item
			)
		);
		setEditingNote(null);
		setTempNoteValue('');
	};

	const handleCancelEditNote = () => {
		setEditingNote(null);
		setTempNoteValue('');
	};

	const handleEditCondition = (itemId, currentCondition) => {
		setEditingCondition(itemId);
		setTempConditionValue(currentCondition);
	};

	const handleSaveCondition = (itemId) => {
		setReturneeItems(prev =>
			prev.map(item =>
				item.id === itemId
					? { ...item, condition: tempConditionValue }
					: item
			)
		);
		setEditingCondition(null);
		setTempConditionValue('');
	};

	const handleCancelEditCondition = () => {
		setEditingCondition(null);
		setTempConditionValue('');
	};

	const handleEditUsability = (itemId, currentUsability) => {
		setEditingUsability(itemId);
		setTempUsabilityValue(currentUsability);
	};

	const handleSaveUsability = (itemId) => {
		setReturneeItems(prev =>
			prev.map(item =>
				item.id === itemId
					? { ...item, usability: tempUsabilityValue }
					: item
			)
		);
		setEditingUsability(null);
		setTempUsabilityValue('');
	};

	const handleCancelEditUsability = () => {
		setEditingUsability(null);
		setTempUsabilityValue('');
	};

	const handleKeyPressNote = (e, itemId) => {
		if (e.key === 'Enter' && e.ctrlKey) {
			handleSaveNote(itemId);
		} else if (e.key === 'Escape') {
			handleCancelEditNote();
		}
	};

	const handleKeyPressCondition = (e, itemId) => {
		if (e.key === 'Enter') {
			handleSaveCondition(itemId);
		} else if (e.key === 'Escape') {
			handleCancelEditCondition();
		}
	};

	const handleKeyPressUsability = (e, itemId) => {
		if (e.key === 'Enter') {
			handleSaveUsability(itemId);
		} else if (e.key === 'Escape') {
			handleCancelEditUsability();
		}
	};

	// Get unique values for filters
	const categories = ['All', ...new Set(returneeItems.map(item => item.category))];
	const statuses = ['All', ...new Set(returneeItems.map(item => item.status))];
	const conditions = ['All', ...new Set(returneeItems.map(item => item.condition))];
	const usabilities = ['All', ...new Set(returneeItems.map(item => item.usability))];

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex justify-between items-center">
				<div>
					<h3 className="text-2xl font-bold text-gray-900">Returnee Items</h3>
					<p className="text-gray-600">Examine and manage the condition of all returned items</p>
					<p className="text-xs text-gray-500 mt-1">
						💡 Click the edit icon to modify condition notes. Use Ctrl+Enter to save notes, Escape to cancel.
					</p>
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
								placeholder="Search by item name, returner name, or ID..."
								className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>
					<div className="flex flex-wrap gap-3">
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							{statuses.map(status => (
								<option key={status} value={status}>{status}</option>
							))}
						</select>
						<select
							value={categoryFilter}
							onChange={(e) => setCategoryFilter(e.target.value)}
							className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							{categories.map(category => (
								<option key={category} value={category}>{category}</option>
							))}
						</select>
						<select
							value={conditionFilter}
							onChange={(e) => setConditionFilter(e.target.value)}
							className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							{conditions.map(condition => (
								<option key={condition} value={condition}>{condition}</option>
							))}
						</select>
						<select
							value={usabilityFilter}
							onChange={(e) => setUsabilityFilter(e.target.value)}
							className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							{usabilities.map(usability => (
								<option key={usability} value={usability}>{usability}</option>
							))}
						</select>
						<select
							value={itemsPerPage}
							onChange={(e) => setItemsPerPage(Number(e.target.value))}
							className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
						>
							<option value={10}>10 per page</option>
							<option value={25}>25 per page</option>
							<option value={50}>50 per page</option>
						</select>
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
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
											<button
												onClick={() => handleSort('condition')}
												className="flex items-center gap-1 hover:text-gray-700 transition-colors"
												title={`Sort by Condition (${sortColumn === 'condition' ? (sortOrder === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'})`}
											>
												<span>Condition</span>
												{sortColumn === 'condition' && (
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
												onClick={() => handleSort('usability')}
												className="flex items-center gap-1 hover:text-gray-700 transition-colors"
												title={`Sort by Usability (${sortColumn === 'usability' ? (sortOrder === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'})`}
											>
												<span>Usability</span>
												{sortColumn === 'usability' && (
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
										<th className="w-44 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Returner Info</th>
										<th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
											<button
												onClick={() => handleSort('returnedDate')}
												className="flex items-center gap-1 hover:text-gray-700 transition-colors"
												title={`Sort by Return Date (${sortColumn === 'returnedDate' ? (sortOrder === 'asc' ? 'Ascending' : 'Descending') : 'Click to sort'})`}
											>
												<span>Return Date</span>
												{sortColumn === 'returnedDate' && (
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
										<th className="w-40 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Condition Notes</th>
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
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm">
													{editingCondition === item.id ? (
														<div className="flex items-center gap-2">
															<select
																value={tempConditionValue}
																onChange={(e) => setTempConditionValue(e.target.value)}
																onKeyDown={(e) => handleKeyPressCondition(e, item.id)}
																className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-red-500 focus:border-red-500"
																autoFocus
															>
																<option value="Excellent">Excellent</option>
																<option value="Good">Good</option>
																<option value="Fair">Fair</option>
																<option value="Poor">Poor</option>
															</select>
															<button
																onClick={() => handleSaveCondition(item.id)}
																className="text-green-600 hover:text-green-800"
																title="Save"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																</svg>
															</button>
															<button
																onClick={handleCancelEditCondition}
																className="text-red-600 hover:text-red-800"
																title="Cancel"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
																</svg>
															</button>
														</div>
													) : (
														<div className="flex items-center gap-2">
															<span className={`font-medium ${getConditionColor(item.condition)}`}>
																{item.condition}
															</span>
															<button
																onClick={() => handleEditCondition(item.id, item.condition)}
																className="text-gray-400 hover:text-gray-600"
																title="Edit condition"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																</svg>
															</button>
														</div>
													)}
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm">
													{editingUsability === item.id ? (
														<div className="flex items-center gap-2">
															<select
																value={tempUsabilityValue}
																onChange={(e) => setTempUsabilityValue(e.target.value)}
																onKeyDown={(e) => handleKeyPressUsability(e, item.id)}
																className="text-xs border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-red-500 focus:border-red-500"
																autoFocus
															>
																<option value="Usable">Usable</option>
																<option value="Partially Usable">Partially Usable</option>
																<option value="Not Usable">Not Usable</option>
															</select>
															<button
																onClick={() => handleSaveUsability(item.id)}
																className="text-green-600 hover:text-green-800"
																title="Save"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																</svg>
															</button>
															<button
																onClick={handleCancelEditUsability}
																className="text-red-600 hover:text-red-800"
																title="Cancel"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
																</svg>
															</button>
														</div>
													) : (
														<div className="flex items-center gap-2">
															<span className={`font-medium ${getUsabilityColor(item.usability)}`}>
																{item.usability}
															</span>
															<button
																onClick={() => handleEditUsability(item.id, item.usability)}
																className="text-gray-400 hover:text-gray-600"
																title="Edit usability"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																</svg>
															</button>
														</div>
													)}
												</td>
												<td className="w-44 px-4 py-4">
													<div className="text-sm font-medium text-gray-900" title={item.returnerName}>
														{item.returnerName}
													</div>
													<div className="text-xs text-gray-500" title={`${item.returnerId} - ${item.department}`}>
														{item.returnerId} • {item.returnerType}
													</div>
													<div className="text-xs text-gray-400 truncate" title={item.department}>
														{item.department}
													</div>
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm text-gray-900">
													{formatDate(item.returnedDate)}
												</td>
												<td className="w-40 px-4 py-4">
													{editingNote === item.id ? (
														<div className="flex items-start gap-1">
															<textarea
																value={tempNoteValue}
																onChange={(e) => setTempNoteValue(e.target.value)}
																onKeyDown={(e) => handleKeyPressNote(e, item.id)}
																className="w-full text-xs border border-gray-300 rounded px-2 py-1 resize-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
																rows="2"
																placeholder="Enter condition notes..."
																autoFocus
															/>
															<div className="flex flex-col gap-1 mt-1">
																<button
																	onClick={() => handleSaveNote(item.id)}
																	className="text-green-600 hover:text-green-800"
																	title="Save"
																>
																	<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																	</svg>
																</button>
																<button
																	onClick={handleCancelEditNote}
																	className="text-red-600 hover:text-red-800"
																	title="Cancel"
																>
																	<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																		<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
																	</svg>
																</button>
															</div>
														</div>
													) : (
														<div className="group flex items-start gap-2">
															<div className="flex-1 text-xs text-gray-600 truncate" title={item.conditionNotes}>
																{item.conditionNotes || 'No notes added'}
															</div>
															<button
																onClick={() => handleEditNote(item.id, item.conditionNotes)}
																className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-opacity"
																title="Edit notes"
															>
																<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
																</svg>
															</button>
														</div>
													)}
												</td>
												<td className="w-28 px-4 py-4 whitespace-nowrap">
													<span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
														{item.status}
													</span>
												</td>
												<td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium">
													<div className="flex items-center gap-2">
														{item.status === 'Pending Inspection' && (
															<button
																onClick={() => handleUpdateStatus(item.id, 'Inspected')}
																className="text-green-600 hover:text-green-900"
																title="Mark as Inspected"
															>
																<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
																</svg>
															</button>
														)}
														<button
															className="text-blue-600 hover:text-blue-900"
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
			{filteredItems.length > 0 && (
				<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm border">
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
								Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
								<span className="font-medium">{Math.min(indexOfLastItem, filteredItems.length)}</span> of{' '}
								<span className="font-medium">{filteredItems.length}</span> results
							</p>
						</div>
						<div>
							<nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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
								{[...Array(totalPages)].map((_, index) => (
									<button
										key={index + 1}
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
	);
};

export default ReturneeItemDashboard;
