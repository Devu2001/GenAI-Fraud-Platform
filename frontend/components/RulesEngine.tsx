"use client";

import React, { useState } from 'react';

export default function RulesEngine() {
  const [rules, setRules] = useState([
    { id: 1, field: 'Amount', operator: '>', value: '5000', action: 'CRITICAL ALERT' },
    { id: 2, field: 'Location Mismatch', operator: '>', value: '0.8', action: 'BLOCK' }
  ]);

  const [newRule, setNewRule] = useState({ field: 'Amount', operator: '>', value: '', action: 'ALERT' });

  const handleAddRule = () => {
    if (newRule.value) {
      setRules([...rules, { id: Date.now(), ...newRule }]);
      setNewRule({ ...newRule, value: '' });
    }
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(r => r.id !== id));
  };

  return (
    <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Custom Alert Rules Engine</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Define manual override rules alongside the AI model.</p>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <select value={newRule.field} onChange={e => setNewRule({...newRule, field: e.target.value})} style={selectStyle}>
          <option value="Amount">Amount</option>
          <option value="Location Mismatch">Location Mismatch</option>
          <option value="Velocity">Velocity</option>
        </select>
        <select value={newRule.operator} onChange={e => setNewRule({...newRule, operator: e.target.value})} style={selectStyle}>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value="=">=</option>
        </select>
        <input 
          type="text" 
          placeholder="Value" 
          value={newRule.value} 
          onChange={e => setNewRule({...newRule, value: e.target.value})} 
          style={inputStyle} 
        />
        <select value={newRule.action} onChange={e => setNewRule({...newRule, action: e.target.value})} style={selectStyle}>
          <option value="ALERT">ALERT</option>
          <option value="CRITICAL ALERT">CRITICAL</option>
          <option value="BLOCK">BLOCK</option>
        </select>
        <button onClick={handleAddRule} style={btnStyle}>Add</button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto' }}>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Active Rules:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {rules.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', borderLeft: `3px solid ${r.action === 'BLOCK' ? 'var(--danger)' : 'var(--accent)'}` }}>
              <code style={{ fontSize: '0.875rem' }}>IF {r.field} {r.operator} {r.value} THEN <span style={{ fontWeight: 'bold' }}>{r.action}</span></code>
              <button onClick={() => removeRule(r.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const selectStyle = { padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: 'black' };
const inputStyle = { padding: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '4px', color: 'var(--text-main)', width: '80px' };
const btnStyle = { padding: '0.5rem 1rem', background: 'var(--primary)', border: 'none', borderRadius: '4px', color: '#000', fontWeight: 'bold', cursor: 'pointer' };
