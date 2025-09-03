import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert.jsx';
import QRCodeModal from '../components/QRCodeModal.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RegisterEmployee = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		middleName: '',
		email: '',
		empId: '',
		position: '',
		department: '',
		contact: '',
	});

	const [loading, setLoading] = useState(false);
	const [msg, setMsg] = useState('');
	const [alertType, setAlertType] = useState('error');
	const [qrUrl, setQrUrl] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
	const [showQRModal, setShowQRModal] = useState(false);
	const [registeredData, setRegisteredData] = useState(null);

	const onChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		// Clear field-specific errors when user types
		if (fieldErrors[e.target.name]) {
			setFieldErrors({ ...fieldErrors, [e.target.name]: null });
		}
	};

	// Real-time uniqueness checking with debounce
	useEffect(() => {
		const checkUniqueness = async () => {
			if (!form.empId && !form.email) return;
			
			setIsCheckingUniqueness(true);
			try {
				const response = await axios.post('http://127.0.0.1:8000/api/check-employee-uniqueness', {
					empId: form.empId,
					email: form.email
				});
				
				setFieldErrors({
					...fieldErrors,
					empId: response.data.empIdExists ? 'Employee ID already exists' : null,
					email: response.data.emailExists ? 'Email already exists' : null
				});
			} catch (error) {
				console.error('Error checking uniqueness:', error);
			} finally {
				setIsCheckingUniqueness(false);
			}
		};

		const timeoutId = setTimeout(checkUniqueness, 500); // Debounce for 500ms
		return () => clearTimeout(timeoutId);
	}, [form.empId, form.email]);
	const [qrUrl, setQrUrl] = useState('');

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		setQrUrl('');
		
		try {
			const { data } = await axios.post('http://127.0.0.1:8000/api/employees', form);
			
			// Store the registration data for the modal
			setRegisteredData({
				...form,
				id: data.employee?.id || 'N/A',
				qrCode: data.qr_url || ''
			});
			
			// Show success alert and modal
			setMsg(data.message || 'Employee registered successfully!');
			setAlertType('success');
			setQrUrl(data.qr_url || '');
			setShowQRModal(true);
			
			setMsg(data.message || 'Employee registered successfully!');
			setQrUrl(data.qr_url || '');
			// Reset form
			setForm({
				firstName: '',
				lastName: '',
				middleName: '',
				email: '',
				empId: '',
				position: '',
				department: '',
				contact: '',
			});
			setFieldErrors({});
		} catch (err) {
			console.error('Registration error:', err);
			setAlertType('error');
			if (err.response && err.response.data && err.response.data.errors) {
				// Handle validation errors
				const errors = err.response.data.errors;
				setFieldErrors(errors);
				const errorMessages = Object.values(errors).flat();
				if (errorMessages.some(msg => msg.includes('emp id has already been taken'))) {
					setMsg('❌ Employee ID already exists! Please use a different Employee ID.');
				} else if (errorMessages.some(msg => msg.includes('email has already been taken'))) {
					setMsg('❌ Email already exists! Please use a different email address.');
				} else {
					setMsg(`❌ Registration failed: ${errorMessages.join(', ')}`);
				}
			} else if (err.response && err.response.data && err.response.data.message) {
				setMsg(`❌ Registration failed: ${err.response.data.message}`);
			} else {
				setMsg('❌ Registration failed. Please check the fields and try again.');
			}
		} catch (err) {
			setMsg('Registration failed. Please check the fields and backend.');
			console.error(err);
		}
		setLoading(false);
	};

	return (
		<div className="h-screen flex flex-col bg-gray-50">
			{/* Header */}
			<Header 
				title="Register Employee" 
				rightContent={
					<button 
						onClick={() => navigate('/register')}
						className="text-white hover:text-gray-200 font-medium"
					>
						Back
					</button>
				} 
			/>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden">
				{/* Form Content */}
				<div className="bg-gray-50 py-8 px-6 flex flex-col justify-center h-full">
					<div className="max-w-md mx-auto w-full">
						{/* Form Card */}
						<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
							{/* Card Header */}
							<div className="px-6 py-4 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
								<h2 className="text-xl font-light text-gray-800 mb-1">Hello there!</h2>
								<p className="text-gray-600 text-sm">Please fill out the form to register as an employee.</p>
							</div>

							{/* Card Body */}
							<div className="px-6 py-6">
								<form onSubmit={onSubmit} className="space-y-4">
									{/* Name Fields */}
									<div className="grid grid-cols-2 gap-3">
										<div>
											<input
												name="lastName"
												placeholder="Last Name"
												value={form.lastName}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
											{fieldErrors.lastName && (
												<p className="text-red-500 text-xs mt-1">{fieldErrors.lastName[0]}</p>
											)}
										</div>
										<div>
											<input
												name="firstName"
												placeholder="First Name"
												value={form.firstName}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
											{fieldErrors.firstName && (
												<p className="text-red-500 text-xs mt-1">{fieldErrors.firstName[0]}</p>
											)}
										</div>
									</div>

									{/* Middle Name */}
									<div>
										<input
											name="middleName"
											placeholder="Middle Name (Optional)"
											value={form.middleName}
											onChange={onChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
										/>
									</div>

									{/* Email */}
									<div>
										<input
											name="email"
											type="email"
											placeholder="Email Address"
											value={form.email}
											onChange={onChange}
											className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm ${
												fieldErrors.email ? 'border-red-500' : ''
											}`}
											required
										/>
										{fieldErrors.email && (
											<p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
										)}
										{isCheckingUniqueness && form.email && (
											<p className="text-blue-500 text-xs mt-1">Checking email availability...</p>
										)}
									</div>

									{/* Employee ID */}
									<div>
										<input
											name="empId"
											placeholder="Employee ID"
											value={form.empId}
											onChange={onChange}
											className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm ${
												fieldErrors.empId ? 'border-red-500' : ''
											}`}
											required
										/>
										{fieldErrors.empId && (
											<p className="text-red-500 text-xs mt-1">{fieldErrors.empId}</p>
										)}
										{isCheckingUniqueness && form.empId && (
											<p className="text-blue-500 text-xs mt-1">Checking employee ID availability...</p>
										)}
									</div>

									{/* Contact */}
									<div>
										<input
											name="contact"
											placeholder="Contact Number"
											value={form.contact}
											onChange={onChange}
											className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
											required
										/>
										{fieldErrors.contact && (
											<p className="text-red-500 text-xs mt-1">{fieldErrors.contact[0]}</p>
										)}
									</div>

									{/* Position and Department */}
									<div className="grid grid-cols-2 gap-3">
										<div>
											<input
												name="position"
												placeholder="Position"
												value={form.position}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
										</div>
										<div>
											<input
												name="department"
												placeholder="Department"
												value={form.department}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
										</div>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										disabled={loading || fieldErrors.empId || fieldErrors.email}
										className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{loading ? 'REGISTERING...' : 'REGISTER EMPLOYEE'}
									</button>
								</form>
			<header className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
				<h1 className="text-xl font-medium">Register Employee</h1>
				<button 
					onClick={() => navigate('/register')}
					className="text-white hover:text-gray-200 font-medium"
				>
					Back
				</button>
			</header>

			{/* Main Content */}
			<main className="flex-1 overflow-hidden">
				<div className="grid grid-cols-1 lg:grid-cols-2 h-full">
					{/* Left Side - Form */}
					<div className="bg-gray-50 py-8 px-6 flex flex-col justify-center">
						<div className="max-w-md mx-auto w-full">
							{/* Form Card */}
							<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
								{/* Card Header */}
								<div className="px-6 py-4 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
									<h2 className="text-xl font-light text-gray-800 mb-1">Hello there!</h2>
									<p className="text-gray-600 text-sm">Please fill out the form to register as an employee.</p>
								</div>

								{/* Card Body */}
								<div className="px-6 py-6">
									<form onSubmit={onSubmit} className="space-y-4">
										{/* Name Fields */}
										<div className="grid grid-cols-2 gap-3">
											<div>
												<input
													name="lastName"
													placeholder="Last Name"
													value={form.lastName}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
											<div>
												<input
													name="firstName"
													placeholder="First Name"
													value={form.firstName}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
										</div>

										{/* Middle Name */}
										<div>
											<input
												name="middleName"
												placeholder="Middle Name (Optional)"
												value={form.middleName}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
											/>
										</div>

										{/* Contact and Email */}
										<div className="grid grid-cols-2 gap-3">
											<div>
												<input
													name="contact"
													placeholder="Contact Number"
													value={form.contact}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
											<div>
												<input
													name="email"
													type="email"
													placeholder="Email Address"
													value={form.email}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
										</div>

										{/* Employee ID */}
										<div>
											<input
												name="empId"
												placeholder="Employee ID Number"
												value={form.empId}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
										</div>

										{/* Position and Department */}
										<div className="grid grid-cols-2 gap-3">
											<div>
												<input
													name="position"
													placeholder="Position"
													value={form.position}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
											<div>
												<input
													name="department"
													placeholder="Department"
													value={form.department}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
													required
												/>
											</div>
										</div>

										{/* Submit Button */}
										<button
											type="submit"
											disabled={loading}
											className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{loading ? 'REGISTERING...' : 'REGISTER EMPLOYEE'}
										</button>
									</form>

									{/* Message Display */}
									{msg && (
										<div className={`mt-4 p-3 rounded-lg text-sm ${msg.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
											{msg}
										</div>
									)}
								</div>
							</div>
						</div>
					</div>

					{/* Right Side - QR Code Preview */}
					<div className="bg-gray-50 py-8 px-6 flex flex-col justify-center">
						<div className="max-w-md mx-auto w-full">
							<div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
								{qrUrl ? (
									<div>
										<h3 className="text-lg font-medium text-gray-800 mb-4">Registration Successful!</h3>
										<p className="text-sm text-gray-600 mb-4">Your QR Code:</p>
										<div className="mb-4">
											<img src={qrUrl} alt="Employee QR Code" className="mx-auto border rounded-lg" />
										</div>
										<a 
											href={qrUrl} 
											target="_blank" 
											rel="noopener noreferrer"
											className="text-blue-600 hover:text-blue-800 text-sm font-medium"
										>
											View Full Size
										</a>
									</div>
								) : (
									<div className="text-gray-400">
										<div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
											<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
											</svg>
										</div>
										<h3 className="text-lg font-medium text-gray-800 mb-2">QR Code Pending</h3>
										<p className="text-sm text-gray-600">Complete the form to generate your QR code</p>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<Footer />

			{/* Alert Component */}
			<Alert 
				message={msg} 
				type={alertType} 
				duration={5000}
				onClose={() => setMsg('')}
			/>

			{/* QR Code Modal */}
			{showQRModal && registeredData && (
				<QRCodeModal
					isOpen={showQRModal}
					onClose={() => setShowQRModal(false)}
					qrUrl={registeredData.qrCode}
					studentData={registeredData}
				/>
			)}
			<footer className="bg-red-600 text-white px-6 py-3 text-center">
				<p className="text-sm">© 2025 CIC INTERNS</p>
			</footer>
		</div>
	);
};

export default RegisterEmployee;
