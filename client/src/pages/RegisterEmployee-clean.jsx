import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const RegisterEmployee = () => {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		last_name: '',
		first_name: '',
		middle_initial: '',
		contact_number: '',
		gender: '',
		employee_id_number: '',
		position: '',
		department: '',
	});
	const [loading, setLoading] = useState(false);
	const [qrUrl, setQrUrl] = useState('');
	const [msg, setMsg] = useState('');

	const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

	const buildEmployeeName = () => {
		const trimmedMi = (form.middle_initial || '').trim();
		const miPart = trimmedMi ? ` ${trimmedMi.replace('.', '')}.` : '';
		return `${form.first_name} ${form.last_name}${miPart}`.trim();
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMsg('');
		setQrUrl('');
		try {
			const payload = {
				name: buildEmployeeName(),
				position: form.position,
				department: form.department,
			};

			const { data } = await axios.post('http://127.0.0.1:8000/api/employees', payload);
			setMsg(data.message || 'Employee registered!');
			setQrUrl(data.qr_url || '');
		} catch (err) {
			setMsg('Registration failed. Please check fields and backend.');
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex flex-col bg-gray-50">
			<Header
				title="Register Employee"
				rightContent={
					<button className="back-btn" onClick={() => navigate('/register')}>
						Back
					</button>
				}
			/>
			<main className="flex-1 flex items-center justify-center">
				<div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
					<h2 className="text-2xl font-bold mb-4">Register Employee</h2>
					<form onSubmit={onSubmit}>
						<label className="block mb-2">
							Last Name:
							<input
								name="last_name"
								value={form.last_name}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<label className="block mb-2">
							First Name:
							<input
								name="first_name"
								value={form.first_name}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<label className="block mb-2">
							Middle Initial:
							<input
								name="middle_initial"
								value={form.middle_initial}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
							/>
						</label>
						<label className="block mb-2">
							Contact Number:
							<input
								name="contact_number"
								value={form.contact_number}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<label className="block mb-2">
							Gender:
							<select
								name="gender"
								value={form.gender}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							>
								<option value="">Select Gender</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</label>
						<label className="block mb-2">
							Employee ID:
							<input
								name="employee_id_number"
								value={form.employee_id_number}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<label className="block mb-2">
							Position:
							<input
								name="position"
								value={form.position}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<label className="block mb-4">
							Department:
							<input
								name="department"
								value={form.department}
								onChange={onChange}
								className="w-full border p-2 rounded mt-1"
								required
							/>
						</label>
						<button
							type="submit"
							disabled={loading}
							className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
						>
							{loading ? 'Registering...' : 'Register'}
						</button>
					</form>

					{msg && <p className="mt-4 text-green-700 font-semibold">{msg}</p>}
					{qrUrl && (
						<div className="mt-4">
							<p className="mb-2">Generated QR Code:</p>
							<img src={qrUrl} alt="QR Code" className="w-48 h-48 border mx-auto" />
						</div>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default RegisterEmployee;
