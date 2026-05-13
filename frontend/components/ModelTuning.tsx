"use client";

import React, { useState } from 'react';

export default function ModelTuning() {
  const [threshold, setThreshold] = useState(0.75);
  const [epochs, setEpochs] = useState(100);
  const [learningRate, setLearningRate] = useState(0.001);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would send an API request to the backend to update model params
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Model Configuration</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Adjust GenAI parameters. Changes will re-calibrate the VAE anomaly scoring.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Anomaly Risk Threshold</label>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{threshold}</span>
          </div>
          <input 
            type="range" 
            min="0.5" 
            max="0.99" 
            step="0.01" 
            value={threshold} 
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Transactions with a score above this will be flagged as fraud.</p>
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>GAN Training Epochs</label>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{epochs}</span>
          </div>
          <input 
            type="range" 
            min="10" 
            max="500" 
            step="10" 
            value={epochs} 
            onChange={(e) => setEpochs(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent)' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: '500' }}>Learning Rate</label>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{learningRate}</span>
          </div>
          <select 
            value={learningRate} 
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            style={{ 
              width: '100%', 
              padding: '0.5rem', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--surface-border)', 
              color: 'var(--text-main)',
              borderRadius: '4px'
            }}
          >
            <option value={0.01} style={{color: 'black'}}>0.01</option>
            <option value={0.001} style={{color: 'black'}}>0.001</option>
            <option value={0.0001} style={{color: 'black'}}>0.0001</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button 
          onClick={handleSave}
          style={{
            background: 'var(--accent)',
            color: '#000',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Apply Configuration
        </button>
        {saved && <span style={{ color: 'var(--primary)', fontSize: '0.875rem' }}>Settings Applied ✓</span>}
      </div>
    </div>
  );
}
