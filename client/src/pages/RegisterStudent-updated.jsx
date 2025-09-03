import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert.jsx';
import QRCodeModal from '../components/QRCodeModal.jsx';

const RegisterStudent = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		firstName: '',
		lastName: '',
		middleName: '',
		email: '',
		studentId: '',
		course: '',
		yearLevel: '',
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
			if (!form.studentId && !form.email) return;
			
			setIsCheckingUniqueness(true);
			try {
				const response = await axios.post('http://127.0.0.1:8000/api/check-student-uniqueness', {
					studentId: form.studentId,
					email: form.email
				});
				
				setFieldErrors({
					...fieldErrors,
					studentId: response.data.studentIdExists ? 'Student ID already exists' : null,
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
	}, [form.studentId, form.email]);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		setQrUrl('');
		
		try {
			const { data } = await axios.post('http://127.0.0.1:8000/api/students', form);
			
			// Store the registration data for the modal
			setRegisteredData({
				...form,
				id: data.student?.id || 'N/A',
				qrCode: data.qr_url || ''
			});
			
			// Show success alert and modal
			setMsg(data.message || 'Student registered successfully!');
			setAlertType('success');
			setQrUrl(data.qr_url || '');
			setShowQRModal(true);
			
			// Reset form
			setForm({
				firstName: '',
				lastName: '',
				middleName: '',
				email: '',
				studentId: '',
				course: '',
				yearLevel: '',
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
				if (errorMessages.some(msg => msg.includes('student id has already been taken'))) {
					setMsg('❌ Student ID already exists! Please use a different Student ID.');
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
		}
		setLoading(false);
	};

	return (
		<div className="h-screen flex flex-col bg-gray-50">
			{/* Header */}
			<header className="bg-red-600 text-white px-6 py-4 flex justify-between items-center">
				<h1 className="text-xl font-medium">Register Student</h1>
				<button 
					onClick={() => navigate('/register')}
					className="text-white hover:text-gray-200 font-medium"
				>
					Back
				</button>
			</header>

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
								<p className="text-gray-600 text-sm">Please fill out the form to register as a student.</p>
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

									{/* Student ID */}
									<div>
										<input
											name="studentId"
											placeholder="Student ID"
											value={form.studentId}
											onChange={onChange}
											className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm ${
												fieldErrors.studentId ? 'border-red-500' : ''
											}`}
											required
										/>
										{fieldErrors.studentId && (
											<p className="text-red-500 text-xs mt-1">{fieldErrors.studentId}</p>
										)}
										{isCheckingUniqueness && form.studentId && (
											<p className="text-blue-500 text-xs mt-1">Checking student ID availability...</p>
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

									{/* Course and Year Level */}
									<div className="grid grid-cols-2 gap-3">
										<div>
											<input
												name="course"
												placeholder="Course"
												value={form.course}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
										</div>
										<div>
											<input
												name="yearLevel"
												placeholder="Year Level"
												value={form.yearLevel}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
										</div>
									</div>

									{/* Submit Button */}
									<button
										type="submit"
										disabled={loading || fieldErrors.studentId || fieldErrors.email}
										className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									>
										{loading ? 'REGISTERING...' : 'REGISTER STUDENT'}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="bg-red-600 text-white px-6 py-3 text-center">
				<p className="text-sm">© 2025 CIC INTERNS</p>
			</footer>

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
					studentData={registeredData}
					qrCodeUrl={registeredData.qrCode}
				/>
			)}
		</div>
	);
};

export default RegisterStudent;
