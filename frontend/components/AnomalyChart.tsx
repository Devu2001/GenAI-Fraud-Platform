"use client";

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function AnomalyChart({ transactions }: { transactions: any[] }) {
  // Map transactions to a format suitable for the scatter plot
  const data = transactions.map((txn, index) => ({
    x: index,
    y: txn.risk_score,
    amount: txn.amount,
    id: txn.id,
    is_anomaly: txn.is_anomaly
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', padding: '10px', borderRadius: '8px' }}>
          <p style={{ color: 'var(--text-main)', margin: 0, fontWeight: 'bold' }}>{data.id}</p>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Risk Score: {data.y.toFixed(3)}</p>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Amount: ₹{data.amount.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Real-time Risk Distribution</h2>
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis type="number" dataKey="x" name="Time" hide domain={['dataMin', 'dataMax']} />
            <YAxis type="number" dataKey="y" name="Risk Score" stroke="var(--text-muted)" domain={[0, 1]} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name="Transactions" data={data}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.is_anomaly ? 'var(--danger)' : 'var(--primary)'} 
                  r={entry.is_anomaly ? 8 : 4} 
                  opacity={0.8}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
