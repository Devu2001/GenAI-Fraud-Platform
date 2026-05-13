"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-force-graph-2d to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function NetworkGraph({ transactions }: { transactions: any[] }) {
  const [graphData, setGraphData] = useState<{ nodes: any[], links: any[] }>({ nodes: [], links: [] });
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 400, height: 300 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.clientWidth,
        height: containerRef.current.clientHeight
      });
    }

    // Generate more complex mock fraud ring data
    const nodes: any[] = [];
    const links: any[] = [];
    
    // Create central nodes (Threat Actors / IPs / Devices)
    nodes.push({ id: 'ip_10.0.0.99', group: 1, val: 30, name: 'Suspicious IP' });
    nodes.push({ id: 'dev_iphone12', group: 1, val: 25, name: 'Rooted Device' });
    nodes.push({ id: 'ip_192.168.1.5', group: 1, val: 20, name: 'Proxy Node' });

    // Link anomalies to these central nodes to simulate a complex ring
    const anomalies = transactions.filter(t => t.is_anomaly).slice(0, 15);
    anomalies.forEach((t, i) => {
      nodes.push({ id: t.id, group: 2, val: 8, name: `Fraud Txn: ${t.id}` });
      
      // Randomly link to 1 or 2 threat nodes
      links.push({ source: 'ip_10.0.0.99', target: t.id, value: 2 });
      if (i % 3 === 0) links.push({ source: 'dev_iphone12', target: t.id, value: 2 });
      if (i % 5 === 0) links.push({ source: 'ip_192.168.1.5', target: t.id, value: 2 });
    });

    setGraphData({ nodes, links });
  }, [transactions]);

  // Custom node drawing for a "glowing" next-gen effect
  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const label = node.name;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Sans-Serif`;
    const textWidth = ctx.measureText(label).width;
    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

    const radius = node.val;
    const color = node.group === 1 ? '#ef4444' : '#3b82f6'; // Neon Red for Threats, Blue for Txns
    const glowColor = node.group === 1 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.4)';

    // Draw Glow
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius * 1.5, 0, 2 * Math.PI, false);
    ctx.fillStyle = glowColor;
    ctx.fill();

    // Draw Core
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = color;
    ctx.fill();

    // Draw Label
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(label, node.x, node.y + radius + fontSize);
  }, []);

  return (
    <div className="glass-panel" style={{ height: '500px', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>Entity Resolution (Fraud Rings)</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>Next-gen visualization of anomalous transaction networks.</p>
      
      <div ref={containerRef} style={{ flex: 1, background: 'radial-gradient(circle at center, rgba(30,30,40,1) 0%, rgba(10,10,15,1) 100%)', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        {graphData.nodes.length > 0 && (
          <ForceGraph2D
            width={dimensions.width}
            height={dimensions.height}
            graphData={graphData}
            nodeCanvasObject={paintNode}
            linkColor={() => 'rgba(147, 197, 253, 0.3)'} // Light blue links
            linkWidth={1.5}
            linkDirectionalParticles={4} // Moving particles along links!
            linkDirectionalParticleWidth={3}
            linkDirectionalParticleSpeed={0.005}
            linkDirectionalParticleColor={() => '#60a5fa'} // Bright blue particles
            backgroundColor="rgba(0,0,0,0)"
            enableNodeDrag={true}
            d3AlphaDecay={0.05}
            d3VelocityDecay={0.4}
          />
        )}
      </div>
    </div>
  );
}
