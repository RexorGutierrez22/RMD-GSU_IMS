import React from 'react';
import ReactDOM from 'react-dom';
import UserAccess from '../pages/UserAccess.jsx';

// Try to render the component to see if there are any errors
try {
  console.log('Testing UserAccess component...');
  const div = document.createElement('div');
  ReactDOM.render(<UserAccess standalone={true} />, div);
  console.log('UserAccess rendered successfully!');
} catch (error) {
  console.error('Error rendering UserAccess:', error);
}
