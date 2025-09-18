import React from 'react';

// Simple test App to identify the problematic component
const SimpleApp = () => {
  console.log('🔍 SimpleApp rendering...');
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#10b981',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{textAlign: 'center'}}>
        <h1>🟢 SIMPLE APP TEST</h1>
        <p>App.jsx is working without router!</p>
        <p>Now testing components one by one...</p>
      </div>
    </div>
  );
};

export default SimpleApp;
