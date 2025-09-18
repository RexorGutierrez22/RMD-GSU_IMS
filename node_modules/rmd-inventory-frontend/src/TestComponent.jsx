import React from 'react';

const TestComponent = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1e40af',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      fontSize: '24px'
    }}>
      <div style={{textAlign: 'center'}}>
        <h1>🔧 DEEP DEBUGGING TEST</h1>
        <p>If you see this, React is working!</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default TestComponent;
