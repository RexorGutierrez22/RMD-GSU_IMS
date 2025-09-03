import React from 'react';

const InventoryDashboard = () => {
	return (
		<div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
			<svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
			</svg>
			<h3 className="text-lg font-semibold text-gray-900 mb-2">Inventory Management</h3>
			<p className="text-gray-500">Manage inventory items, categories, and stock levels.</p>
		</div>
	);
};

export default InventoryDashboard;
