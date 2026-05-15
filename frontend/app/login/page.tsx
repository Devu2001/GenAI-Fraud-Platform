"use client";

import React, { useState } from 'react';

export default function Login() {
  const [role, setRole] = useState("Admin"); // default role to try
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    try {
      const formData = new URLSearchParams();
      formData.append('username', role.toLowerCase());
      formData.append('password', password);

      const response = await fetch('http://localhost:8000/api/auth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      localStorage.setItem("genai_token", data.access_token);
      localStorage.setItem("genai_role", data.role);
      window.location.href = "/dashboard";
    } catch (err: any) {
      setError(err.message || "Failed to login");
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--background)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="glow-text-primary" style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>GenAI CyberGuard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Secure Access Portal</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Select Role</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                outline: 'none'
              }}
            >
              <option value="Admin" style={{ color: 'black' }}>Admin (Full Access & Tuning)</option>
              <option value="Analyst" style={{ color: 'black' }}>Analyst (Monitoring Only)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password (e.g., admin123)"
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--surface-border)',
                color: 'var(--text-main)',
                borderRadius: '8px',
                outline: 'none',
              }}
            />
          </div>

          {error && <div style={{ color: 'var(--danger)', fontSize: '0.875rem', textAlign: 'center' }}>{error}</div>}

          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: 'var(--primary)',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem'
            }}
          >
            Access Dashboard
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.875rem', textDecoration: 'underline' }}
          >
            ← Back to Home Page
          </button>
        </div>
      </div>
    </div>
  );
}
