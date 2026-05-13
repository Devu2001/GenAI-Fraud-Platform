"use client";

import React, { useState } from 'react';

export default function GANHub() {
  const [generating, setGenerating] = useState(false);
  const [samples, setSamples] = useState(0);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    setGenerating(true);
    setMessage("");
    try {
      const token = localStorage.getItem("genai_token");
      const response = await fetch("http://localhost:8000/api/gan/generate?num_samples=500", { 
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "Failed to generate data");
      }
      setSamples(data.samples_generated);
      setMessage(`Successfully generated ${data.samples_generated} synthetic high-risk transactions to balance the training set.`);
    } catch (err: any) {
      setMessage(err.message || "Failed to reach backend GAN API.");
    }
    setGenerating(false);
  };

  return (
    <div className="glass-panel" style={{ marginTop: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Synthetic Data Generator (GAN Hub)</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Generate synthetic fraud data to balance imbalanced datasets.</p>
        </div>
        <button 
          onClick={handleGenerate} 
          disabled={generating}
          style={{
            background: generating ? 'rgba(74, 222, 128, 0.2)' : 'var(--primary)',
            color: generating ? 'var(--primary)' : '#000',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: generating ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s'
          }}
        >
          {generating ? 'Generating...' : 'Generate 500 Samples'}
        </button>
      </div>

      {message && (
        <div style={{ padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.3)', borderRadius: '8px', color: 'var(--primary)', fontSize: '0.875rem' }}>
          {message}
        </div>
      )}

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, height: '150px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--surface-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-main)' }}>12,450</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Real Fraud Samples</span>
        </div>
        <div style={{ flex: 1, height: '150px', background: 'rgba(255,255,255,0.02)', border: '1px dashed var(--surface-border)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <span style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>{samples > 0 ? 12450 + samples : 12450}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Balanced Dataset Size</span>
        </div>
      </div>
    </div>
  );
}
