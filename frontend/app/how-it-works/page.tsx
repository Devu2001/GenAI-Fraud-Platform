import React from 'react';
import SiteNavbar from '@/components/SiteNavbar';
import AIPipeline from '@/components/AIPipeline';
import { Cpu, Database, Zap, Shield } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)', background: 'var(--background)' }}>
      <SiteNavbar />
      
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>How <span className="glow-text-primary">CyberGuard</span> Works</h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Understanding the mathematics and architecture behind our Generative Adversarial Networks (GAN) and Variational Autoencoders (VAE).
          </p>
        </div>

        <div style={{ marginBottom: '6rem' }}>
          <AIPipeline />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginBottom: '6rem' }}>
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <Cpu size={48} color="var(--primary)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Data Ingestion</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Financial transactions stream into the system via high-speed WebSockets. The system normalizes raw JSON data (location, amount, timestamp, device ID) into a standardized format ready for tensor processing.
            </p>
          </div>
          
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <Zap size={48} color="var(--danger)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Generative Adversarial Network</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Because real-world fraud is extremely rare (often &lt; 0.1% of transactions), training AI models is difficult due to imbalanced datasets. Our GAN consists of a <strong>Generator</strong> that creates highly realistic fake fraud data, and a <strong>Discriminator</strong> that learns to catch it. This synthetic data fortifies our detection models.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '3rem' }}>
            <Database size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Variational Autoencoder (VAE)</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
              The VAE is trained exclusively on normal, non-fraudulent behavior. When a new transaction arrives, the VAE attempts to compress and reconstruct it. If the transaction contains unusual patterns (a "zero-day" attack), the reconstruction will fail. High reconstruction errors trigger immediate anomalies.
            </p>
          </div>
        </div>
      </main>
      
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} MCA Major Project. Designed for Enterprise Security.</p>
      </footer>
    </div>
  );
}
