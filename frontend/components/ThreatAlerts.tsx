"use client";

import React, { useEffect, useState } from 'react';
import { AlertOctagon, X } from 'lucide-react';

export default function ThreatAlerts({ transactions }: { transactions: any[] }) {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    if (transactions.length === 0) return;
    
    // Get the most recent transaction
    const latestTxn = transactions[transactions.length - 1];
    
    // Check if it's a critical anomaly
    if (latestTxn.is_anomaly && latestTxn.risk_score >= 0.85) {
      // Add to alerts, ensuring we don't duplicate (by checking ID)
      setAlerts(prev => {
        if (prev.find(a => a.id === latestTxn.id)) return prev;
        return [latestTxn, ...prev].slice(0, 3); // Keep only latest 3
      });
    }
  }, [transactions]);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 9999
    }}>
      {alerts.map((alert) => (
        <div key={alert.id} className="glass-panel" style={{
          padding: '1rem',
          borderLeft: '4px solid var(--danger)',
          width: '320px',
          animation: 'slideIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
          boxShadow: '0 10px 40px rgba(248, 113, 113, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <AlertOctagon color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ color: 'var(--danger)', margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: 'bold' }}>CRITICAL THREAT</h4>
              <p style={{ color: 'var(--text-main)', fontSize: '0.875rem', margin: 0, fontFamily: 'var(--font-mono)' }}>{alert.id}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: '0.25rem 0 0 0' }}>Score: {(alert.risk_score * 100).toFixed(1)}% | Amount: ₹{alert.amount}</p>
            </div>
          </div>
          <button 
            onClick={() => removeAlert(alert.id)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.25rem' }}
          >
            <X size={16} />
          </button>
        </div>
      ))}

      <style jsx>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
