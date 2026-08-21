import React from 'react';

const Maintenance = () => {
  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: '#050505',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100px',
        height: '100px',
        border: '3px solid #00ff88',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '2rem',
        boxShadow: '0 0 30px rgba(0, 255, 136, 0.2)',
        animation: 'pulse 2s infinite'
      }}>
        <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
      </div>
      <h1 style={{ fontSize: '3rem', margin: '0 0 1rem 0', fontWeight: '800', letterSpacing: '-0.02em' }}>
        Under <span style={{ color: '#00ff88' }}>Maintenance</span>
      </h1>
      <p style={{ color: '#808080', fontSize: '1.2rem', maxWidth: '500px', lineHeight: '1.6' }}>
        The portfolio is currently undergoing scheduled upgrades to bring you an even better experience. 
        Please check back shortly!
      </p>
      
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(0, 255, 136, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 255, 136, 0); }
        }
      `}</style>
    </div>
  );
};

export default Maintenance;
