import { useState } from "react";
import ParkMap from "./components/ParkMap.jsx";
import DiscoveryPanel from "./components/DiscoveryPanel.jsx";
import RouteGuide from "./components/RouteGuide.jsx";
import { trees, ROUTE_STOPS } from "./data/trees.js";

export default function App() {
  const [selected, setSelected] = useState(null);
  const [found, setFound] = useState(new Set());
  const [view, setView] = useState("map"); // "map" | "route"

  const selectedTree = trees.find((t) => t.id === selected);

  function markFound(id) {
    setFound((prev) => new Set([...prev, id]));
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-inner">
          <div className="header-title">
            <span className="header-leaf">🌿</span>
            <div>
              <h1>Phillips Memorial Park</h1>
              <p>Nature Discovery Walk</p>
            </div>
          </div>
          <div className="header-stats">
            <span className="stat-badge">
              {found.size} / {trees.length} discovered
            </span>
          </div>
        </div>
        <nav className="tab-nav">
          <button
            className={`tab-btn ${view === "map" ? "active" : ""}`}
            onClick={() => setView("map")}
          >
            🗺 Map
          </button>
          <button
            className={`tab-btn ${view === "route" ? "active" : ""}`}
            onClick={() => setView("route")}
          >
            🥾 Guided Walk
          </button>
        </nav>
      </header>

      <main className="app-main">
        {view === "map" ? (
          <ParkMap
            trees={trees}
            selected={selected}
            found={found}
            routeStops={ROUTE_STOPS}
            onSelect={setSelected}
          />
        ) : (
          <RouteGuide
            trees={trees}
            routeStops={ROUTE_STOPS}
            found={found}
            onSelect={(id) => { setSelected(id); setView("map"); }}
          />
        )}
      </main>

      {selectedTree && (
        <DiscoveryPanel
          tree={selectedTree}
          found={found}
          routeStops={ROUTE_STOPS}
          onMarkFound={markFound}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
