import React from 'react';
import SiteNavbar from '@/components/SiteNavbar';
import { Activity, Network, BarChart, ShieldAlert, MonitorPlay, Users } from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: <Activity size={32} color="var(--primary)" />,
      title: "Real-Time WebSocket Feed",
      description: "Monitor thousands of transactions per second via our live WebSocket integration. Anomalies are flagged instantly with sub-millisecond latency."
    },
    {
      icon: <Network size={32} color="var(--accent)" />,
      title: "Entity Network Graphs",
      description: "Visualize complex money-laundering rings and synthetic identity rings using interactive 3D force-directed graphs."
    },
    {
      icon: <MonitorPlay size={32} color="var(--danger)" />,
      title: "Presentation Mode",
      description: "A built-in fullscreen slideshow mode designed specifically for project defenses and stakeholder demonstrations."
    },
    {
      icon: <ShieldAlert size={32} color="#F59E0B" />,
      title: "Deterministic Rules Engine",
      description: "Combine AI predictions with strict deterministic rules (e.g., Block transactions > $10,000 in specific risk zones) for maximum security."
    },
    {
      icon: <BarChart size={32} color="#10B981" />,
      title: "Offline Batch Evaluation",
      description: "Upload historical transaction data via CSV to run bulk fraud evaluations using our pre-trained PyTorch models."
    },
    {
      icon: <Users size={32} color="#8B5CF6" />,
      title: "Role-Based Access Control (RBAC)",
      description: "Secure JWT authentication dividing users into Analysts (Read-only monitoring) and Admins (Full model tuning access)."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)', background: 'var(--background)' }}>
      <SiteNavbar />
      
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Platform <span className="glow-text-primary">Features</span></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            A comprehensive suite of tools built for enterprise-grade fraud analysts and security administrators.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '6rem' }}>
          {featureList.map((f, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ background: 'var(--surface-border)', padding: '1rem', borderRadius: '12px', alignSelf: 'flex-start' }}>
                {f.icon}
              </div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{f.title}</h2>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.description}</p>
            </div>
          ))}
        </div>
      </main>
      
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} MCA Major Project. Designed for Enterprise Security.</p>
      </footer>
    </div>
  );
}
