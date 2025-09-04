import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const Inventory = ({ standalone = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Form state
  const [formData, setFormData] = useState({
    itemName: '',
    specification: '',
    size: '',
    color: '',
    quantity: '',
    unit: '',
    location: '',
    category: '',
    status: 'Available'
  });

  // Sample data - replace with API calls
  const [sampleData] = useState([
    {
      id: 'INV-20240001',
      itemName: 'iPhone 15 Pro Max',
      specification: 'A17 Pro chip, ProRAW',
      size: '6.7"',
      color: 'Natural Titanium',
      quantity: 25,
      unit: 'pcs',
      location: 'Electronics Storage - A1',
      category: 'Electronics',
      status: 'Available',
      dateAdded: '2025-01-15'
    },
    {
      id: 'INV-20240002',
      itemName: 'Samsung Galaxy S24 Ultra',
      specification: 'Snapdragon 8 Gen 3',
      size: '6.8"',
      color: 'Titanium Black',
      quantity: 15,
      unit: 'pcs',
      location: 'Electronics Storage - A2',
      category: 'Electronics',
      status: 'Low Stock',
      dateAdded: '2025-01-16'
    },
    {
      id: 'INV-20240003',
      itemName: 'MacBook Air M2',
      specification: 'M2 chip, 8GB RAM, 256GB SSD',
      size: '13.6"',
      color: 'Space Gray',
      quantity: 8,
      unit: 'pcs',
      location: 'Computer Storage - B1',
      category: 'Computers',
      status: 'Available',
      dateAdded: '2025-01-17'
    },
    {
      id: 'INV-20240004',
      itemName: 'Logitech MX Master 3S',
      specification: 'Wireless Mouse, 4000 DPI',
      size: 'Standard',
      color: 'Graphite',
      quantity: 50,
      unit: 'pcs',
      location: 'Accessories Storage - C1',
      category: 'Accessories',
      status: 'Available',
      dateAdded: '2025-01-14'
    },
    {
      id: 'INV-20240005',
      itemName: 'Apple Watch Series 9',
      specification: 'GPS + Cellular, 45mm',
      size: '45mm',
      color: 'Midnight',
      quantity: 3,
      unit: 'pcs',
      location: 'Electronics Storage - A3',
      category: 'Wearables',
      status: 'Out of Stock',
      dateAdded: '2025-01-13'
    },
    {
      id: 'INV-20240006',
      itemName: 'Dell OptiPlex 3090',
      specification: 'Intel i5, 8GB RAM, 256GB SSD',
      size: 'Micro',
      color: 'Black',
      quantity: 12,
      unit: 'pcs',
      location: 'Computer Storage - B2',
      category: 'Computers',
      status: 'Available',
      dateAdded: '2025-01-12'
    },
    {
      id: 'INV-20240007',
      itemName: 'HP LaserJet Pro 400',
      specification: 'Monochrome Laser Printer',
      size: 'Standard',
      color: 'White',
      quantity: 6,
      unit: 'pcs',
      location: 'Office Equipment - C2',
      category: 'Office Supplies',
      status: 'Available',
      dateAdded: '2025-01-11'
    },
    {
      id: 'INV-20240008',
      itemName: 'Herman Miller Aeron Chair',
      specification: 'Ergonomic Office Chair, Size B',
      size: 'Medium',
      color: 'Graphite',
      quantity: 20,
      unit: 'pcs',
      location: 'Furniture Storage - D1',
      category: 'Furniture',
      status: 'Available',
      dateAdded: '2025-01-10'
    },
    {
      id: 'INV-20240009',
      itemName: 'iPad Pro 12.9"',
      specification: 'M2 chip, 128GB, WiFi + Cellular',
      size: '12.9"',
      color: 'Space Gray',
      quantity: 8,
      unit: 'pcs',
      location: 'Electronics Storage - A4',
      category: 'Electronics',
      status: 'Available',
      dateAdded: '2025-01-09'
    },
    {
      id: 'INV-20240010',
      itemName: 'Logitech C920 Webcam',
      specification: 'HD Pro Webcam, 1080p',
      size: 'Compact',
      color: 'Black',
      quantity: 30,
      unit: 'pcs',
      location: 'Accessories Storage - C3',
      category: 'Accessories',
      status: 'Available',
      dateAdded: '2025-01-08'
    },
    {
      id: 'INV-20240011',
      itemName: 'Microsoft Surface Studio 2',
      specification: 'Intel i7, 32GB RAM, 1TB SSD',
      size: '28"',
      color: 'Platinum',
      quantity: 4,
      unit: 'pcs',
      location: 'Computer Storage - B3',
      category: 'Computers',
      status: 'Low Stock',
      dateAdded: '2025-01-07'
    },
    {
      id: 'INV-20240012',
      itemName: 'Standing Desk Converter',
      specification: 'Height Adjustable, 36" Width',
      size: '36"',
      color: 'Oak',
      quantity: 15,
      unit: 'pcs',
      location: 'Furniture Storage - D2',
      category: 'Furniture',
      status: 'Available',
      dateAdded: '2025-01-06'
    }
  ]);

  useEffect(() => {
    setInventory(sampleData);
    setFilteredInventory(sampleData);
  }, [sampleData]);

  // Filter and search functionality
  useEffect(() => {
    let filtered = inventory;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.specification.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (categoryFilter !== 'All') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    setFilteredInventory(filtered);
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter, inventory]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredInventory.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editingItem) {
      // Update existing item
      setInventory(inventory.map(item => 
        item.id === editingItem.id 
          ? { ...formData, id: editingItem.id, dateAdded: editingItem.dateAdded }
          : item
      ));
    } else {
      // Create new item
      const newItem = {
        ...formData,
        id: `INV-${Date.now()}`,
        dateAdded: new Date().toISOString().split('T')[0]
      };
      setInventory([...inventory, newItem]);
    }

    setShowModal(false);
    setEditingItem(null);
    setFormData({
      itemName: '',
      specification: '',
      size: '',
      color: '',
      quantity: '',
      unit: '',
      location: '',
      category: '',
      status: 'Available'
    });
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setInventory(inventory.filter(item => item.id !== id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Low Stock': return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={standalone ? "min-h-screen bg-gray-50" : "bg-gray-50"}>
      {standalone && <Header title="Inventory Management" />}
      
      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
            <p className="text-gray-600">Manage your inventory items</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Item
          </button>
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
                  placeholder="Search by item name, specification, category, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Filter</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="All">All Categories</option>
                <option value="Electronics">Electronics</option>
                <option value="Computers">Computers</option>
                <option value="Accessories">Accessories</option>
                <option value="Wearables">Wearables</option>
                <option value="Furniture">Furniture</option>
                <option value="Office Supplies">Office Supplies</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status Filter</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              >
                <option value="All">All Status</option>
                <option value="Available">Available</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="In Transit">In Transit</option>
              </select>
            </div>
          </div>
          
          {/* Clear Filters Button */}
          {(searchTerm || statusFilter !== 'All' || categoryFilter !== 'All') && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setCategoryFilter('All');
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
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length} items
              {filteredInventory.length !== inventory.length && (
                <span className="text-gray-500 ml-1">
                  (filtered from {inventory.length} total)
                </span>
              )}
            </p>
            {(searchTerm || statusFilter !== 'All' || categoryFilter !== 'All') && (
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
<<<<<<< HEAD
              <option value={15}>15</option>
=======
              <option value={25}>25</option>
              <option value={50}>50</option>
>>>>>>> 3cd2cb345e882a5f66dbbc779dd1ea9e0fbb0243
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
<<<<<<< HEAD
          <div className="relative">
            {/* Absolutely Fixed Header */}
            <div className="absolute top-0 left-0 right-0 z-30 bg-gray-50 border-b shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full table-fixed min-w-[1200px]">
                  <thead>
                    <tr>
                      <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item ID</th>
                      <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item Name</th>
                      <th className="w-56 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Specification</th>
                      <th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Size</th>
                      <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Color</th>
                      <th className="w-24 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Quantity</th>
                      <th className="w-48 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Location</th>
                      <th className="w-32 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Category</th>
                      <th className="w-28 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
                      <th className="w-20 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
            
            {/* Table Body with Top Margin for Header */}
            <div className="pt-[49px]"> {/* Exact height of header */}
              <div className="overflow-x-auto">
                <div className="h-96 overflow-y-auto"> {/* Fixed height instead of max-h */}
                  <table className="w-full table-fixed min-w-[1200px]">
                    <tbody className="bg-white divide-y divide-gray-200">
                    {currentItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="w-32 px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 truncate" title={item.id}>{item.id}</td>
                        <td className="w-48 px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 truncate" title={item.itemName}>{item.itemName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="w-56 px-4 py-4 text-sm text-gray-900 truncate" title={item.specification}>{item.specification}</td>
                        <td className="w-20 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={item.size}>{item.size}</td>
                        <td className="w-24 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={item.color}>{item.color}</td>
                        <td className="w-24 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={`${item.quantity} ${item.unit}`}>{item.quantity} {item.unit}</td>
                        <td className="w-48 px-4 py-4 text-sm text-gray-900 truncate" title={item.location}>{item.location}</td>
                        <td className="w-32 px-4 py-4 whitespace-nowrap text-sm text-gray-900 truncate" title={item.category}>{item.category}</td>
                        <td className="w-28 px-4 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="w-20 px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="text-blue-600 hover:text-blue-900"
                              title="Edit"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Delete"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
        </div>        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length} items
            </div>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || totalPages <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1 || totalPages <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Page Numbers */}
            {(() => {
              const pageNumbers = [];
              const startPage = Math.max(1, currentPage - 2);
              const endPage = Math.min(totalPages, currentPage + 2);
              
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    disabled={totalPages <= 1}
                    className={`px-3 py-1 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                      currentPage === i
                        ? 'bg-red-700 text-white border-red-700'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              return pageNumbers;
            })()}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages || totalPages <= 1}
              className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
            >
              Last
            </button>
          </div>
        </div>
=======
          <div className="overflow-x-auto">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Item Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Specification</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Size</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Color</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Quantity</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.specification}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.size}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.color}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity} {item.unit}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{item.location}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
        </div>        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-700">
                Showing {indexOfFirstItem + 1} - {Math.min(indexOfLastItem, filteredInventory.length)} of {filteredInventory.length} items
              </div>
              <div className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                First
              </button>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Page Numbers */}
              {(() => {
                const pageNumbers = [];
                const startPage = Math.max(1, currentPage - 2);
                const endPage = Math.min(totalPages, currentPage + 2);
                
                for (let i = startPage; i <= endPage; i++) {
                  pageNumbers.push(
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i)}
                      className={`px-3 py-1 border rounded-lg text-sm ${
                        currentPage === i
                          ? 'bg-red-700 text-white border-red-700'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {i}
                    </button>
                  );
                }
                return pageNumbers;
              })()}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 text-sm"
              >
                Last
              </button>
            </div>
          </div>
        )}
>>>>>>> 3cd2cb345e882a5f66dbbc779dd1ea9e0fbb0243
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditingItem(null);
                    setFormData({
                      itemName: '',
                      specification: '',
                      size: '',
                      color: '',
                      quantity: '',
                      unit: '',
                      location: '',
                      category: '',
                      status: 'Available'
                    });
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.itemName}
                      onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Category</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Computers">Computers</option>
                      <option value="Accessories">Accessories</option>
                      <option value="Wearables">Wearables</option>
                      <option value="Furniture">Furniture</option>
                      <option value="Office Supplies">Office Supplies</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specification</label>
                  <textarea
                    value={formData.specification}
                    onChange={(e) => setFormData({...formData, specification: e.target.value})}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter item specifications..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <input
                      type="text"
                      value={formData.size}
                      onChange={(e) => setFormData({...formData, size: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({...formData, color: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="Available">Available</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                      <option value="In Transit">In Transit</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || ''})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                    <select
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select Unit</option>
                      <option value="pcs">pieces</option>
                      <option value="kg">kilograms</option>
                      <option value="lbs">pounds</option>
                      <option value="boxes">boxes</option>
                      <option value="sets">sets</option>
                      <option value="meters">meters</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="e.g., Electronics Storage - A1"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      setFormData({
                        itemName: '',
                        specification: '',
                        size: '',
                        color: '',
                        quantity: '',
                        unit: '',
                        location: '',
                        category: '',
                        status: 'Available'
                      });
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {standalone && <Footer />}
    </div>
  );
};

export default Inventory;
