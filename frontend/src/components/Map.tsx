"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const busIcon = new L.Icon({
  iconUrl: "/icons/bus.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function Map() {
  return (
    <MapContainer
      center={[0.3476, 32.5825]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={[0.3476, 32.5825]}
        icon={busIcon}
      >
        <Popup>
          🚌 Bus 01
          <br />
          Kampala City Centre
        </Popup>
      </Marker>
    </MapContainer>
  );
}