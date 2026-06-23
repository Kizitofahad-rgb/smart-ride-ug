"use client";

import "leaflet/dist/leaflet.css";

import L from "leaflet";
import { useEffect, useState, useCallback } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";

// ===============================
// LEAFLET ICON FIX
// ===============================

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ===============================
// ICONS
// ===============================

const busIcon = new L.Icon({
  iconUrl: "/icons/bus.svg",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const stationIcon = new L.Icon({
  iconUrl: "/icons/station.svg",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

const passengerIcon = new L.Icon({
  iconUrl: "/icons/passenger.svg",
  iconSize: [35, 35],
  iconAnchor: [18, 35],
});

const startIcon = L.divIcon({
  html: "🟢",
  className: "",
  iconSize: [35, 35],
});

const endIcon = L.divIcon({
  html: "🔴",
  className: "",
  iconSize: [35, 35],
});

// ===============================
// ROUTE
// ===============================

const ROUTE: [number, number][] = [
  [0.3536, 32.5885],
  [0.3550, 32.5900],
  [0.3570, 32.5925],
  [0.3590, 32.5945],
  [0.3610, 32.5965],
  [0.3630, 32.5985],
];

const STATIONS = [
  { name: "Kampala", position: ROUTE[0] },
  { name: "Makerere", position: ROUTE[1] },
  { name: "Wandegeya", position: ROUTE[2] },
  { name: "Mulago", position: ROUTE[3] },
  { name: "Ntinda Terminal", position: ROUTE[5] },
];

// ===============================
// FOLLOW BUS
// ===============================

function FollowBus({ position }: { position: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.panTo(position, {
      animate: true,
      duration: 0.5,
    });
  }, [position, map]);

  return null;
}

// ===============================
// MAIN COMPONENT
// ===============================

export default function Map() {
  const [bus, setBus] = useState({
    id: "",
    name: "",
    latitude: ROUTE[0][0],
    longitude: ROUTE[0][1],
    speed: 0,
    passengers: 0,
    status: "active",
  });

  const [passenger, setPassenger] = useState({
    id: "P001",
    name: "Passenger 01",
    latitude: 0.3560,
    longitude: 32.5910,
    status: "waiting",
  });

  const [boarding, setBoarding] = useState(false);

  // Fetch data from backend
  const fetchData = useCallback(async () => {
    try {
      const busRes = await fetch("http://localhost:5000/api/bus");
      const busData = await busRes.json();
      setBus(busData);

      const passengerRes = await fetch("http://localhost:5000/api/passenger");
      const passengerData = await passengerRes.json();
      setPassenger(passengerData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 3000);
    return () => clearInterval(timer);
  }, [fetchData]);

  // Board passenger
  const handleBoard = async () => {
    if (boarding) return;
    setBoarding(true);
    try {
      const res = await fetch("http://localhost:5000/api/passenger/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Board failed");
      await fetchData(); // refresh both bus and passenger
    } catch (error) {
      console.error("Board error:", error);
    } finally {
      setBoarding(false);
    }
  };

  // Leave passenger (optional, added for completeness)
  const handleLeave = async () => {
    if (boarding) return;
    setBoarding(true);
    try {
      const res = await fetch("http://localhost:5000/api/passenger/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Leave failed");
      await fetchData();
    } catch (error) {
      console.error("Leave error:", error);
    } finally {
      setBoarding(false);
    }
  };

  const busPosition: [number, number] = [bus.latitude, bus.longitude];

  return (
    <div
      className="relative w-full h-[500px] overflow-hidden rounded-[20px]"
      style={{ zIndex: 0 }}
    >
      <MapContainer
        center={ROUTE[0]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* BLUE ROUTE */}
        <Polyline
          positions={ROUTE}
          pathOptions={{ color: "#2563eb", weight: 7, opacity: 0.9 }}
        />

        {/* START POINT */}
        <Marker position={ROUTE[0]} icon={startIcon}>
          <Popup>🟢 Start Point<br />Kampala</Popup>
        </Marker>

        {/* END POINT */}
        <Marker position={ROUTE[ROUTE.length - 1]} icon={endIcon}>
          <Popup>🔴 Destination<br />Ntinda Terminal</Popup>
        </Marker>

        {/* STATIONS */}
        {STATIONS.map((station, index) => (
          <Marker key={index} position={station.position} icon={stationIcon}>
            <Popup>
              🚏 <strong>{station.name}</strong>
              <br />
              Bus Stop
            </Popup>
          </Marker>
        ))}

        {/* PASSENGER MARKER WITH INTERACTIVE POPUP */}
        <Marker
          position={[passenger.latitude, passenger.longitude]}
          icon={passengerIcon}
        >
          <Popup>
            <div className="min-w-[180px]">
              <p className="font-bold text-lg mb-1">
                👤 {passenger.name || "Passenger"}
              </p>
              <p className="text-sm text-gray-600">
                Status:{" "}
                <span className="capitalize font-medium">
                  {passenger.status}
                </span>
              </p>

              {passenger.status === "waiting" && (
                <button
                  onClick={handleBoard}
                  disabled={boarding}
                  className="mt-2 w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium py-1.5 px-4 rounded-full text-sm transition"
                >
                  {boarding ? "Boarding..." : "🚌 Board Bus"}
                </button>
              )}

              {passenger.status === "onboard" && (
                <button
                  onClick={handleLeave}
                  disabled={boarding}
                  className="mt-2 w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-medium py-1.5 px-4 rounded-full text-sm transition"
                >
                  {boarding ? "Leaving..." : "⬇️ Leave Bus"}
                </button>
              )}

              {passenger.status === "completed" && (
                <p className="mt-2 text-sm text-gray-500 italic">
                  Trip completed ✅
                </p>
              )}
            </div>
          </Popup>
        </Marker>

        {/* BUS MARKER */}
        <Marker position={busPosition} icon={busIcon}>
          <Popup>
            <h3>🚌 Smart Ride UG</h3>
            <br />
            Speed: {bus.speed} km/h
            <br />
            Passengers: {bus.passengers}/50
            <br />
            Status: {bus.status}
          </Popup>
        </Marker>

        <FollowBus position={busPosition} />
      </MapContainer>
    </div>
  );
}