"use client";

import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function MLMetrics() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Generate mock training epoch data
    const mockData = [];
    let gLoss = 2.0;
    let dLoss = 0.5;
    for (let i = 0; i <= 100; i += 10) {
      mockData.push({
        epoch: i,
        generator_loss: gLoss,
        discriminator_loss: dLoss,
        auc_score: 0.5 + (0.45 * (i / 100))
      });
      gLoss = Math.max(0.2, gLoss * 0.85);
      dLoss = Math.min(1.5, dLoss * 1.1);
    }
    setData(mockData);
  }, []);

  return (
    <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>GAN Training Metrics</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Loss Curves & ROC/AUC Performance</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ display: 'block', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)' }}>0.95 AUC</span>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="epoch" stroke="var(--text-muted)" fontSize={12} label={{ value: 'Epochs', position: 'insideBottom', fill: 'var(--text-muted)' }} />
            <YAxis stroke="var(--text-muted)" fontSize={12} />
            <Tooltip 
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-main)' }}
            />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="generator_loss" name="Generator Loss" stroke="var(--accent)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="discriminator_loss" name="Discriminator Loss" stroke="var(--danger)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="auc_score" name="AUC Score" stroke="var(--primary)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
