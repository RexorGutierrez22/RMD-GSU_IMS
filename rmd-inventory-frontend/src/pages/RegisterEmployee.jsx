import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
				// Extra fields kept for future backend expansion
				last_name: form.last_name,
				first_name: form.first_name,
				middle_initial: form.middle_initial,
				contact_number: form.contact_number,
				gender: form.gender,
				employee_id_number: form.employee_id_number,
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
			<main className="flex-1">
				<div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start px-6 py-10">
					<div>
						<h1 className="text-4xl font-bold mb-1">Registration</h1>
						<p className="text-xl text-gray-700 mb-8">Employee</p>

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
								<option>Male</option>
								<option>Female</option>
								<option>Prefer not to say</option>
							</select>
						</div>

						<div className="grid grid-cols-12 gap-3">
							<input
								name="employee_id_number"
								placeholder="Employee ID Number"
								value={form.employee_id_number}
								onChange={onChange}
								className="col-span-6 border rounded-xl px-4 py-2 bg-white"
								required
							/>
							<select
								name="position"
								value={form.position}
								onChange={onChange}
								className="col-span-3 border rounded-xl px-4 py-2 bg-white"
								required
							>
								<option value="">Position</option>
								<option>Faculty</option>
								<option>Staff</option>
								<option>Admin</option>
							</select>
							<input
								name="department"
								placeholder="Department"
								value={form.department}
								onChange={onChange}
								className="col-span-3 border rounded-xl px-4 py-2 bg-white"
								required
							/>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 disabled:opacity-60"
						>
							{loading ? 'Submitting...' : 'Submit'}
						</button>

						{msg && <p className="text-sm text-gray-700">{msg}</p>}
					</form>
					</div>

					<div className="flex flex-col items-center">
						<h3 className="text-lg font-medium mb-3">{qrUrl ? 'QR Code' : 'QR Pending'}</h3>
						{qrUrl ? (
							<img src={qrUrl} alt="Employee QR" className="w-[300px] h-[300px] border rounded-xl bg-white" />
						) : (
							<div className="w-[300px] h-[300px] border rounded-xl bg-white grid place-items-center">
								<img
									src={`${process.env.PUBLIC_URL}/sample.png`}
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

export default RegisterEmployee;


