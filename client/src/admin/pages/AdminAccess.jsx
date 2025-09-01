import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAccess = () => {
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '3rem',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%'
  };

  const buttonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.75rem 1.5rem',
    margin: '1rem 0.5rem',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Administrative Access
        </h1>
        
        <p style={{ 
          color: '#6b7280', 
          marginBottom: '2rem',
          fontSize: '1rem'
        }}>
          Access the admin dashboard to manage the Resource Management Division system.
        </p>

        <div>
          <button 
            style={buttonStyle}
            onClick={() => navigate('/admin-login')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            Admin Login
          </button>
          
          <button 
            style={{...buttonStyle, backgroundColor: '#6b7280'}}
            onClick={() => navigate('/')}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAccess;
