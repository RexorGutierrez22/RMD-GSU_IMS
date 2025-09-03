import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

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
	const [qrUrl, setQrUrl] = useState('');
	const [msg, setMsg] = useState('');

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		setQrUrl('');
		try {
			const { data } = await axios.post('http://127.0.0.1:8000/api/students', form);
			setMsg(data.message || 'Registered!');
			setQrUrl(data.qr_url || '');
		} catch (err) {
			setMsg('Registration failed. Please check the fields and backend.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="h-screen flex flex-col bg-gray-50">
			<Header
				title="Register Student"
				rightContent={
					<button className="back-btn" onClick={() => navigate('/register')}>
						Back
					</button>
				}
			/>
			<main className="flex-1 overflow-hidden">
				<div className="grid grid-cols-1 lg:grid-cols-2 h-full">
					{/* Left side - Form */}
					<div className="bg-gray-50 py-1 px-4 flex flex-col justify-center">
						<div className="max-w-sm mx-auto w-full">
							{/* Material UI Style Card Container */}
							<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
								{/* Card Header */}
								<div className="px-5 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100">
									<h1 className="text-xl font-light text-gray-800 mb-1">Hello there!</h1>
									<p className="text-gray-600 text-xs">Please fill out the form to register as a student.</p>
								</div>

								{/* Card Content */}
								<div className="px-5 py-4">
									<form onSubmit={onSubmit} className="space-y-3">
										<div className="grid grid-cols-2 gap-2">
											<div>
												<input
													name="lastName"
													placeholder="Last Name"
													value={form.lastName}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
											<div>
												<input
													name="firstName"
													placeholder="First Name"
													value={form.firstName}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
										</div>

										<div className="w-24">
											<input
												name="middleName"
												placeholder="Middle Name"
												value={form.middleName}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
											/>
										</div>

										<div className="grid grid-cols-2 gap-2">
											<div>
												<input
													name="contact"
													placeholder="Contact Number"
													value={form.contact}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
											<div>
												<input
													name="email"
													placeholder="Email Address"
													type="email"
													value={form.email}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
										</div>

										<div className="grid grid-cols-2 gap-2">
											<div>
												<input
													name="studentId"
													placeholder="Student ID"
													value={form.studentId}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
											<div>
												<input
													name="course"
													placeholder="Course"
													value={form.course}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
										</div>

										<div>
											<input
												name="yearLevel"
												placeholder="Year Level"
												value={form.yearLevel}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
												required
											/>
										</div>
													value={form.gender}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												>
													<option value="">Gender</option>
													<option value="Male">Male</option>
													<option value="Female">Female</option>
												</select>
											</div>
										</div>

										<div>
											<input
												name="usep_email"
												type="email"
												placeholder="USeP Email"
												value={form.usep_email}
												onChange={onChange}
												className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
												required
											/>
										</div>

										<div className="grid grid-cols-2 gap-2">
											<div>
												<input
													name="id_number"
													placeholder="ID Number"
													value={form.id_number}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												/>
											</div>
											<div>
												<select
													name="college"
													value={form.college}
													onChange={onChange}
													className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white text-xs"
													required
												>
													<option value="">College</option>
													<option value="CCS">CCS</option>
													<option value="CBA">CBA</option>
													<option value="CIC">CIC</option>
													<option value="CEAT">CEAT</option>
													<option value="CTE">CTE</option>
													<option value="CAS">CAS</option>
													<option value="CON">CON</option>
													<option value="COG">COG</option>
												</select>
											</div>
										</div>

										<div className="pt-2">
											<button
												type="submit"
												disabled={loading}
												className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg text-xs"
											>
												{loading ? 'SUBMITTING...' : 'REGISTER STUDENT'}
											</button>
										</div>

										{msg && (
											<div className={`mt-2 p-2 rounded-lg text-xs ${msg.includes('failed') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
												{msg}
											</div>
										)}
									</form>
								</div>

								{/* Card Footer */}
								<div className="px-5 py-2 bg-gray-50 border-t border-gray-100 text-center">
									<p className="text-xs text-gray-500">
										
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Right side - QR Code */}
					<div className="bg-gray-50 py-1 px-4 flex flex-col justify-center">
						<div className="max-w-sm mx-auto w-full">
							{/* QR Code Card Container */}
							<div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
								{/* QR Card Header */}
								<div className="px-5 py-3 bg-gradient-to-r from-red-50 to-pink-50 border-b border-gray-100 text-center">
									<h3 className="text-xl font-light text-gray-800 mb-1">
										{qrUrl ? 'QR Code Generated!' : 'QR Code Pending'}
									</h3>
									<p className="text-gray-600 text-xs">
										{qrUrl ? 'Your registration QR code is ready' : 'Complete the form to generate your QR code'}
									</p>
								</div>
								
								{/* QR Card Content */}
								<div className="px-5 py-4 flex flex-col items-center justify-center">
									<div className="w-40 h-40 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
										{qrUrl ? (
											<img 
												src={qrUrl} 
												alt="Student QR Code" 
												className="w-full h-full object-contain p-2"
											/>
										) : (
											<div className="text-center text-gray-400">
												<div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-2 flex items-center justify-center">
													<span className="text-xl">📱</span>
												</div>
												<p className="text-xs font-medium">QR Code</p>
												<p className="text-xs text-gray-500">Will appear here</p>
											</div>
										)}
									</div>
									
									{qrUrl && (
										<div className="mt-3 text-center">
											<button className="text-red-600 hover:text-red-700 font-medium text-xs">
												📧 Send to Email
											</button>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RegisterStudent;
