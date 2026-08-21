import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../services/apiService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const data = await loginAdmin({ username, password });
      localStorage.setItem('adminToken', data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      if (!err.response) {
        setError('NETWORK ERROR: Connection to Security Core timed out. (Check if server is running or IP is whitelisted)');
      } else {
        setError(err.response.data.message || 'ACCESS DENIED: Credentials mismatch detected.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--bg-primary, #0a0a0a)', color: '#fff', position: 'relative', overflow: 'hidden', padding: '20px' }}>
      
      {/* Decorative Blur Orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 'min(300px, 60vw)', height: 'min(300px, 60vw)', background: 'var(--accent-primary, #00ff88)', filter: 'blur(100px)', opacity: 0.08, zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 'min(300px, 60vw)', height: 'min(300px, 60vw)', background: 'var(--accent-secondary, #ff0080)', filter: 'blur(100px)', opacity: 0.08, zIndex: 0 }} />

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', background: 'rgba(30, 30, 30, 0.8)', backdropFilter: 'blur(20px)', padding: 'clamp(1.5rem, 5vw, 3rem)', borderRadius: '24px', zIndex: 1, border: error ? '1px solid rgba(255, 0, 128, 0.4)' : '1px solid rgba(0, 255, 136, 0.2)', boxShadow: error ? '0 0 30px rgba(255, 0, 128, 0.15)' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)', width: '100%', maxWidth: '420px', boxSizing: 'border-box', transition: 'all 0.3s ease' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <div style={{ width: '56px', height: '56px', background: error ? 'rgba(255, 0, 128, 0.05)' : 'rgba(0, 255, 136, 0.05)', border: error ? '1px solid rgba(255, 0, 128, 0.3)' : '1px solid rgba(0, 255, 136, 0.3)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: error ? '#ff0080' : '#00ff88', transition: 'all 0.3s' }}>
            <i className={error ? "fas fa-user-shield" : "fas fa-shield-alt"} style={{ fontSize: '1.8rem' }}></i>
          </div>
          <h2 style={{ margin: 0, background: error ? 'linear-gradient(135deg, #ff0080, #ff8000)' : 'linear-gradient(135deg, #00ff88, #0080ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: 'clamp(1.5rem, 6vw, 2.2rem)', fontWeight: '800', letterSpacing: '-0.02em', transition: 'all 0.3s' }}>{error ? 'Security Block' : 'Admin Access'}</h2>
          <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: '500' }}>{error ? 'Database Access Restricted' : 'Authentication Protocol Required'}</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(255, 0, 128, 0.1)', border: '1px solid rgba(255, 0, 128, 0.2)', padding: '12px', borderRadius: '12px', color: '#ffb3d9', fontSize: '0.85rem', textAlign: 'center', animation: 'fadeIn 0.3s ease', lineHeight: '1.4' }}>
            <i className="fas fa-exclamation-triangle" style={{ marginRight: '8px' }}></i>
            {error.includes('NETWORK') ? 'REMEDY: Add your current IP to MongoDB Atlas whitelist.' : error}
          </div>
        )}
        
        <div style={{ marginTop: '0.5rem' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Access ID</label>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            autoComplete="off"
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: error ? '1px solid rgba(255, 0, 128, 0.2)' : '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8rem', fontWeight: '700', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Secret Key</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ width: '100%', padding: '14px 18px', borderRadius: '12px', border: error ? '1px solid rgba(255, 0, 128, 0.2)' : '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none', transition: 'all 0.3s', boxSizing: 'border-box' }}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ padding: '16px', borderRadius: '12px', background: error ? 'rgba(255, 0, 128, 0.8)' : 'var(--accent-gradient, linear-gradient(135deg, #00ff88, #0080ff))', color: '#000', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', fontWeight: '800', fontSize: '1rem', marginTop: '1rem', transition: 'all 0.3s', width: '100%', boxShadow: error ? '0 10px 20px -5px rgba(255,0,128,0.3)' : '0 10px 20px -5px rgba(0,255,136,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: isLoading ? 0.7 : 1 }}
        >
          {isLoading ? 'Verifying...' : error ? 'Retry Authentication' : 'Initialize Breach'}
        </button>
      </form>
    </div>
  );
};

export default Login;
