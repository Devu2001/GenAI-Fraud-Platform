"use client";

import React, { useEffect, useState } from 'react';

export default function KPICards({ transactions }: { transactions: any[] }) {
  const [fraudRate, setFraudRate] = useState("0.00");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (transactions.length > 0) {
      setTotal(transactions.length);
      const fraudCount = transactions.filter(t => t.is_anomaly).length;
      setFraudRate(((fraudCount / transactions.length) * 100).toFixed(2));
    }
  }, [transactions]);

  return (
    <div className="grid-dashboard" style={{ marginBottom: '1.5rem' }}>
      <div className="col-span-4 glass-panel">
        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Total Transactions Monitored</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{total}</div>
        <p style={{ color: 'var(--primary)', fontSize: '0.875rem', marginTop: '0.5rem' }}>↑ 12% from last hour</p>
      </div>

      <div className="col-span-4 glass-panel">
        <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Current Fraud Rate</h3>
        <div className={parseFloat(fraudRate) > 5 ? "glow-text-danger" : ""} style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {fraudRate}%
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Target &lt; 2.0%</p>
      </div>

      <div className="col-span-4 glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '0.5rem' }}>GenAI System Status</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div className="animate-pulse-slow" style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
            <span style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-main)' }}>Online & Adaptive</span>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>GAN + VAE active</p>
      </div>
    </div>
  );
}
