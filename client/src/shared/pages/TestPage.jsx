import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      fontSize: '2rem',
      color: '#333'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>✅ React is Working!</h1>
        <p>If you see this, the application is running correctly.</p>
        <a href="/" style={{ color: '#dc2626', textDecoration: 'underline' }}>
          Go to Landing Page
        </a>
      </div>
    </div>
  );
};

export default TestPage;
