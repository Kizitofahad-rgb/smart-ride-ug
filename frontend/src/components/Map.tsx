"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const busIcon = new L.Icon({
  iconUrl: "/icons/bus.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});           

export default function Map() {
  const [position, setPosition] = useState<[number, number]>([
  0.3476,
  32.5825,
]);
useEffect(() => {
  const interval = setInterval(() => {
    setPosition((prev) => [
      prev[0] + 0.0005,
      prev[1] + 0.0005,
   ]);
  }, 3000);

  return () => clearInterval(interval);
}, []);
  return (
    <MapContainer
      center={[0.3476, 32.5825]}
      zoom={15}
      style={{
  height: "450px",
  width: "100%",
}}
    
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position} icon={busIcon}>
  <Popup>
    🚌 Bus 01
    <br />
    Kampala City Centre
  </Popup>
</Marker>
    </MapContainer>
  );
}