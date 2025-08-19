import React from 'react';
import './BorrowRequest.css';
import { useNavigate } from 'react-router-dom';

const BorrowRequest = () => {
  const navigate = useNavigate();
  return (
    <div
      className="borrow-bg"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "url('/Dashboard.png') no-repeat center center",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="borrow-header">
        <button
          className="borrow-back-btn"
          onClick={() => navigate('/dashboard')}
        >
          ← Back
        </button>
        <h1 className="borrow-title">Borrow/Request</h1>
      </div>
      <div className="borrow-content">
        <p className="borrow-question">Are you a Student or Employee?</p>
        <div className="borrow-buttons">
          <button className="borrow-btn">Student</button>
          <button className="borrow-btn" onClick={() => navigate('/borrow-employee')}>Employee</button>
        </div>
      </div>
    </div>
  );
};

export default BorrowRequest;
