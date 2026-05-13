"use client";

import React, { useState } from 'react';
import { UploadCloud, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

export default function BatchEvaluator() {
  const [file, setFile] = useState<File | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setResults(null);
    }
  };

  const handleEvaluate = async () => {
    if (!file) return;
    
    setIsEvaluating(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("genai_token");
      const response = await fetch('http://localhost:8000/api/evaluate-csv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });
      const data = await response.json();
      if (data.status === 'success') {
        setResults(data.data);
      } else {
        alert("Evaluation failed: " + data.message);
      }
    } catch (error) {
      console.error("Error evaluating CSV:", error);
      alert("Failed to connect to the evaluation server.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Batch Dataset Evaluator</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Upload a CSV dataset of transactions to analyze offline using the GenAI model.</p>

      {!results ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              border: '2px dashed var(--surface-border)',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.02)',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              padding: '2rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
          >
            <UploadCloud size={48} color={file ? "var(--accent)" : "var(--text-muted)"} style={{ marginBottom: '1rem' }} />
            {file ? (
              <span style={{ color: 'var(--text-main)', fontWeight: 'bold' }}>{file.name}</span>
            ) : (
              <span style={{ color: 'var(--text-muted)' }}>Click to upload a .csv file</span>
            )}
            <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} />
          </label>

          <button 
            onClick={handleEvaluate} 
            disabled={!file || isEvaluating}
            style={{
              padding: '0.75rem',
              background: file ? 'var(--primary)' : 'var(--surface-border)',
              color: file ? '#000' : 'var(--text-muted)',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: file && !isEvaluating ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {isEvaluating ? 'Evaluating Dataset...' : 'Run GenAI Evaluation'}
          </button>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--surface-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle size={20} color="var(--primary)" />
              <span style={{ fontWeight: 'bold' }}>Evaluation Complete: {results.length} records analyzed.</span>
            </div>
            <button onClick={() => { setFile(null); setResults(null); }} style={{ background: 'transparent', border: '1px solid var(--text-muted)', color: 'var(--text-main)', padding: '0.25rem 0.75rem', borderRadius: '4px', cursor: 'pointer' }}>
              Upload New File
            </button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead style={{ background: 'rgba(255,255,255,0.05)', position: 'sticky', top: 0 }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)' }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)' }}>Amount (₹)</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)' }}>Risk Score</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: 'var(--text-muted)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--surface-border)', background: row.is_anomaly ? 'rgba(248, 113, 113, 0.1)' : 'transparent' }}>
                    <td style={{ padding: '0.75rem', fontFamily: 'monospace' }}>{row.id}</td>
                    <td style={{ padding: '0.75rem' }}>{row.amount.toFixed(2)}</td>
                    <td style={{ padding: '0.75rem' }}>{row.risk_score.toFixed(3)}</td>
                    <td style={{ padding: '0.75rem' }}>
                      {row.is_anomaly ? (
                        <span style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><AlertTriangle size={14}/> FRAUD</span>
                      ) : (
                        <span style={{ color: 'var(--primary)' }}>CLEAN</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
