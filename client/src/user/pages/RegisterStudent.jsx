import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userRegistration } from '../services/userAPI.js';

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
	const [qrUrl, setQrUrl] = useState('');

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		setQrUrl('');
		
		try {
			const { data } = await axios.post('http://127.0.0.1:8000/api/students', form);
			setMsg(data.message || 'Student registered successfully!');
			setQrUrl(data.qr_url || '');
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
		} catch (err) {
			setMsg('Registration failed. Please check the fields and backend.');
			console.error(err);
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
				<div className="grid grid-cols-1 lg:grid-cols-2 h-full">
					{/* Left Side - Form */}
					<div className="bg-gray-50 py-8 px-6 flex flex-col justify-center">
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

										{/* Student ID */}
										<div>
											<input
												name="studentId"
												placeholder="Student ID Number"
												value={form.studentId}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-sm"
												required
											/>
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
											disabled={loading}
											className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{loading ? 'REGISTERING...' : 'REGISTER STUDENT'}
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
											<img src={qrUrl} alt="Student QR Code" className="mx-auto border rounded-lg" />
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
			<footer className="bg-red-600 text-white px-6 py-3 text-center">
				<p className="text-sm">© 2025 CIC INTERNS</p>
			</footer>
		</div>
	);
};

export default RegisterStudent;
