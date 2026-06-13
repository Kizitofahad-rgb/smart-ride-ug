"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

const busIcon = new L.Icon({
  iconUrl: "/icons/bus.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const stationIcon = new L.Icon({
  iconUrl: "/icons/station.svg",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
  popupAnchor: [0, -28],
});

function FollowBus({
  position,
}: {
  position: [number, number];
}) {
  const map = useMap();

  useEffect(() => {
    map.panTo(position);
  }, [position, map]);

  return null;
}

export default function Map() {
  const [buses, setBuses] = useState([
    {
      id: 1,
      name: "Bus 01",
      position: [0.3476, 32.5825] as [number, number],
    },
    {
      id: 2,
      name: "Bus 02",
      position: [0.352, 32.588] as [number, number],
    },
    {
      id: 3,
      name: "Bus 03",
      position: [0.343, 32.578] as [number, number],
    },
  ]);

  const route: [number, number][] = [
    [0.3476, 32.5825],
    [0.3495, 32.584],
    [0.3515, 32.5865],
    [0.354, 32.589],
    [0.357, 32.5925],
    [0.36, 32.596],
  ];

  const stations = [
    {
      name: "🟢 Makerere Main Gate",
      position: [0.3476, 32.5825] as [number, number],
      eta: "2 mins",
    },
    {
      name: "🚏 Wandegeya",
      position: [0.3515, 32.5865] as [number, number],
      eta: "5 mins",
    },
    {
      name: "🚏 Mulago",
      position: [0.354, 32.589] as [number, number],
      eta: "8 mins",
    },
    {
      name: "🚏 Kamwokya",
      position: [0.357, 32.5925] as [number, number],
      eta: "11 mins",
    },
    {
      name: "🔴 Ntinda Terminal",
      position: [0.36, 32.596] as [number, number],
      eta: "15 mins",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBuses((prevBuses) =>
        prevBuses.map((bus) => ({
          ...bus,
          position: [
            bus.position[0] + Math.random() * 0.0005,
            bus.position[1] + Math.random() * 0.0005,
          ] as [number, number],
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MapContainer
      center={[0.3476, 32.5825]}
      zoom={15}
      style={{
        height: "500px",
        width: "100%",
        borderRadius: "20px",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Polyline
        positions={route}
        pathOptions={{
          color: "#2563eb",
          weight: 7,
        }}
      />

      <FollowBus position={buses[0].position} />

      {stations.map((station, index) => (
        <Marker
          key={index}
          position={station.position}
          icon={stationIcon}
        >
          <Popup>
            <strong>{station.name}</strong>
            <br />
            Next Bus ETA: {station.eta}
          </Popup>
        </Marker>
      ))}

      {buses.map((bus) => (
        <Marker
          key={bus.id}
          position={bus.position}
          icon={busIcon}
        >
          <Popup>
            🚌 {bus.name}
            <br />
            Route: Makerere → Ntinda
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}