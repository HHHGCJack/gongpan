import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { initClientSecurity } from './src/utils/clientSecurity';

// Initialize passive client security and anti-scraping notice
initClientSecurity();

// Ultra-high priority pre-decoding of payment QR into GPU memory
if (typeof window !== 'undefined') {
  try {
    const preheatedQr = new Image();
    preheatedQr.src = '/support-qr.webp';
    if ('decode' in preheatedQr) {
      preheatedQr.decode().catch(() => {});
    }
  } catch {}
}

class ErrorBoundary extends React.Component<{ children?: React.ReactNode }, { hasError: boolean; error: any }> {
  public state: { hasError: boolean; error: any } = { hasError: false, error: null };
  constructor(props: { children?: React.ReactNode }) {
    super(props);
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 20, color: 'red'}}><h1>Error:</h1><pre>{this.state.error?.message}</pre></div>;
    }
    return (this as any).props.children;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);