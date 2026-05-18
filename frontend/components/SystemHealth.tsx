"use client";

import React, { useEffect, useState } from 'react';
import { Activity, Cpu, MemoryStick, Database } from 'lucide-react';

export default function SystemHealth() {
  const [health, setHealth] = useState<any>(null);

  useEffect(() => {
    const fetchHealth = () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      fetch(`${baseUrl}/api/system/health`)
        .then(res => res.json())
        .then(data => setHealth(data))
        .catch(err => console.error(err));
    };
    
    fetchHealth();
    const interval = setInterval(fetchHealth, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!health) return <div className="glass-panel">Loading health metrics...</div>;

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity size={20} color="var(--primary)" /> System Resources
      </h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Cpu size={16}/> CPU Usage</span>
            <span style={{ color: health.cpu_usage > 80 ? 'var(--danger)' : 'var(--text-main)' }}>{health.cpu_usage}%</span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}>
            <div style={{ width: `${health.cpu_usage}%`, background: health.cpu_usage > 80 ? 'var(--danger)' : 'var(--accent)', height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Database size={16}/> GPU Computation (GAN/VAE)</span>
            <span style={{ color: health.gpu_usage > 90 ? 'var(--danger)' : 'var(--text-main)' }}>{health.gpu_usage}%</span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}>
            <div style={{ width: `${health.gpu_usage}%`, background: health.gpu_usage > 90 ? 'var(--danger)' : 'var(--primary)', height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MemoryStick size={16}/> RAM</span>
            <span>{health.ram_usage}%</span>
          </div>
          <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px' }}>
            <div style={{ width: `${health.ram_usage}%`, background: 'var(--accent)', height: '100%', borderRadius: '3px', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Active Models: {health.active_models.join(', ')}
      </div>
    </div>
  );
}
