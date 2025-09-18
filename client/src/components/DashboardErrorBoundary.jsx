import React, { Component } from 'react';

class DashboardErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("Dashboard Error:", error);
    console.error("Error Details:", errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{
          margin: '2rem',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{color: '#ba2c2c', marginBottom: '1rem'}}>Something went wrong</h1>
          <p style={{marginBottom: '1rem'}}>An error occurred while trying to load this component.</p>
          
          <details style={{
            backgroundColor: '#f9fafb',
            padding: '1rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            whiteSpace: 'pre-wrap'
          }}>
            <summary style={{cursor: 'pointer', fontWeight: '500', marginBottom: '0.5rem'}}>Error Details</summary>
            <p style={{color: '#dc2626'}}>{this.state.error && this.state.error.toString()}</p>
            <p style={{marginTop: '1rem', fontSize: '0.875rem', color: '#4b5563'}}>
              Component Stack: {this.state.errorInfo && this.state.errorInfo.componentStack}
            </p>
          </details>
          
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#ba2c2c',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    // Return children if there's no error
    return this.props.children;
  }
}

export default DashboardErrorBoundary;
