import React, { useState } from 'react';
import axios from 'axios';

const EmployeeRegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: ''
  });

  const [qrUrl, setQrUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setQrUrl('');

    try {
      const res = await axios.post('http://localhost:8000/api/employees', formData);
      setMessage(res.data.message);
      setQrUrl(res.data.qr_url);
    } catch (err) {
      setMessage('Something went wrong. Please check the backend.');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Register Employee</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Full Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="block mb-2">
          Position:
          <input
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>
        <label className="block mb-4">
          Department:
          <input
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {message && <p className="mt-4 text-green-700 font-semibold">{message}</p>}
      {qrUrl && (
        <div className="mt-4">
          <p className="mb-2">Generated QR Code:</p>
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 border" />
        </div>
      )}
    </div>
  );
};

export default EmployeeRegisterForm;
