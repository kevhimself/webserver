"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const start = (userType: "trade" | "prosumer") => {
    router.push(`/quote?type=${userType}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: "linear-gradient(160deg, #1a2e1e 0%, #2d4733 60%, #3a5c42 100%)" }}>

      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-timber-300 text-sm font-medium tracking-widest uppercase mb-3">
          Valley Mill
        </p>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-cream mb-4 leading-tight">
          Find the right timber<br />for your project
        </h1>
        <p className="text-timber-100 text-lg max-w-md mx-auto opacity-80">
          Answer a few questions and we'll put together a quote — or tell you if we need to ring round first.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-2xl">

        <button
          onClick={() => start("trade")}
          className="group relative bg-forest-800 border border-forest-600 hover:border-timber-500 rounded-2xl p-8 text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="text-3xl mb-4">🏗️</div>
          <h2 className="text-cream text-xl font-semibold mb-2 group-hover:text-timber-300 transition-colors">
            Trade buyer
          </h2>
          <p className="text-timber-100 text-sm opacity-70 leading-relaxed">
            You know your grades, sections, and volumes. Let's get straight to the spec.
          </p>
          <div className="mt-6 text-timber-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start quote <span>→</span>
          </div>
        </button>

        <button
          onClick={() => start("prosumer")}
          className="group relative bg-forest-800 border border-forest-600 hover:border-timber-500 rounded-2xl p-8 text-left transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
        >
          <div className="text-3xl mb-4">🏡</div>
          <h2 className="text-cream text-xl font-semibold mb-2 group-hover:text-timber-300 transition-colors">
            Home project
          </h2>
          <p className="text-timber-100 text-sm opacity-70 leading-relaxed">
            You know what you're building, maybe not the exact timber spec. We'll help you figure it out.
          </p>
          <div className="mt-6 text-timber-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
            Start quote <span>→</span>
          </div>
        </button>

      </div>

      {/* Footer note */}
      <p className="mt-10 text-timber-100 text-xs opacity-50 text-center">
        Prefer to call? Ring the yard directly — we're happy to talk through your project.
      </p>
    </main>
  );
}
