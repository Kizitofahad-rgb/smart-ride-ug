"use client";

import { useState, useEffect } from "react";

interface BusData {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  speed: number;
  passengers: number;
  status: string;
}

interface Passenger {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  status: "waiting" | "onboard" | "completed";
}

interface PassengerStats {
  waiting: number;
  onboard: number;
  completed: number;
  total: number;
}

export default function OperatorDashboard() {
  const [bus, setBus] = useState<BusData | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [stats, setStats] = useState<PassengerStats>({
    waiting: 0,
    onboard: 0,
    completed: 0,
    total: 0,
  });

  // Fetch bus data
  const fetchBus = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bus");
      const data = await res.json();
      setBus(data);
    } catch (error) {
      console.error("Failed to fetch bus:", error);
    }
  };

  // Fetch passengers
  const fetchPassengers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/passengers");
      const data = await res.json();
      setPassengers(data);
      // Compute stats
      const waiting = data.filter((p: Passenger) => p.status === "waiting").length;
      const onboard = data.filter((p: Passenger) => p.status === "onboard").length;
      const completed = data.filter((p: Passenger) => p.status === "completed").length;
      setStats({
        waiting,
        onboard,
        completed,
        total: data.length,
      });
    } catch (error) {
      console.error("Failed to fetch passengers:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchBus();
    fetchPassengers();

    // Set up intervals
    const busInterval = setInterval(fetchBus, 3000);
    const passengerInterval = setInterval(fetchPassengers, 3000);

    return () => {
      clearInterval(busInterval);
      clearInterval(passengerInterval);
    };
  }, []);

  // Helper for status color
  const statusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "delayed":
        return "text-yellow-400";
      case "arrived":
        return "text-blue-400";
      default:
        return "text-gray-400";
    }
  };

  // Capacity (fixed for demo)
  const CAPACITY = 30;

  return (
    <div className="bg-black/90 backdrop-blur-xl text-white rounded-2xl p-6 border border-white/20 shadow-xl w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <span>🚍</span> Operator Dashboard
      </h2>

      {/* Top row: Fleet Status, Passengers, Speed, Trip Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Fleet Status Card */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm uppercase tracking-wider">Fleet Status</p>
          <p className="text-2xl font-semibold mt-1">
            {bus ? (
              <span className={statusColor(bus.status)}>
                {bus.status.charAt(0).toUpperCase() + bus.status.slice(1)}
              </span>
            ) : (
              "—"
            )}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Bus {bus?.id || "N/A"}</p>
        </div>

        {/* Passengers Card */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm uppercase tracking-wider">Passengers</p>
          <p className="text-2xl font-semibold mt-1">
            {bus ? `${bus.passengers} / ${CAPACITY}` : "—"}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {stats.onboard} onboard · {stats.waiting} waiting · {stats.completed} completed
          </p>
        </div>

        {/* Speed Card */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm uppercase tracking-wider">Speed</p>
          <p className="text-2xl font-semibold mt-1">
            {bus ? `${bus.speed} km/h` : "—"}
          </p>
          <p className="text-xs text-zinc-500 mt-1">Current average</p>
        </div>

        {/* Trip Status Card */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-zinc-400 text-sm uppercase tracking-wider">Trip Status</p>
          <p className="text-2xl font-semibold mt-1">
            {bus?.passengers && bus.passengers > 0 ? (
              <span className="text-green-400">On Route</span>
            ) : (
              <span className="text-yellow-400">Waiting</span>
            )}
          </p>
          <p className="text-xs text-zinc-500 mt-1">
            {bus?.passengers && bus.passengers > 0
              ? `${bus.passengers} passenger${bus.passengers > 1 ? "s" : ""} onboard`
              : "No passengers onboard"}
          </p>
        </div>
      </div>

      {/* Detailed passenger stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
          <p className="text-zinc-400 text-sm">Waiting</p>
          <p className="text-2xl font-bold text-yellow-300">{stats.waiting}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
          <p className="text-zinc-400 text-sm">Onboard</p>
          <p className="text-2xl font-bold text-green-300">{stats.onboard}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
          <p className="text-zinc-400 text-sm">Completed</p>
          <p className="text-2xl font-bold text-blue-300">{stats.completed}</p>
        </div>
      </div>

      {/* Additional bus info */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10 text-sm">
        <div className="flex flex-wrap justify-between gap-2">
          <div>
            <span className="text-zinc-400">Bus ID:</span>{" "}
            <span className="font-mono">{bus?.id || "—"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Name:</span>{" "}
            <span className="font-medium">{bus?.name || "—"}</span>
          </div>
          <div>
            <span className="text-zinc-400">Location:</span>{" "}
            {bus ? (
              <span>
                {bus.latitude.toFixed(4)}, {bus.longitude.toFixed(4)}
              </span>
            ) : (
              "—"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}