"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, ChevronUp, ChevronDown } from 'lucide-react';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hello! I am CyberGuard AI. Ask me to explain anomalies, tune models, or summarize the latest batch runs.' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isExpanded]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage = input;
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');

    // Mock AI Response with slight delay
    setTimeout(() => {
      let aiResponse = "I've analyzed the system. The current risk vectors indicate normal traffic, but I'm monitoring an IP cluster in Eastern Europe for potential botnet activity.";
      
      if (userMessage.toLowerCase().includes('explain') || userMessage.toLowerCase().includes('why')) {
        aiResponse = "That transaction was flagged primarily due to a 'Velocity Anomaly'. The same user account attempted 14 transactions from 3 different geographic regions within 5 minutes, which heavily deviates from the learned baseline in the VAE model.";
      } else if (userMessage.toLowerCase().includes('tune') || userMessage.toLowerCase().includes('gan')) {
        aiResponse = "I can trigger the GAN Hub to synthesize more minority-class fraud samples. This will help balance the dataset and reduce false positives in the Rules Engine. Would you like me to generate a batch of 500 samples now?";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'var(--primary)',
          color: '#000',
          border: 'none',
          boxShadow: '0 8px 32px rgba(74, 222, 128, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 9998,
          transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Bot size={32} />
      </button>
    );
  }

  return (
    <div className="glass-panel" style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      width: '380px',
      height: isExpanded ? '600px' : '400px',
      zIndex: 9998,
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      transition: 'height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)'
    }}>
      {/* Header */}
      <div style={{ 
        padding: '1rem', 
        borderBottom: '1px solid var(--surface-border)', 
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bot color="var(--primary)" size={24} />
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold' }}>CyberGuard AI</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setIsExpanded(!isExpanded)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            {isExpanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </button>
          <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface-border)',
            color: msg.role === 'user' ? '#000' : 'var(--text-main)',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            borderBottomRightRadius: msg.role === 'user' ? '0' : '12px',
            borderBottomLeftRadius: msg.role === 'ai' ? '0' : '12px',
            fontSize: '0.875rem',
            lineHeight: 1.5
          }}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--surface-border)' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI to analyze fraud vectors..."
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text-main)', outline: 'none', fontSize: '0.875rem' }}
          />
          <button onClick={handleSend} style={{ background: 'var(--primary)', border: 'none', width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000' }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
