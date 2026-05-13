import React from 'react';
import SiteNavbar from '@/components/SiteNavbar';
import { Skull, Fingerprint, Globe, Timer } from 'lucide-react';

export default function Threats() {
  const threats = [
    {
      icon: <Skull size={40} color="var(--danger)" />,
      title: "Zero-Day Anomalies",
      description: "Brand new fraud vectors that have never been seen before in historical datasets. Traditional rule-based engines fail completely here, but our VAE instantly flags them due to reconstruction errors."
    },
    {
      icon: <Fingerprint size={40} color="var(--primary)" />,
      title: "Synthetic Identity Fraud",
      description: "Criminals combine real and fake information to create a 'synthetic' identity. Our Network Graph analytics trace relationships between disparate transactions to uncover the hidden fraud ring."
    },
    {
      icon: <Globe size={40} color="var(--accent)" />,
      title: "Cross-Border Account Takeovers",
      description: "When a compromised account suddenly initiates transactions in foreign jurisdictions. Detected via velocity checks and IP geofencing integrated into our Rules Engine."
    },
    {
      icon: <Timer size={40} color="#F59E0B" />,
      title: "High-Velocity Card Testing",
      description: "Botnets testing stolen credit card numbers with small, rapid transactions. Our system detects the temporal frequency anomaly instantly via the live WebSocket stream."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)', background: 'var(--background)' }}>
      <SiteNavbar />
      
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: 'var(--danger)' }}>Threat Landscape</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            The financial sector is under constant attack. CyberGuard is specifically engineered to neutralize these highly sophisticated fraud vectors.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '6rem' }}>
          {threats.map((t, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '2rem', borderLeft: '4px solid var(--danger)' }}>
              <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '1rem', borderRadius: '12px' }}>
                {t.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{t.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>{t.description}</p>
              </div>
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
