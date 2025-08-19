import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BorrowEmployee.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';

const initialItems = [
  { name: 'Android Phone', category: 'Electrical', qty: 5 },
  { name: 'Cement Mixer', category: 'Carpentry/Masonry', qty: 2 },
  { name: 'Amesco Power Drill', category: 'Electrical', qty: 2 },
  { name: 'Electrical Tape', category: 'Electrical', qty: 1 },
];

const BorrowEmployee = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('');
  const [itemQty, setItemQty] = useState('');

  const handleAdd = () => {
    if (itemName && itemCategory && itemQty) {
      setItems([...items, { name: itemName, category: itemCategory, qty: itemQty }]);
      setItemName('');
      setItemCategory('');
      setItemQty('');
    }
  };

  const handleRemove = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div
      className="borrow-employee-bg"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "url('/Dashboard.png') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <div className="borrow-employee-header">
        <button className="borrow-back-btn" onClick={() => navigate(-1)}>← Back</button>
        <h1 className="borrow-employee-title">Borrow/Request</h1>
      </div>
      <div className="borrow-employee-content">
        <div className="borrow-employee-form">
          <h2>Borrowers Information - Employee</h2>
          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Contact Number" />
          <button className="qr-link">Scan/Upload QR - Auto Fill</button>
          <input type="date" placeholder="Date of Request" />
          <textarea placeholder="Purpose" rows={3}></textarea>
        </div>
        <div className="borrow-employee-items">
          <div className="borrow-employee-add">
            <select value={itemCategory} onChange={e => setItemCategory(e.target.value)}>
              <option value="">Category of Concern</option>
              <option>Electrical</option>
              <option>Carpentry/Masonry</option>
              <option>Plumbing</option>
            </select>
            <input
              type="text"
              placeholder="Item Name"
              value={itemName}
              onChange={e => setItemName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              min="1"
              value={itemQty}
              onChange={e => setItemQty(e.target.value)}
            />
            <button className="add-btn" onClick={handleAdd}>Add</button>
          </div>
          <div className="borrow-employee-table">
            <div className="table-header">
              <span>Items Requested</span>
              <span>Category</span>
              <span>Qty.</span>
              <span></span>
            </div>
            {items.map((item, idx) => (
              <div className="table-row" key={idx}>
                <span>{item.name}</span>
                <span>{item.category}</span>
                <span>{item.qty}</span>
                <button className="remove-btn" onClick={() => handleRemove(idx)}>✖</button>
              </div>
            ))}
          </div>
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  );
};

const RegisterStudent = () => {
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
      const { data } = await axios.post('http://localhost:8000/api/students', form);
      setMsg(data.message);
      setQrUrl(data.qr_url);
    } catch (err) {
      setMsg('Registration failed. Please check required fields and backend.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Registration" />
      <main className="flex-1 px-6 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Student</h2>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <input name="last_name" placeholder="Last Name" value={form.last_name} onChange={onChange} className="col-span-1 border rounded-lg px-3 py-2" required />
                <input name="first_name" placeholder="Name" value={form.first_name} onChange={onChange} className="col-span-1 border rounded-lg px-3 py-2" required />
                <input name="middle_initial" placeholder="M.I." value={form.middle_initial} onChange={onChange} className="col-span-1 border rounded-lg px-3 py-2" />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <input name="contact_number" placeholder="Contact Number" value={form.contact_number} onChange={onChange} className="col-span-2 border rounded-lg px-3 py-2" required />
                <select name="gender" value={form.gender} onChange={onChange} className="col-span-1 border rounded-lg px-3 py-2" required>
                  <option value="">Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </div>

              <input name="usep_email" placeholder="USeP Email" value={form.usep_email} onChange={onChange} className="w-full border rounded-lg px-3 py-2" required />

              <div className="grid grid-cols-2 gap-3">
                <input name="id_number" placeholder="ID Number" value={form.id_number} onChange={onChange} className="border rounded-lg px-3 py-2" required />
                <select name="college" value={form.college} onChange={onChange} className="border rounded-lg px-3 py-2" required>
                  <option value="">College</option>
                  <option>CAS</option>
                  <option>CET</option>
                  <option>CE</option>
                  <option>CEA</option>
                  <option>CT</option>
                </select>
              </div>

              <button type="submit" disabled={loading} className="bg-green-600 text-white px-5 py-2 rounded-lg">
                {loading ? 'Submitting...' : 'Submit'}
              </button>

              {msg && <p className="text-sm text-gray-700">{msg}</p>}
            </form>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-lg font-medium mb-3">{qrUrl ? 'QR Code' : 'QR Pending'}</h3>
            {qrUrl ? (
              <img src={qrUrl} alt="Student QR" className="w-72 h-72 border rounded-lg bg-white" />
            ) : (
              <div className="w-72 h-72 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                Waiting for submission...
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BorrowEmployee;
