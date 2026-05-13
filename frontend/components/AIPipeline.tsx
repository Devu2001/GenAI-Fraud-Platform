"use client";

import React from 'react';

export default function AIPipeline() {
  return (
    <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>AI Architecture Flow</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Live representation of the Hybrid GAN + VAE detection pipeline.</p>
      
      <div style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--surface-border)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-around', padding: '2rem' }}>
        
        {/* Nodes */}
        <div style={{ zIndex: 2, padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--text-muted)', borderRadius: '8px', textAlign: 'center' }}>
          Raw Data Stream
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', zIndex: 2 }}>
          <div style={{ padding: '1rem', background: 'rgba(96, 165, 250, 0.1)', border: '1px solid var(--accent)', borderRadius: '8px', textAlign: 'center', color: 'var(--accent)', boxShadow: '0 0 15px rgba(96, 165, 250, 0.2)' }}>
            GAN Synthesizer
          </div>
          <div style={{ padding: '1rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid var(--primary)', borderRadius: '8px', textAlign: 'center', color: 'var(--primary)', boxShadow: '0 0 15px rgba(74, 222, 128, 0.2)' }}>
            VAE Anomaly Detector
          </div>
        </div>

        <div style={{ zIndex: 2, padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--text-muted)', borderRadius: '8px', textAlign: 'center' }}>
          Decision Engine
        </div>

        <div style={{ zIndex: 2, padding: '1rem', background: 'rgba(248, 113, 113, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px', textAlign: 'center', color: 'var(--danger)', boxShadow: '0 0 15px rgba(248, 113, 113, 0.2)' }}>
          Action: BLOCK / ALLOW
        </div>

        {/* CSS Animated Connectors (using standard HTML/CSS for absolute stability) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes flowAnim {
            0% { background-position: 0 0; }
            100% { background-position: 50px 0; }
          }
          .anim-line {
            position: absolute;
            height: 2px;
            z-index: 1;
            background: repeating-linear-gradient(90deg, transparent, transparent 5px, rgba(255,255,255,0.5) 5px, rgba(255,255,255,0.5) 10px);
            animation: flowAnim 1s linear infinite;
          }
        `}} />
        
        {/* Simplified connecting lines */}
        <div className="anim-line" style={{ top: '50%', left: '15%', width: '15%' }} />
        <div className="anim-line" style={{ top: '35%', left: '45%', width: '15%', transform: 'rotate(15deg)' }} />
        <div className="anim-line" style={{ top: '65%', left: '45%', width: '15%', transform: 'rotate(-15deg)' }} />
        <div className="anim-line" style={{ top: '50%', left: '70%', width: '10%' }} />

      </div>
    </div>
  );
}
