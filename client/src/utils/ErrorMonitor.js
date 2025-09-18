// ErrorMonitor.js - Add this to your project to help detect React rendering issues

class ErrorMonitor {
  static init() {
    // Monitor React rendering errors
    window.addEventListener('error', this.handleError);
    
    // Override console.error to catch React-specific warnings
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log to our monitoring system
      this.logReactError(...args);
      // Call the original console.error
      originalConsoleError.apply(console, args);
    };

    console.log('[ErrorMonitor] Initialized');
  }

  static handleError(event) {
    console.log('[ErrorMonitor] Caught error:', event.error);
    
    // You could send this to a logging service in a real application
  }

  static logReactError(...args) {
    // Filter for React-specific errors
    const errorString = String(args[0] || '');
    if (
      errorString.includes('React') || 
      errorString.includes('Warning:') ||
      errorString.includes('Error:')
    ) {
      console.log('[ErrorMonitor] React error detected:', ...args);
    }
  }
}

export default ErrorMonitor;
