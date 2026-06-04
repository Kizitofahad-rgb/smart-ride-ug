export default function TrackingPage() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold">
        Live Bus Tracking
      </h1>

      <p className="mt-4 text-zinc-400">
        Real-time vehicle tracking will appear here.
      </p>

      <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
        <p>🚌 Bus 01</p>
        <p className="mt-2">Status: Online</p>
        <p className="mt-2">Location: Makerere Main Gate</p>
      </div>
    </main>
  );
}