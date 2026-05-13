import React from 'react';
import Link from 'next/link';
import { Shield, ArrowRight } from 'lucide-react';

export default function SiteNavbar() {
  return (
    <nav style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--surface-border)' }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
        <Shield color="var(--primary)" size={28} />
        <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0, letterSpacing: '1px' }} className="glow-text-primary">GenAI CyberGuard</h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <Link href="/how-it-works" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>How It Works</Link>
        <Link href="/features" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Features</Link>
        <Link href="/threats" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>Threats</Link>
        <Link href="/faq" style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: '500', transition: 'color 0.3s' }}>FAQ</Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/login" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', border: '1px solid var(--primary)', color: 'var(--primary)', textDecoration: 'none', fontWeight: '600', transition: 'all 0.3s' }}>
          Analyst Login
        </Link>
        <Link href="/dashboard" style={{ padding: '0.5rem 1.5rem', borderRadius: '8px', background: 'var(--primary)', color: '#000', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 0 15px var(--primary-glow)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Launch Dashboard <ArrowRight size={18} />
        </Link>
      </div>
    </nav>
  );
}
