"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold">
          Smart Ride UG
        </h1>

        <p className="mt-3 text-zinc-400">
          Real-time Public Transport Tracking
        </p>

        <div className="grid md:grid-cols-4 gap-4 mt-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-zinc-400 text-sm">Route</p>
            <h3 className="text-lg font-semibold">
              Makerere → Ntinda
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-zinc-400 text-sm">Distance</p>
            <h3 className="text-lg font-semibold">
              8.2 km
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-zinc-400 text-sm">Active Buses</p>
            <h3 className="text-lg font-semibold">
              3
            </h3>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-zinc-400 text-sm">Status</p>
            <h3 className="text-lg font-semibold text-green-400">
              Operational
            </h3>
          </div>
        </div>

        <div
          className="
            mt-8
            rounded-3xl
            overflow-hidden
            border border-white/10
            bg-white/5
            backdrop-blur-md
            shadow-2xl
          "
        >
          <Map />
        </div>
      </div>
    </main>
  );
}