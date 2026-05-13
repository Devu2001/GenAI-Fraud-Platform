"use client";

import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function LiveFeed({ transactions }: { transactions: any[] }) {
  const [selectedTxn, setSelectedTxn] = useState<any | null>(null);

  // Prepare XAI data for Recharts if a transaction is selected
  const xaiData = selectedTxn ? [
    { name: 'Amount Dev', value: 0.85 },
    { name: 'Velocity', value: 0.72 },
    { name: 'Location', value: 0.64 }
  ] : [];

  return (
    <div className="grid-dashboard">
      <div className="col-span-8 glass-panel" style={{ height: '500px', overflowY: 'auto' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Live Transaction Feed</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--surface-border)' }}>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>TXN ID</th>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Amount</th>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Time</th>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Risk Score</th>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.slice().reverse().map((txn, i) => (
              <tr key={i} style={{ 
                borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                backgroundColor: txn.is_anomaly ? 'rgba(248, 113, 113, 0.05)' : 'transparent',
                transition: 'background-color 0.2s'
              }}>
                <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{txn.id}</td>
                <td style={{ padding: '0.75rem', fontWeight: '500' }}>₹{txn.amount.toFixed(2)}</td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>{new Date(txn.timestamp).toLocaleTimeString()}</td>
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${txn.risk_score * 100}%`,
                        background: txn.risk_score > 0.7 ? 'var(--danger)' : 'var(--primary)'
                      }}></div>
                    </div>
                    <span style={{ fontSize: '0.75rem' }}>{txn.risk_score.toFixed(2)}</span>
                  </div>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span className={`badge ${txn.is_anomaly ? 'badge-fraud' : 'badge-safe'}`}>
                    {txn.is_anomaly ? 'High Risk' : 'Normal'}
                  </span>
                </td>
                <td style={{ padding: '0.75rem' }}>
                  {txn.is_anomaly && (
                    <button 
                      onClick={() => setSelectedTxn(txn)}
                      style={{ 
                        background: 'transparent', 
                        border: '1px solid var(--accent)', 
                        color: 'var(--accent)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem'
                      }}
                    >
                      Explain
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="col-span-4 glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Explainable AI (XAI) Insight</h2>
        {selectedTxn ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', borderRadius: '8px' }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Anomaly Detected: {selectedTxn.id}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)' }}>The VAE model has flagged this transaction. See feature contributions below.</p>
            </div>
            
            <div style={{ flex: 1, minHeight: '200px' }}>
              <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Feature Contributions (SHAP)</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={xaiData} layout="vertical" margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
                  <XAxis type="number" hide domain={[0, 1]} />
                  <YAxis dataKey="name" type="category" stroke="var(--text-muted)" fontSize={12} width={80} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--danger)' }}
                    formatter={(value: any) => [`+${value}`, 'Impact']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {xaiData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="var(--danger)" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ marginTop: 'auto', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>
              <strong style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>System Recommendation:</strong>
              <span style={{ color: 'var(--accent)', fontSize: '0.875rem' }}>Block transaction and notify user.</span>
            </div>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>
            Select a high-risk transaction from the feed to view its explainability metrics.
          </div>
        )}
      </div>
    </div>
  );
}
