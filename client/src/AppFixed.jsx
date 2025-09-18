import React from 'react';

function App() {
  console.log('AppEmergencyTest component loading...');
  
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'red',
      color: 'white',
      fontSize: '32px',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>🎉 REACT IS WORKING!</h1>
      <p>✅ Emergency test successful!</p>
      <p>✅ No more blank white page!</p>
      <p>Current time: {new Date().toLocaleTimeString()}</p>
      <button 
        onClick={() => alert('JavaScript works!')}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'white',
          color: 'red',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px'
        }}
      >
        Click me to test!
      </button>
    </div>
  );
}

export default App;
