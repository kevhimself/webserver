import { useState } from "react";

export default function DiscoveryPanel({ tree, found, routeStops, onMarkFound, onClose }) {
  const [promptIdx, setPromptIdx] = useState(0);
  const isFound = found.has(tree.id);
  const routeIdx = routeStops.indexOf(tree.id);

  return (
    <div className="panel-backdrop" onClick={onClose}>
      <div className="discovery-panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="panel-header">
          <div className="panel-emoji">{tree.emoji}</div>
          <div>
            <h2 className="panel-name">{tree.name}</h2>
            <p className="panel-latin">{tree.latin}</p>
            {routeIdx !== -1 && (
              <span className="route-badge">Stop {routeIdx + 1} on guided walk</span>
            )}
          </div>
        </div>

        {/* Photo slot */}
        <div className="photo-slot">
          {tree.photo ? (
            <img src={tree.photo} alt={tree.name} className="tree-photo" />
          ) : (
            <div className="photo-placeholder">
              <span className="photo-placeholder-emoji">{tree.emoji}</span>
              <p>Photo coming soon</p>
              <p className="photo-hint">Real park photos will appear here</p>
            </div>
          )}
        </div>

        {/* Identification prompts — conversational carousel */}
        <div className="prompt-section">
          <div className="prompt-label">
            <span className="prompt-icon">🔍</span>
            <span>Look & find</span>
            <span className="prompt-counter">{promptIdx + 1} / {tree.prompts.length}</span>
          </div>
          <div className="prompt-card">
            <p className="prompt-text">{tree.prompts[promptIdx]}</p>
          </div>
          <div className="prompt-nav">
            <button
              className="prompt-btn"
              onClick={() => setPromptIdx((i) => Math.max(0, i - 1))}
              disabled={promptIdx === 0}
            >
              ← Prev
            </button>
            <div className="prompt-dots">
              {tree.prompts.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === promptIdx ? "active" : ""}`}
                  onClick={() => setPromptIdx(i)}
                  aria-label={`Prompt ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="prompt-btn"
              onClick={() => setPromptIdx((i) => Math.min(tree.prompts.length - 1, i + 1))}
              disabled={promptIdx === tree.prompts.length - 1}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Nature fact */}
        <div className="fact-section">
          <p className="fact-label">📖 Did you know?</p>
          <p className="fact-text">{tree.facts}</p>
        </div>

        {/* Wildlife */}
        <div className="wildlife-section">
          <p className="fact-label">🐦 Wildlife connection</p>
          <p className="fact-text">{tree.wildlife}</p>
        </div>

        {/* Found button */}
        <button
          className={`found-btn ${isFound ? "found" : ""}`}
          onClick={() => onMarkFound(tree.id)}
          disabled={isFound}
        >
          {isFound ? "✓ Discovered!" : "🎉 I found it!"}
        </button>
      </div>
    </div>
  );
}
