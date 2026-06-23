"use client";

import { useEffect, useState } from "react";

// Type definition for bus data from the backend
interface BusData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number;
  passengers: number;
  status: string;
}

export default function Dashboard() {
  const [bus, setBus] = useState<BusData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const fetchBus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bus");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data: BusData = await res.json();
      setBus(data);
      setError(false);
    } catch (err) {
      console.error("Failed to fetch bus data:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBus();

    // Set up polling every 3 seconds
    const timer = setInterval(fetchBus, 3000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  // -------- RENDER STATES --------

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4 text-white/70">Loading bus data...</p>
        </div>
      </div>
    );
  }

  if (error || !bus) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center bg-red-500/20 backdrop-blur-md rounded-2xl p-8 border border-red-500/30">
          <span className="text-5xl">⚠️</span>
          <h2 className="text-2xl font-bold text-white mt-2">Backend disconnected</h2>
          <p className="text-white/80 mt-2">
            Could not connect to the Smart Ride backend. Please check if the server is running.
          </p>
          <button
            onClick={() => {
              setLoading(true);
              setError(false);
              fetchBus();
            }}
            className="mt-4 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // -------- SUCCESSFUL DATA RENDER --------

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {/* Bus Name */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
        <h3>🚌 Bus</h3>
        <p className="text-xl font-bold truncate">{bus.name}</p>
        <p className="text-xs text-white/60 mt-1">ID: {bus.id}</p>
      </div>

      {/* Passengers */}
<div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
  <h3>👥 Passengers</h3>

  <p className="text-3xl font-bold">
    {bus.passengers} / 50
  </p>

  <p className="text-sm text-white/60 mt-1">
    Current capacity
  </p>
</div>

      {/* Speed */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
        <h3>⚡ Speed</h3>
        <p className="text-3xl font-bold">{bus.speed} km/h</p>
      </div>

      {/* Status */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
        <h3>🟢 Status</h3>
        <p className="text-xl font-bold capitalize">{bus.status}</p>
      </div>
    </div>
  );
}