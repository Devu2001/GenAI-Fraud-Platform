import React from 'react';
import SiteNavbar from '@/components/SiteNavbar';
import { HelpCircle } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    {
      q: "Why use a Generative Adversarial Network (GAN) for fraud detection?",
      a: "The biggest challenge in fraud detection is the 'imbalanced dataset' problem—over 99% of transactions are legitimate, so models don't have enough fraud examples to learn from. We use a GAN to synthesize realistic, fake fraud data, artificially boosting the minority class and creating a much stronger, more accurate detection model."
    },
    {
      q: "What makes this different from traditional Rule-Based systems?",
      a: "Traditional systems rely on hardcoded rules (e.g., 'Block transactions over $10k from IP X'). These fail against 'zero-day' attacks. Our system uses a Variational Autoencoder (VAE) to learn what 'normal' looks like. Anything that deviates from normal (an anomaly) is flagged automatically, even if we've never seen the attack vector before."
    },
    {
      q: "How fast is the detection pipeline?",
      a: "Our frontend consumes a high-speed WebSocket stream connected to a Python/FastAPI backend. PyTorch inferences happen in sub-millisecond timeframes, allowing the dashboard to render and alert on transactions in true real-time."
    },
    {
      q: "Why is the UI designed this way? (Vantablack Theme)",
      a: "CyberGuard is designed as an enterprise Security Operations Center (SOC) tool. The 'Vantablack' dark mode reduces eye strain for analysts monitoring screens for 8+ hours a day, and uses high-contrast neon accents to immediately draw attention to critical threats."
    },
    {
      q: "Can I test the models myself?",
      a: "Yes! If you log in with 'Admin' privileges, you will have access to the 'Offline Batch Evaluator' on the dashboard, where you can upload CSV datasets and run bulk inferences through the PyTorch models."
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', color: 'var(--text-main)', background: 'var(--background)' }}>
      <SiteNavbar />
      
      <main style={{ flex: 1, padding: '4rem 2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <HelpCircle size={48} color="var(--primary)" style={{ margin: '0 auto 1.5rem' }} />
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Evaluator <span className="glow-text-primary">FAQ</span></h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Common questions regarding the architecture, theory, and implementation of the GenAI CyberGuard MCA Major Project.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '6rem' }}>
          {faqs.map((faq, i) => (
            <div key={i} className="glass-panel" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: 'var(--text-main)' }}>{faq.q}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', lineHeight: 1.6 }}>{faq.a}</p>
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
