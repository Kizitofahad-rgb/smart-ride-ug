export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold md:text-7xl">
          Smart Ride UG
        </h1>

        <p className="mt-6 text-xl text-zinc-300 md:text-2xl">
          Know where your ride is.
        </p>

        <p className="mt-4 max-w-2xl text-zinc-400">
          Helping Kampala passengers track public transport in real time.
        </p>

        <button className="mt-10 rounded-full bg-green-600 px-8 py-4 font-semibold transition hover:bg-green-500">
          Track Live Bus
        </button>
      </section>
      <section className="bg-zinc-950 px-6 py-20">
  <div className="mx-auto max-w-6xl">
    <h2 className="mb-12 text-center text-3xl font-bold">
      Why Smart Ride UG?
    </h2>

    <div className="grid gap-6 md:grid-cols-3">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="text-4xl">🚌</div>
        <h3 className="mt-4 text-xl font-semibold">
          Live Tracking
        </h3>
        <p className="mt-2 text-zinc-400">
          Track buses in real time and know exactly where they are.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="text-4xl">📍</div>
        <h3 className="mt-4 text-xl font-semibold">
          Route Information
        </h3>
        <p className="mt-2 text-zinc-400">
          View stops, routes, and estimated arrival times.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="text-4xl">⚡</div>
        <h3 className="mt-4 text-xl font-semibold">
          Smart Mobility
        </h3>
        <p className="mt-2 text-zinc-400">
          Building a smarter transport ecosystem for Uganda.
        </p>
      </div>
    </div>
  </div>
</section>
    </main>
  );
}
