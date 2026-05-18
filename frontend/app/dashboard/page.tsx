"use client";

import React, { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import KPICards from '@/components/KPICards';
import LiveFeed from '@/components/LiveFeed';
import GANHub from '@/components/GANHub';
import AnomalyChart from '@/components/AnomalyChart';
import ModelTuning from '@/components/ModelTuning';
import Analytics from '@/components/Analytics';
import GeoMap from '@/components/GeoMap';
import SystemHealth from '@/components/SystemHealth';
import NetworkGraph from '@/components/NetworkGraph';
import MLMetrics from '@/components/MLMetrics';
import RulesEngine from '@/components/RulesEngine';
import BatchEvaluator from '@/components/BatchEvaluator';
import ThreatAlerts from '@/components/ThreatAlerts';
import AIAssistant from '@/components/AIAssistant';
import { Sun, Moon, Filter, Download, Play, ChevronLeft, ChevronRight, X, Home as HomeIcon } from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [filter, setFilter] = useState<'all' | 'high_risk'>('all');
  const [presentationMode, setPresentationMode] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const TOTAL_SLIDES = 4;
  const ws = useRef<WebSocket | null>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!presentationMode) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setCurrentSlide(s => Math.min(TOTAL_SLIDES - 1, s + 1));
      if (e.key === 'ArrowLeft') setCurrentSlide(s => Math.max(0, s - 1));
      if (e.key === 'Escape') setPresentationMode(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [presentationMode]);

  useEffect(() => {
    const storedRole = localStorage.getItem("genai_role");
    const storedToken = localStorage.getItem("genai_token");
    if (!storedRole || !storedToken) {
      window.location.href = "/login";
      return;
    }
    setRole(storedRole);

    const storedTheme = localStorage.getItem("genai_theme") as 'dark' | 'light';
    if (storedTheme) {
      setTheme(storedTheme);
      document.documentElement.setAttribute('data-theme', storedTheme);
    }

    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${baseUrl}/api/transactions?limit=20`)
      .then(res => res.json())
      .then(data => {
        if(data.transactions) setTransactions(data.transactions.reverse());
      })
      .catch(err => console.error(err));

    const connectWS = () => {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const wsUrl = baseUrl.replace(/^http/, 'ws');
      ws.current = new WebSocket(`${wsUrl}/ws/transactions`);
      ws.current.onmessage = (event) => {
        const txn = JSON.parse(event.data);
        setTransactions(prev => [...prev, txn].slice(-50));
      };
      ws.current.onclose = () => setTimeout(connectWS, 3000);
    };

    connectWS();
    return () => ws.current?.close();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("genai_role");
    localStorage.removeItem("genai_token");
    window.location.href = "/login";
  };

  const exportPDF = async () => {
    if (!dashboardRef.current) return;
    const canvas = await html2canvas(dashboardRef.current, { backgroundColor: '#0a0a0f', scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('GenAI_CyberGuard_Report.pdf');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem("genai_theme", newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const exportCSV = () => {
    const headers = "ID,Amount,Timestamp,Risk Score,Is Anomaly,Lat,Lng\n";
    const csv = transactions.map(t => 
      `${t.id},${t.amount},${t.timestamp},${t.risk_score},${t.is_anomaly},${t.location_lat},${t.location_lng}`
    ).join("\n");
    
    const blob = new Blob([headers + csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GenAI_Fraud_Report_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (!role) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Authenticating...</div>;

  const filteredTransactions = transactions.filter(t => filter === 'all' || (filter === 'high_risk' && t.is_anomaly));

  if (presentationMode) {
    return (
      <div style={{ height: '100vh', width: '100vw', background: 'var(--background)', position: 'fixed', top: 0, left: 0, zIndex: 9999, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 style={{ color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: 'bold' }}>GenAI CyberGuard - Slide {currentSlide + 1} of {TOTAL_SLIDES}</h2>
          <button onClick={() => setPresentationMode(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
        </div>
        
        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <button onClick={() => setCurrentSlide(s => Math.max(0, s - 1))} disabled={currentSlide === 0} style={{ position: 'absolute', left: 0, zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: currentSlide === 0 ? 'transparent' : 'var(--primary)', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}><ChevronLeft size={32} /></button>
          
          <div style={{ width: '90%', height: '90%', display: 'flex', flexDirection: 'column', gap: '1.5rem', animation: 'fadeIn 0.5s ease-in-out' }} key={currentSlide}>
            {currentSlide === 0 && (
              <>
                <KPICards transactions={filteredTransactions} />
                <div style={{ flex: 1 }}><GeoMap transactions={filteredTransactions} /></div>
              </>
            )}
            {currentSlide === 1 && (
              <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
                <div style={{ flex: 1 }}><NetworkGraph transactions={filteredTransactions} /></div>
                <div style={{ flex: 1 }}><MLMetrics /></div>
              </div>
            )}
            {currentSlide === 2 && (
              <div style={{ display: 'flex', gap: '1.5rem', height: '100%', flexDirection: 'column' }}>
                <div style={{ flex: 1 }}><AnomalyChart transactions={filteredTransactions} /></div>
                <div style={{ flex: 1 }}><LiveFeed transactions={filteredTransactions} /></div>
              </div>
            )}
            {currentSlide === 3 && (
              <div style={{ display: 'flex', gap: '1.5rem', height: '100%' }}>
                <div style={{ flex: 1 }}>{role === "Admin" ? <GANHub /> : <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Admin required.</div>}</div>
                <div style={{ flex: 1 }}>{role === "Admin" ? <BatchEvaluator /> : <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Admin required.</div>}</div>
              </div>
            )}
          </div>
          
          <button onClick={() => setCurrentSlide(s => Math.min(TOTAL_SLIDES - 1, s + 1))} disabled={currentSlide === TOTAL_SLIDES - 1} style={{ position: 'absolute', right: 0, zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', color: currentSlide === TOTAL_SLIDES - 1 ? 'transparent' : 'var(--primary)', cursor: 'pointer', padding: '1rem', borderRadius: '50%' }}><ChevronRight size={32} /></button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" ref={dashboardRef} style={{ padding: '2rem' }}>
      <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="glow-text-primary" style={{ fontSize: '2rem', fontWeight: 'bold' }}>GenAI CyberGuard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Real-time Hybrid GAN + VAE Fraud Detection Framework</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', background: 'var(--surface)', borderRadius: '8px', padding: '0.25rem', border: '1px solid var(--surface-border)' }}>
            <button 
              onClick={() => setFilter('all')} 
              style={{ padding: '0.5rem 1rem', background: filter === 'all' ? 'var(--primary-glow)' : 'transparent', color: filter === 'all' ? 'var(--primary)' : 'var(--text-muted)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}
            >All Data</button>
            <button 
              onClick={() => setFilter('high_risk')} 
              style={{ padding: '0.5rem 1rem', background: filter === 'high_risk' ? 'var(--danger-glow)' : 'transparent', color: filter === 'high_risk' ? 'var(--danger)' : 'var(--text-muted)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}
            >Critical Only</button>
          </div>

          <button onClick={() => window.location.href = '/'} style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Back to Landing Page">
            <HomeIcon size={20} />
          </button>
          
          <button onClick={toggleTheme} style={{ background: 'var(--surface)', border: '1px solid var(--surface-border)', color: 'var(--text-main)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => { setPresentationMode(true); setCurrentSlide(0); }} style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
              <Play size={16} fill="currentColor" /> Present
            </button>
            <button onClick={exportCSV} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Download size={16} /> CSV
            </button>
            <button onClick={exportPDF} style={{ background: 'var(--primary)', border: '1px solid var(--primary)', color: '#000', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}>
              PDF
            </button>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.875rem', color: 'var(--text-main)', fontWeight: 'bold' }}>Logged in as: {role}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status: <span style={{ color: 'var(--primary)' }}>Active</span></span>
          </div>
          <button onClick={handleLogout} style={{ background: 'rgba(248, 113, 113, 0.1)', border: '1px solid rgba(248, 113, 113, 0.3)', color: 'var(--danger)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', cursor: 'pointer' }}>
            Logout
          </button>
          
          {/* Indian Flag Logo */}
          <div style={{ 
            width: '40px', 
            height: '26px', 
            borderRadius: '4px', 
            overflow: 'hidden', 
            border: '1px solid var(--surface-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: '0.5rem'
          }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" 
              alt="India Flag" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ThreatAlerts transactions={transactions} />
        
        <KPICards transactions={filteredTransactions} />
        
        <div className="grid-dashboard">
          <div className="col-span-8"><GeoMap transactions={filteredTransactions} /></div>
          <div className="col-span-4"><SystemHealth /></div>
        </div>

        <div className="grid-dashboard">
          <div className="col-span-6"><NetworkGraph transactions={filteredTransactions} /></div>
          <div className="col-span-6"><MLMetrics /></div>
        </div>



        <div className="grid-dashboard">
          <div className="col-span-8"><AnomalyChart transactions={filteredTransactions} /></div>
          <div className="col-span-4">
            {role === "Admin" ? <ModelTuning /> : <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Admin access required to tune GenAI Models.</div>}
          </div>
        </div>

        <LiveFeed transactions={filteredTransactions} />

        <div className="grid-dashboard">
          <div className="col-span-6">
            {role === "Admin" ? <RulesEngine /> : <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Admin access required for Rules Engine.</div>}
          </div>
          <div className="col-span-6">
            <Analytics />
          </div>
        </div>
        
        <div className="grid-dashboard">
          <div className="col-span-12">
            {role === "Admin" ? <BatchEvaluator /> : <div className="glass-panel" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Admin access required for Offline Batch Evaluation.</div>}
          </div>
        </div>
        
        <div className="grid-dashboard">
          <div className="col-span-12">
            {role === "Admin" ? <GANHub /> : <div className="glass-panel" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>Admin access required for GAN Hub.</div>}
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
}
