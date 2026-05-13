"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon path issues in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom glowing CSS icon for anomalies
const glowingIcon = new L.DivIcon({
  className: "custom-div-icon",
  html: `<div style="
    background-color: var(--danger);
    width: 12px;
    height: 12px;
    border-radius: 50%;
    box-shadow: 0 0 15px 5px rgba(248, 113, 113, 0.6);
    border: 2px solid #fff;
  "></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

export default function GeoMapInner({ transactions }: { transactions: any[] }) {
  const [anomalies, setAnomalies] = useState<any[]>([]);

  useEffect(() => {
    // Filter transactions to only those with valid lat/lng and are anomalies
    const validAnomalies = transactions.filter(t => 
      t.is_anomaly && t.location_lat && t.location_lng
    );
    setAnomalies(validAnomalies);
  }, [transactions]);

  // Coordinates for the central Data Center (e.g., New York)
  const dataCenter: [number, number] = [40.7128, -74.0060];

  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "8px", overflow: "hidden" }}>
      <MapContainer 
        center={[20, 0]} 
        zoom={2} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", background: "#050508" }}
        attributionControl={false}
      >
        {/* CartoDB Dark Matter Base Map */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render Anomalies and connecting lines */}
        {anomalies.map((anomaly) => (
          <React.Fragment key={anomaly.id}>
            <Marker 
              position={[anomaly.location_lat, anomaly.location_lng]} 
              icon={glowingIcon}
            />
            {/* Draw a subtle red line to the Data Center */}
            <Polyline 
              positions={[[anomaly.location_lat, anomaly.location_lng], dataCenter]} 
              pathOptions={{ color: 'var(--danger)', weight: 1.5, opacity: 0.3, dashArray: '4, 4' }}
            />
          </React.Fragment>
        ))}

        {/* Central Data Center Marker */}
        <Marker 
          position={dataCenter} 
          icon={new L.DivIcon({
            className: "custom-div-icon",
            html: `<div style="
              background-color: var(--primary);
              width: 14px;
              height: 14px;
              border-radius: 50%;
              box-shadow: 0 0 15px 5px rgba(74, 222, 128, 0.6);
              border: 2px solid #fff;
            "></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
          })}
        />
      </MapContainer>
    </div>
  );
}
