import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RegisterStudent = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		last_name: '',
		first_name: '',
		middle_initial: '',
		contact_number: '',
		gender: '',
		usep_email: '',
		id_number: '',
		college: '',
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
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header
				title="Register Student"
				rightContent={
					<button className="back-btn" onClick={() => navigate('/register')}>
						Back
					</button>
				}
			/>
			<main className="flex-1">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start px-6 py-10">
					<div>
						<h1 className="text-4xl font-bold mb-1">Registration</h1>
						<p className="text-xl text-gray-700 mb-8">Student</p>

						<form onSubmit={onSubmit} className="space-y-4 max-w-xl">
							<div className="grid grid-cols-12 gap-3">
								<input
									name="last_name"
									placeholder="Last Name"
									value={form.last_name}
									onChange={onChange}
									className="col-span-5 border rounded-xl px-4 py-2 bg-white"
									required
								/>
								<input
									name="first_name"
									placeholder="Name"
									value={form.first_name}
									onChange={onChange}
									className="col-span-5 border rounded-xl px-4 py-2 bg-white"
									required
								/>
								<input
									name="middle_initial"
									placeholder="M.I."
									value={form.middle_initial}
									onChange={onChange}
									className="col-span-2 border rounded-xl px-4 py-2 bg-white"
								/>
							</div>

							<div className="grid grid-cols-12 gap-3">
								<input
									name="contact_number"
									placeholder="Contact Number"
									value={form.contact_number}
									onChange={onChange}
									className="col-span-8 border rounded-xl px-4 py-2 bg-white"
									required
								/>
								<select
									name="gender"
									value={form.gender}
									onChange={onChange}
									className="col-span-4 border rounded-xl px-4 py-2 bg-white"
									required
								>
									<option value="">Gender</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
								</select>
							</div>

							<input
								name="usep_email"
								type="email"
								placeholder="USeP Email"
								value={form.usep_email}
								onChange={onChange}
								className="w-full border rounded-xl px-4 py-2 bg-white"
								required
							/>

							<input
								name="id_number"
								placeholder="ID Number"
								value={form.id_number}
								onChange={onChange}
								className="w-full border rounded-xl px-4 py-2 bg-white"
								required
							/>

							<select
								name="college"
								value={form.college}
								onChange={onChange}
								className="w-full border rounded-xl px-4 py-2 bg-white"
								required
							>
								<option value="">Select College</option>
								<option value="CCS">College of Computer Studies</option>
								<option value="CBA">College of Business Administration</option>
								<option value="CEAT">College of Engineering, Architecture and Technology</option>
								<option value="CTE">College of Teacher Education</option>
								<option value="CAS">College of Arts and Sciences</option>
								<option value="CON">College of Nursing</option>
								<option value="COG">College of Governance</option>
							</select>

							<button
								type="submit"
								disabled={loading}
								className="main-btn w-full"
							>
								{loading ? 'Registering...' : 'Register'}
							</button>

							{msg && (
								<div className={`p-3 rounded-xl text-center ${msg.includes('failed') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
									{msg}
								</div>
							)}
						</form>
					</div>

					<div className="flex flex-col items-center">
						<h3 className="text-lg font-medium mb-3">{qrUrl ? 'QR Code' : 'QR Pending'}</h3>
						{qrUrl ? (
							<img src={qrUrl} alt="Student QR" className="w-[300px] h-[300px] border rounded-xl bg-white" />
						) : (
							<div className="w-[300px] h-[300px] border rounded-xl bg-white grid place-items-center">
								<img
									src="/sample.png"
									alt="QR placeholder"
									className="opacity-60"
								/>
							</div>
						)}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RegisterStudent;
