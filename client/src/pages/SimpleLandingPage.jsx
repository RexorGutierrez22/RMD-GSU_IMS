import React from 'react';
import { useNavigate } from 'react-router-dom';

const SimpleLandingPage = () => {
  const navigate = useNavigate();

  const pageStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f9fafb',
    position: 'relative'
  };

  const headerStyle = {
    backgroundColor: '#BA2C2C',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20
  };

  const mainStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '4rem 1rem',
    zIndex: 10,
    backgroundImage: 'url("/eagle.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1
  };

  const buttonStyle = {
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.75rem 1.5rem',
    margin: '0.5rem',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const adminButtonStyle = {
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    background: 'transparent',
    fontSize: '0.875rem',
    cursor: 'pointer',
    borderRadius: '0.25rem'
  };

  const footerStyle = {
    backgroundColor: '#BA2C2C',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    zIndex: 20
  };

  return (
    <div style={pageStyle}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>
          Resource Management Division
        </h1>
        <button 
          style={adminButtonStyle}
          onClick={() => navigate('/admin-login')}
          onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          Admin
        </button>
      </header>

      {/* Main Content with Background */}
      <main style={mainStyle}>
        <div style={overlayStyle}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{ 
            color: '#000', 
            fontSize: '2.5rem', 
            fontWeight: '600', 
            marginBottom: '2rem',
            marginTop: '-8rem'
          }}>
            Good Day! How may I assist you?
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Borrow/Request
            </button>
            <button 
              style={buttonStyle}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Return an Item
            </button>
            <button 
              style={buttonStyle}
              onClick={() => navigate('/register')}
              onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
            >
              Register
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={footerStyle}>
        <span style={{ fontSize: '0.875rem' }}>© 2025 CIC INTERNS</span>
      </footer>
    </div>
  );
};

export default SimpleLandingPage;
