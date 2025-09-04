import React, { useState, useEffect } from 'react';

const CalendarDashboard = () => {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [calendarData, setCalendarData] = useState([]);
	const [isAnimating, setIsAnimating] = useState(false);

	// Add custom CSS animations
	useEffect(() => {
		const style = document.createElement('style');
		style.textContent = `
			@keyframes slideIn {
				from {
					opacity: 0;
					transform: translateX(-10px);
				}
				to {
					opacity: 1;
					transform: translateX(0);
				}
			}

			@keyframes slideUp {
				from {
					opacity: 0;
					transform: translateY(10px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes slideDown {
				from {
					opacity: 0;
					transform: translateY(-10px);
				}
				to {
					opacity: 1;
					transform: translateY(0);
				}
			}

			@keyframes fadeIn {
				from {
					opacity: 0;
				}
				to {
					opacity: 1;
				}
			}

			@keyframes countUp {
				from {
					transform: scale(0.8);
					opacity: 0.5;
				}
				to {
					transform: scale(1);
					opacity: 1;
				}
			}

			@keyframes selectedPulse {
				0%, 100% {
					border-color: rgb(59 130 246);
					box-shadow: 0 0 0 0 rgb(59 130 246 / 0.4);
				}
				50% {
					border-color: rgb(37 99 235);
					box-shadow: 0 0 0 4px rgb(59 130 246 / 0.1);
				}
			}

			.animate-slideIn {
				animation: slideIn 0.3s ease-out forwards;
			}

			.animate-slideUp {
				animation: slideUp 0.3s ease-out forwards;
			}

			.animate-slideDown {
				animation: slideDown 0.3s ease-out forwards;
			}

			.animate-fadeIn {
				animation: fadeIn 0.5s ease-out forwards;
			}

			.animate-countUp {
				animation: countUp 0.4s ease-out forwards;
			}

			.animate-selectedPulse {
				animation: selectedPulse 2s ease-in-out infinite;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Sample returnee data - this would come from your API
	useEffect(() => {
		setCalendarData([
			{ id: 1, item: 'Laptop - Dell Inspiron', borrower: 'John Doe', studentId: 'S2021001', dueDate: '2025-09-04', status: 'due-today', type: 'laptop' },
			{ id: 2, item: 'Projector - Epson EX3280', borrower: 'Jane Smith', studentId: 'S2021002', dueDate: '2025-09-05', status: 'upcoming', type: 'projector' },
			{ id: 3, item: 'Camera - Canon EOS R6', borrower: 'Mike Johnson', employeeId: 'E2021003', dueDate: '2025-09-06', status: 'upcoming', type: 'camera' },
			{ id: 4, item: 'Microscope - Olympus CX23', borrower: 'Sarah Wilson', studentId: 'S2021004', dueDate: '2025-09-07', status: 'upcoming', type: 'microscope' },
			{ id: 5, item: 'Tablet - iPad Pro', borrower: 'David Brown', employeeId: 'E2021005', dueDate: '2025-09-10', status: 'upcoming', type: 'tablet' },
			{ id: 6, item: 'External Hard Drive', borrower: 'Lisa Garcia', studentId: 'S2021006', dueDate: '2025-09-12', status: 'upcoming', type: 'storage' },
			{ id: 7, item: 'Wireless Mouse', borrower: 'Tom Anderson', studentId: 'S2021007', dueDate: '2025-09-15', status: 'upcoming', type: 'accessory' },
			{ id: 8, item: 'USB Hub', borrower: 'Emma Davis', employeeId: 'E2021008', dueDate: '2025-09-18', status: 'upcoming', type: 'accessory' },
			{ id: 9, item: 'Scientific Calculator', borrower: 'James Miller', studentId: 'S2021009', dueDate: '2025-09-20', status: 'upcoming', type: 'calculator' },
			{ id: 10, item: 'Laptop Charger', borrower: 'Nicole Taylor', studentId: 'S2021010', dueDate: '2025-09-25', status: 'upcoming', type: 'charger' },
			{ id: 11, item: 'Digital Camera', borrower: 'Robert Clark', studentId: 'S2021011', dueDate: '2025-09-28', status: 'upcoming', type: 'camera' },
			{ id: 12, item: 'Bluetooth Speaker', borrower: 'Amanda White', employeeId: 'E2021012', dueDate: '2025-09-30', status: 'upcoming', type: 'audio' },
		]);
	}, []);

	const getDaysInMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
	};

	const getFirstDayOfMonth = (date) => {
		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
	};

	const getItemsForDate = (date) => {
		const dateStr = date.toISOString().split('T')[0];
		return calendarData.filter(item => item.dueDate === dateStr);
	};

	const formatMonth = (date) => {
		return date.toLocaleDateString('en-US', { 
			year: 'numeric', 
			month: 'long' 
		});
	};

	const navigateMonth = (direction) => {
		if (isAnimating) return;
		
		setIsAnimating(true);
		setTimeout(() => {
			const newDate = new Date(currentDate);
			newDate.setMonth(currentDate.getMonth() + direction);
			setCurrentDate(newDate);
			setIsAnimating(false);
		}, 150);
	};

	const isToday = (date) => {
		const today = new Date();
		return date.toDateString() === today.toDateString();
	};

	const getStatusColor = (status) => {
		switch (status) {
			case 'overdue': return 'bg-red-500';
			case 'due-today': return 'bg-orange-500';
			case 'upcoming': return 'bg-blue-500';
			default: return 'bg-gray-500';
		}
	};

	const renderCalendarDays = () => {
		const daysInMonth = getDaysInMonth(currentDate);
		const firstDay = getFirstDayOfMonth(currentDate);
		const totalCells = 42; // 6 rows × 7 days = consistent grid size for all months
		const days = [];

		// Calculate the total days we need to fill (always 42 cells for uniform grid)
		for (let i = 0; i < totalCells; i++) {
			let cellDate = null;
			let day = null;
			let isCurrentMonth = false;

			if (i < firstDay) {
				// Previous month days
				const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
				day = prevMonth.getDate() - (firstDay - 1 - i);
				cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, day);
			} else if (i < firstDay + daysInMonth) {
				// Current month days
				day = i - firstDay + 1;
				cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
				isCurrentMonth = true;
			} else {
				// Next month days
				day = i - firstDay - daysInMonth + 1;
				cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
			}

			const itemsForDate = cellDate ? getItemsForDate(cellDate) : [];
			const isSelectedDate = selectedDate && cellDate && cellDate.toDateString() === selectedDate.toDateString();
			const isTodayDate = cellDate && isToday(cellDate);

			days.push(
				<div
					key={`cell-${i}`}
					onClick={() => cellDate && isCurrentMonth && setSelectedDate(cellDate)}
					className={`transition-all duration-300 ease-in-out flex flex-col rounded-lg border shadow-sm p-2 ${
						isCurrentMonth 
							? `cursor-pointer hover:shadow-md hover:border-gray-300 border-gray-200 bg-white ${
								isSelectedDate ? 'bg-blue-50 shadow-lg border-blue-500' : ''
							} ${isTodayDate ? 'bg-yellow-50 shadow-md border-yellow-500' : ''}` 
							: 'bg-gray-50 cursor-default opacity-50 border-gray-300'
					} ${isAnimating ? 'animate-pulse' : ''}`}
					style={{ 
						minHeight: '120px',
						height: '120px'
					}}
				>
					<div className="flex justify-between items-start mb-2 flex-shrink-0">
						<span className={`text-sm font-bold transition-colors duration-200 ${
							!isCurrentMonth 
								? 'text-gray-400' 
								: isTodayDate 
									? 'text-yellow-800' 
									: isSelectedDate 
										? 'text-blue-800' 
										: 'text-gray-700'
						}`}>
							{day}
						</span>
						{isCurrentMonth && itemsForDate.length > 0 && (
							<span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold min-w-[16px] text-center flex-shrink-0 transition-all duration-200 hover:bg-red-600">
								{itemsForDate.length}
							</span>
						)}
					</div>
					
					{/* Render return items as colored pills - only for current month */}
					<div className="flex-1 overflow-hidden">
						{isCurrentMonth && itemsForDate.length > 0 && (
							<div className="space-y-1 h-full">
								{itemsForDate.slice(0, 3).map((item, index) => (
									<div
										key={item.id}
										className={`text-xs px-2 py-1 rounded-md text-white truncate shadow-sm font-medium transition-all duration-300 transform hover:scale-105 ${getStatusColor(item.status)}`}
										title={`${item.borrower} - ${item.item}`}
									>
										{item.borrower.split(' ')[0]}
									</div>
								))}
								{itemsForDate.length > 3 && (
									<div className="text-xs text-gray-600 px-2 py-1 bg-gray-200 rounded-md text-center font-medium transition-all duration-300 hover:bg-gray-300">
										+{itemsForDate.length - 3}
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			);
		}

		return days;
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-100 h-full flex flex-col w-full">
			{/* Calendar Header - Compact */}
			<div className="flex items-center justify-between px-6 py-3 border-b border-gray-200 flex-shrink-0 transition-all duration-300">
				<div className="flex items-center space-x-4">
					<h2 className={`text-xl font-bold text-gray-900 transition-all duration-500 ${isAnimating ? 'animate-pulse' : ''}`}>
						{formatMonth(currentDate)}
					</h2>
				</div>
				
				<div className="flex items-center space-x-4 text-xs">
					<div className="flex items-center space-x-1">
						<button
							onClick={() => navigateMonth(-1)}
							disabled={isAnimating}
							className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
							title="Previous Month"
						>
							<svg className="w-4 h-4 text-gray-600 transition-transform duration-200 hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
							</svg>
						</button>
						<button
							onClick={() => setCurrentDate(new Date())}
							className="px-3 py-1.5 text-xs bg-red-700 text-white rounded-lg hover:bg-red-800 transition-all duration-200 transform hover:scale-105 hover:shadow-md font-medium"
						>
							Today
						</button>
						<button
							onClick={() => navigateMonth(1)}
							disabled={isAnimating}
							className="p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
							title="Next Month"
						>
							<svg className="w-4 h-4 text-gray-600 transition-transform duration-200 hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
							</svg>
						</button>
					</div>
					<div className="flex items-center transition-all duration-200 hover:scale-105">
						<div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
						<span className="text-gray-600">Overdue</span>
					</div>
					<div className="flex items-center transition-all duration-200 hover:scale-105">
						<div className="w-2 h-2 bg-orange-500 rounded-full mr-1 animate-pulse"></div>
						<span className="text-gray-600">Due Today</span>
					</div>
					<div className="flex items-center transition-all duration-200 hover:scale-105">
						<div className="w-2 h-2 bg-blue-500 rounded-full mr-1 animate-pulse"></div>
						<span className="text-gray-600">Upcoming</span>
					</div>
				</div>
			</div>

			<div className="flex flex-1 overflow-hidden w-full">
				{/* Calendar Grid - Full Width Layout */}
				<div className="flex-1 flex flex-col relative min-h-0 w-full transition-all duration-300">
					{/* Day Headers */}
					<div className="bg-gray-50 border-b border-gray-200 shadow-sm transition-all duration-300">
						<div className="grid grid-cols-7 w-full gap-2 p-4">
							{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
								<div key={day} className="px-3 py-2 text-center text-sm font-semibold text-gray-700 bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:bg-gray-100">
									{day}
								</div>
							))}
						</div>
					</div>

					{/* Calendar Days */}
					<div className="flex-1 min-h-0 w-full">
						<div className="h-full w-full p-4">
							<div className={`grid grid-cols-7 gap-2 transition-all duration-500 ${isAnimating ? 'opacity-50 transform scale-95' : 'opacity-100 transform scale-100'}`} style={{ minHeight: 'calc(100vh - 300px)' }}>
								{renderCalendarDays()}
							</div>
						</div>
					</div>
				</div>

				{/* Compact Sidebar - Minimal Width */}
				<div className="w-64 border-l border-gray-200 bg-gray-50 flex flex-col flex-shrink-0 transition-all duration-300 transform hover:bg-gray-100">
					<div className="p-3 border-b border-gray-300 flex-shrink-0 transition-all duration-300">
						<h3 className="text-sm font-bold text-gray-900 animate-fadeIn">
							{selectedDate ? `${selectedDate.toLocaleDateString('en-US', { 
								month: 'short', 
								day: 'numeric'
							})}` : 'Upcoming'}
						</h3>
					</div>

					<div className="flex-1 p-3 overflow-y-auto">
						<div className="space-y-4">
							{selectedDate ? (
								// Show returns for selected date
								getItemsForDate(selectedDate).length > 0 ? (
									getItemsForDate(selectedDate).map((item, index) => (
										<div key={item.id} className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 mb-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
											<div className="flex items-start justify-between mb-1">
												<div className="flex-1 min-w-0">
													<h4 className="font-semibold text-gray-900 text-xs truncate transition-colors duration-200 hover:text-blue-600">{item.item}</h4>
													<p className="text-gray-600 text-xs truncate">{item.borrower}</p>
												</div>
												<span className={`px-2 py-1 text-xs rounded-full text-white font-medium ${getStatusColor(item.status)} flex-shrink-0 transition-all duration-200 hover:scale-110`}>
													{item.type}
												</span>
											</div>
										</div>
									))
								) : (
									<div className="text-center py-8 animate-fadeIn">
										<svg className="w-8 h-8 text-gray-300 mx-auto mb-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
										</svg>
										<p className="text-gray-500 text-xs">No Returns</p>
									</div>
								)
							) : (
								// Show next few upcoming returns
								calendarData
									.filter(item => new Date(item.dueDate) >= new Date())
									.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
									.slice(0, 6)
									.map((item, index) => (
										<div key={item.id} className="bg-white rounded-lg p-2 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 mb-2 animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
											<div className="flex items-start justify-between mb-1">
												<div className="flex-1 min-w-0">
													<h4 className="font-semibold text-gray-900 text-xs truncate transition-colors duration-200 hover:text-blue-600">{item.item}</h4>
													<p className="text-gray-600 text-xs truncate">{item.borrower}</p>
												</div>
												<span className={`px-2 py-1 text-xs rounded-full text-white font-medium ${getStatusColor(item.status)} flex-shrink-0 transition-all duration-200 hover:scale-110`}>
													{item.type}
												</span>
											</div>
											<div className="text-xs text-gray-500">
												{new Date(item.dueDate).toLocaleDateString('en-US', { 
													month: 'short', 
													day: 'numeric'
												})}
											</div>
										</div>
									))
							)}
						</div>
					</div>

					{/* Compact Summary Footer */}
					<div className="p-3 border-t border-gray-300 bg-white flex-shrink-0 transition-all duration-300">
						<div className="grid grid-cols-3 gap-2 text-center">
							<div className="transition-all duration-200 hover:scale-105">
								<div className="text-lg font-bold text-red-600 animate-countUp">
									{calendarData.filter(item => item.status === 'overdue').length}
								</div>
								<div className="text-xs text-gray-600">Overdue</div>
							</div>
							<div className="transition-all duration-200 hover:scale-105">
								<div className="text-lg font-bold text-orange-600 animate-countUp">
									{calendarData.filter(item => item.status === 'due-today').length}
								</div>
								<div className="text-xs text-gray-600">Today</div>
							</div>
							<div className="transition-all duration-200 hover:scale-105">
								<div className="text-lg font-bold text-blue-600 animate-countUp">
									{calendarData.filter(item => item.status === 'upcoming').length}
								</div>
								<div className="text-xs text-gray-600">Upcoming</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CalendarDashboard;
