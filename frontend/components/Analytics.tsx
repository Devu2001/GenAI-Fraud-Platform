"use client";

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function Analytics() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    // Fetch mock analytics data
    fetch('http://localhost:8000/api/analytics')
      .then(res => res.json())
      .then(result => {
        if(result.history) setData(result.history);
      })
      .catch(err => console.error("Failed to fetch analytics", err));
  }, []);

  const handleExportPDF = () => {
    const doc = new jsPDF();
    
    // Add Title
    doc.setFontSize(18);
    doc.text("Monthly Transaction Analytics Report", 14, 22);
    
    doc.setFontSize(11);
    doc.text("GenAI CyberGuard Fraud Detection System", 14, 30);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 36);

    // Prepare Table Data
    const tableColumn = ["Date", "Fraud Attempts", "Prevented Loss (₹)"];
    const tableRows: any[] = [];

    data.forEach(row => {
      const rowData = [
        row.date,
        row.fraud_count,
        `₹${row.prevented_loss.toFixed(2)}`
      ];
      tableRows.push(rowData);
    });

    // @ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 45,
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [74, 222, 128], textColor: [0,0,0] }
    });

    doc.save(`Monthly_Fraud_Passbook_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <div className="glass-panel" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Historical Fraud Trends (30 Days)</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.875rem', color: 'var(--primary)' }}>Prevented Loss: ₹142,500</span>
          <button 
            onClick={handleExportPDF}
            style={{
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              padding: '0.25rem 0.75rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            Export Monthly Passbook
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--danger)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--danger)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="date" stroke="var(--text-muted)" fontSize={12} />
            <YAxis stroke="var(--text-muted)" fontSize={12} />
            <Tooltip 
              contentStyle={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', borderRadius: '8px' }}
              itemStyle={{ color: 'var(--text-main)' }}
            />
            <Area type="monotone" dataKey="fraud_count" name="Fraud Attempts" stroke="var(--danger)" fillOpacity={1} fill="url(#colorFraud)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
