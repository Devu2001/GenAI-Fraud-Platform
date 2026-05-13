"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Shield, Cpu, Activity, Lock, ArrowRight, Zap, Eye, BarChart3 } from 'lucide-react';
import AIPipeline from '@/components/AIPipeline';
import SiteNavbar from '@/components/SiteNavbar';

const CyberTerminal = () => {
  const [lines, setLines] = useState<string[]>([]);
  const logs = [
    "[SYSTEM] Initializing Hybrid VAE-GAN Pipeline...",
    "[SCAN] Monitoring inbound websocket traffic...",
    "[WARN] High latency detected on node-4...",
    "[OK] Latency resolved. Stream stable.",
    "[ALERT] Zero-day anomaly detected at IP 192.168.1.5!",
    "[ACTION] Threat neutralized. Synthesizing new defense rules...",
    "[SYSTEM] System hardened. Awaiting next event..."
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < logs.length) {
        setLines(prev => [...prev, logs[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ background: '#0a0a0a', border: '1px solid var(--surface-border)', borderRadius: '8px', padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', textAlign: 'left', width: '100%', maxWidth: '500px', height: '220px', overflowY: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.5)', position: 'relative' }}>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: line && (line.includes('[ALERT]') || line.includes('[WARN]')) ? 'var(--danger)' : 'var(--primary)' }}>
            {line}
          </div>
        ))}
        {lines.length < logs.length && <div style={{ color: 'var(--text-muted)' }}>_</div>}
      </div>
    </div>
  );
};

const ImpactCounters = () => {
  const [txs, setTxs] = useState(0);
  const [threats, setThreats] = useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 45312;
      if (start >= 1450230) {
        setTxs(1450230);
        setThreats(14204);
        clearInterval(interval);
      } else {
        setTxs(start);
        setThreats(Math.floor(start * 0.0097));
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4rem', padding: '3rem 0', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.02)', margin: '0 -2rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>{txs.toLocaleString()}</div>
        <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Transactions Analyzed</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>{threats.toLocaleString()}</div>
        <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Threats Neutralized</div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>99.9%</div>
        <div style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.875rem' }}>Detection Accuracy</div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  
  // A simple animation helper for scrolling into view (Intersection Observer)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)' }}>
      <SiteNavbar />

      <main style={{ flex: 1, padding: '0 2rem' }}>
        
        {/* HERO SECTION */}
        <section style={{ minHeight: '80vh', padding: '4rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <div style={{ position: 'absolute', width: '300px', height: '300px', background: 'var(--primary-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1 }}></div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center', maxWidth: '1200px', width: '100%' }}>
            {/* Left side text */}
            <div style={{ flex: '1 1 500px' }}>
              <h1 style={{ fontSize: '4rem', fontWeight: 'bold', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Next-Generation <br/><span className="glow-text-primary">Fraud Detection</span> Powered by GenAI
              </h1>
              <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                An enterprise-grade hybrid AI framework utilizing Generative Adversarial Networks (GAN) and Variational Autoencoders (VAE) to detect and neutralize zero-day financial threats in real-time.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <Link href="/dashboard" style={{ padding: '1rem 2.5rem', borderRadius: '8px', background: 'var(--primary)', color: '#000', textDecoration: 'none', fontSize: '1.125rem', fontWeight: 'bold', boxShadow: '0 0 20px var(--primary-glow)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Access Platform <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            {/* Right side Terminal */}
            <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
              <CyberTerminal />
            </div>
          </div>
        </section>

        {/* TECH STACK MARQUEE */}
        <div style={{ width: '100vw', margin: '0 -2rem', overflow: 'hidden', padding: '1.5rem 0', background: 'var(--surface)', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)' }}>
          <div style={{ display: 'flex', width: '200%', animation: 'marquee 20s linear infinite', color: 'var(--text-muted)', fontSize: '1.25rem', fontWeight: 'bold', gap: '4rem', whiteSpace: 'nowrap' }}>
            <span>Next.js 16</span> • <span>React</span> • <span>FastAPI</span> • <span>Python 3.11</span> • <span>PyTorch</span> • <span>Generative Adversarial Networks (GAN)</span> • <span>Variational Autoencoders (VAE)</span> • <span>WebSockets</span> • <span>Leaflet.js</span> • 
            <span>Next.js 16</span> • <span>React</span> • <span>FastAPI</span> • <span>Python 3.11</span> • <span>PyTorch</span> • <span>Generative Adversarial Networks (GAN)</span> • <span>Variational Autoencoders (VAE)</span> • <span>WebSockets</span> • <span>Leaflet.js</span>
          </div>
        </div>

        {/* IMPACT COUNTERS */}
        <ImpactCounters />

        {/* WHAT IS GEN AI? */}
        <section className="fade-in-section" style={{ padding: '6rem 0', borderTop: '1px solid var(--surface-border)', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '4rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Cpu color="var(--accent)" size={48} style={{ marginBottom: '1.5rem' }} />
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>What is Generative AI?</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1rem' }}>
                Generative AI (GenAI) refers to deep-learning models capable of generating highly realistic, high-quality data—including text, images, or in our case, <strong>complex financial transaction patterns</strong>.
              </p>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                Unlike traditional AI which only classifies existing data, GenAI can synthesize entirely new, unseen scenarios. We leverage this to train our systems against "zero-day" attacks—fraud strategies that have never been seen before in the real world.
              </p>
            </div>
            <div className="glass-panel" style={{ flex: 1, padding: '3rem', textAlign: 'center', border: '1px solid var(--accent)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🧠</div>
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Synthetic Imagination</h3>
              <p style={{ color: 'var(--text-muted)' }}>Creating millions of simulated fraud vectors to harden our defenses before an attack ever happens.</p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (ARCHITECTURE) */}
        <section className="fade-in-section" style={{ padding: '6rem 0', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>How It Works: The Hybrid Architecture</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                CyberGuard combines two distinct neural network architectures to create an impenetrable shield against financial fraud.
              </p>
            </div>
            
            <div style={{ marginBottom: '4rem' }}>
              <AIPipeline />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              {/* GAN */}
              <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--danger-glow)', padding: '1rem', borderRadius: '12px' }}>
                    <Zap color="var(--danger)" size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>1. GAN (Data Synthesis)</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <strong>Generative Adversarial Networks</strong> consist of two models: a Generator that creates fake fraud data, and a Discriminator that tries to catch it. By fighting each other, the GAN produces incredibly realistic synthetic fraud samples to solve the problem of imbalanced datasets (since real fraud is rare).
                </p>
              </div>

              {/* VAE */}
              <div className="glass-panel" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ background: 'var(--primary-glow)', padding: '1rem', borderRadius: '12px' }}>
                    <Activity color="var(--primary)" size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>2. VAE (Anomaly Detection)</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7 }}>
                  <strong>Variational Autoencoders</strong> learn the underlying distribution of completely normal, safe transactions. When a new transaction arrives in real-time, the VAE attempts to reconstruct it. If the reconstruction fails (high error rate), the system instantly flags it as a critical anomaly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="fade-in-section" style={{ padding: '6rem 0', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', margin: '0 -2rem', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Why CyberGuard?</h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)' }}>The core benefits of upgrading to a Generative AI security posture.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                <Shield size={40} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Zero-Day Protection</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Our GAN simulates attacks that haven't happened yet, meaning the system is prepared for future threats, not just historical ones.</p>
              </div>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                <Eye size={40} color="var(--accent)" style={{ margin: '0 auto 1.5rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Explainable AI (XAI)</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>Black-box models are dangerous. Our integrated AI Security Assistant can explain exactly <em>why</em> a transaction was flagged in plain English.</p>
              </div>
              <div className="glass-panel" style={{ textAlign: 'center', padding: '2rem' }}>
                <BarChart3 size={40} color="#F59E0B" style={{ margin: '0 auto 1.5rem' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Reduced False Positives</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>By combining VAE anomaly detection with a strict deterministic Rules Engine, we drastically reduce the number of legitimate transactions blocked.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO USE / WORKFLOW */}
        <section className="fade-in-section" style={{ padding: '6rem 0', marginBottom: '4rem', opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.8s, transform 0.8s' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '3rem', textAlign: 'center' }}>How to Use the Platform</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--surface-border)', opacity: 0.5 }}>01</div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Login via Secure Portal</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Access the platform as an <strong>Analyst</strong> (read-only monitoring) or an <strong>Admin</strong> (full access to model tuning and batch evaluation). Sessions are secured via JWT.</p>
                </div>
              </div>
              
              <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--surface-border)', opacity: 0.5 }}>02</div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Monitor Real-Time Feeds</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Use the Live Data Feed, 2D Global Map, and Network Graph to monitor incoming WebSocket transactions. Critical threats will trigger automated toast alerts.</p>
                </div>
              </div>

              <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--surface-border)', opacity: 0.5 }}>03</div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Present Findings</h4>
                  <p style={{ color: 'var(--text-muted)' }}>Click the <strong>Present</strong> button on the dashboard to enter a fullscreen, slide-by-slide view, perfect for demonstrating the system to stakeholders.</p>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '4rem' }}>
              <Link href="/login" style={{ padding: '1rem 3rem', borderRadius: '8px', background: 'var(--primary)', color: '#000', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 0 20px var(--primary-glow)' }}>
                Start Analysis <Lock size={20} />
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--surface-border)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>&copy; {new Date().getFullYear()} MCA Major Project. Designed for Enterprise Security.</p>
      </footer>

      {/* Global CSS for the fade-in animation */}
      <style dangerouslySetInnerHTML={{__html: `
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `}} />
    </div>
  );
}
