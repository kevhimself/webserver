export default function RouteGuide({ trees, routeStops, found, onSelect }) {
  const routeTrees = routeStops.map((id) => trees.find((t) => t.id === id)).filter(Boolean);
  const allTrees = trees.filter((t) => !routeStops.includes(t.id));

  return (
    <div className="route-guide">
      <div className="route-intro">
        <h2>Guided Nature Walk</h2>
        <p>Follow these {routeStops.length} stops through the park for a wonderful introduction to the trees. Tap any stop to see full identification prompts.</p>
        <div className="route-progress">
          <div
            className="route-progress-bar"
            style={{ width: `${(routeStops.filter((id) => found.has(id)).length / routeStops.length) * 100}%` }}
          />
          <span className="route-progress-label">
            {routeStops.filter((id) => found.has(id)).length} of {routeStops.length} stops found
          </span>
        </div>
      </div>

      <div className="stop-list">
        {routeTrees.map((tree, idx) => {
          const isFound = found.has(tree.id);
          return (
            <button key={tree.id} className={`stop-card ${isFound ? "found" : ""}`} onClick={() => onSelect(tree.id)}>
              <div className="stop-number">{idx + 1}</div>
              <div className="stop-emoji">{tree.emoji}</div>
              <div className="stop-info">
                <p className="stop-name">{tree.name}</p>
                <p className="stop-latin">{tree.latin}</p>
                <p className="stop-season">Best in: {tree.season}</p>
              </div>
              {isFound && <div className="stop-found-badge">✓</div>}
            </button>
          );
        })}
      </div>

      <div className="off-route-section">
        <h3>Also in the park</h3>
        <p className="off-route-intro">These species can be found off the main route — bonus discoveries for curious walkers.</p>
        <div className="off-route-grid">
          {allTrees.map((tree) => (
            <button
              key={tree.id}
              className={`off-route-chip ${found.has(tree.id) ? "found" : ""}`}
              onClick={() => onSelect(tree.id)}
            >
              {tree.emoji} {tree.name}
              {found.has(tree.id) && " ✓"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
