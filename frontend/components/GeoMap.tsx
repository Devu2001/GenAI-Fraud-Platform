"use client";

import React from "react";
import dynamic from 'next/dynamic';

// Leaflet requires window object, so we must disable SSR for the actual map component
const GeoMapInner = dynamic(() => import('./GeoMapInner'), { 
  ssr: false,
  loading: () => <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Loading 2D Map...</div>
});

export default function GeoMap({ transactions }: { transactions: any[] }) {
  return (
    <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Global Fraud Activity (2D Map)</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Real-time anomalous transactions routing to central analysis.</p>
      
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
        <GeoMapInner transactions={transactions} />
      </div>
    </div>
  );
}
