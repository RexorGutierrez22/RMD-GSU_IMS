function App() {
  return React.createElement('div', {
    style: {
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
    }
  }, [
    React.createElement('h1', { key: 'title' }, 'EMERGENCY TEST - REACT IS WORKING!'),
    React.createElement('p', { key: 'p1' }, 'If you see this RED screen, React is mounting correctly'),
    React.createElement('p', { key: 'p2' }, 'Current time: ' + new Date().toLocaleTimeString()),
    React.createElement('p', { key: 'p3' }, 'Port: 3008 or 3007'),
    React.createElement('button', {
      key: 'btn',
      onClick: function() { alert('Button works!'); },
      style: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: 'white',
        color: 'red',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }
    }, 'Click me to test JavaScript')
  ]);
}

export default App;
