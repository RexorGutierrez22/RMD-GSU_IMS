import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert.jsx';
import QRCodeModal from '../components/QRCodeModal.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RegisterEmployee = () => {
	const navigate = useNavigate();
	const inputClass = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm";
	const errorInputClass = "w-full px-3 py-2 border border-red-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm";
	
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
	const [fieldErrors, setFieldErrors] = useState({});
	const [isCheckingUniqueness, setIsCheckingUniqueness] = useState(false);
	const [showQRModal, setShowQRModal] = useState(false);
	const [registeredData, setRegisteredData] = useState(null);

	const onChange = (e) => {
		const { name, value } = e.target;
		setForm(prev => ({ ...prev, [name]: value }));
		// Clear field-specific errors when user types
		if (fieldErrors[name]) {
			setFieldErrors(prev => ({ ...prev, [name]: null }));
		}
	};

	// Real-time uniqueness checking with debounce
	useEffect(() => {
		if (!form.empId && !form.email) return;
		
		const checkUniqueness = async () => {
			setIsCheckingUniqueness(true);
			try {
				const response = await axios.post('http://127.0.0.1:8001/api/check-employee-uniqueness', {
					empId: form.empId,
					email: form.email
				});
				
				setFieldErrors(prev => ({
					...prev,
					empId: response.data.empIdExists ? 'Employee ID already exists' : null,
					email: response.data.emailExists ? 'Email already exists' : null
				}));
			} catch (error) {
				console.error('Error checking uniqueness:', error);
			} finally {
				setIsCheckingUniqueness(false);
			}
		};

		const timeoutId = setTimeout(checkUniqueness, 500);
		return () => clearTimeout(timeoutId);
	}, [form.empId, form.email]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		
		try {
			const { data } = await axios.post('http://127.0.0.1:8001/api/employees', form);
			
			// Store registration data and show success
			setRegisteredData({
				...form,
				id: data.employee?.id || 'N/A',
				qrCode: data.qr_url || ''
			});
			
			setMsg('🎉 Registration Successful!');
			setAlertType('success');
			setShowQRModal(true);
			
			// Reset form
			setForm({
				firstName: '', lastName: '', middleName: '', email: '',
				empId: '', position: '', department: '', contact: ''
			});
			setFieldErrors({});
		} catch (err) {
			console.error('Registration error:', err);
			setAlertType('error');
			
			if (err.response?.data?.errors) {
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
			} else {
				setMsg(err.response?.data?.message 
					? `❌ Registration failed: ${err.response.data.message}`
					: '❌ Registration failed. Please check the fields and try again.'
				);
			}
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
												className={fieldErrors.lastName ? errorInputClass : inputClass}
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
												className={fieldErrors.firstName ? errorInputClass : inputClass}
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
											className={inputClass}
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
											className={fieldErrors.email ? errorInputClass : inputClass}
											required
										/>
										{fieldErrors.email && (
											<p className="text-red-500 text-xs mt-1">
												{Array.isArray(fieldErrors.email) ? fieldErrors.email[0] : fieldErrors.email}
											</p>
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
											className={fieldErrors.empId ? errorInputClass : inputClass}
											required
										/>
										{fieldErrors.empId && (
											<p className="text-red-500 text-xs mt-1">
												{Array.isArray(fieldErrors.empId) ? fieldErrors.empId[0] : fieldErrors.empId}
											</p>
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
											className={fieldErrors.contact ? errorInputClass : inputClass}
											required
										/>
										{fieldErrors.contact && (
											<p className="text-red-500 text-xs mt-1">{fieldErrors.contact[0]}</p>
										)}
									</div>

									{/* Position and Department */}
									<div className="grid grid-cols-2 gap-3">
										<input
											name="position"
											placeholder="Position"
											value={form.position}
											onChange={onChange}
											className={inputClass}
											required
										/>
										<input
											name="department"
											placeholder="Department"
											value={form.department}
											onChange={onChange}
											className={inputClass}
											required
										/>
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
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<Footer />

			{/* Alert Component - shows above modal */}
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
					studentData={registeredData} // The component handles both student & employee data
				/>
			)}
		</div>
	);
};

export default RegisterEmployee;
