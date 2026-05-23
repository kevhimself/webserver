export default function ParkMap({ trees, selected, found, routeStops, onSelect }) {
  return (
    <div className="map-container">
      <svg
        viewBox="0 0 100 80"
        className="park-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Park ground */}
        <rect x="0" y="0" width="100" height="80" fill="#e8f5e9" />

        {/* River/stream at top */}
        <path
          d="M0,18 Q10,15 20,17 Q35,19 50,16 Q65,13 80,15 Q90,16 100,14"
          fill="none"
          stroke="#90caf9"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M0,20 Q10,17 20,19 Q35,21 50,18 Q65,15 80,17 Q90,18 100,16"
          fill="none"
          stroke="#bbdefb"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Pond */}
        <ellipse cx="56" cy="27" rx="5" ry="3" fill="#90caf9" opacity="0.8" />
        <text x="56" y="27.8" textAnchor="middle" fontSize="1.8" fill="#1565c0">pond</text>

        {/* Bowling Green */}
        <rect x="22" y="22" width="16" height="12" rx="1" fill="#a5d6a7" stroke="#66bb6a" strokeWidth="0.5" />
        <text x="30" y="29" textAnchor="middle" fontSize="2" fill="#2e7d32">Bowling</text>
        <text x="30" y="31.5" textAnchor="middle" fontSize="2" fill="#2e7d32">Green</text>

        {/* Playing Field */}
        <rect x="55" y="35" width="18" height="14" rx="1" fill="#c8e6c9" stroke="#81c784" strokeWidth="0.5" />
        <text x="64" y="43" textAnchor="middle" fontSize="2" fill="#388e3c">Playing</text>
        <text x="64" y="45.5" textAnchor="middle" fontSize="2" fill="#388e3c">Field</text>

        {/* Allotments */}
        <rect x="18" y="36" width="16" height="12" rx="1" fill="#dcedc8" stroke="#aed581" strokeWidth="0.5" />
        <text x="26" y="43" textAnchor="middle" fontSize="1.8" fill="#558b2f">Allotment</text>
        <text x="26" y="45.5" textAnchor="middle" fontSize="1.8" fill="#558b2f">Gardens</text>

        {/* Car Park */}
        <rect x="52" y="50" width="10" height="7" rx="0.5" fill="#e0e0e0" stroke="#bdbdbd" strokeWidth="0.4" />
        <text x="57" y="54.5" textAnchor="middle" fontSize="1.8" fill="#757575">Car Park</text>

        {/* Skate Park */}
        <rect x="63" y="55" width="8" height="5" rx="0.5" fill="#f5f5f5" stroke="#e0e0e0" strokeWidth="0.4" />
        <text x="67" y="58.5" textAnchor="middle" fontSize="1.6" fill="#9e9e9e">Skate</text>

        {/* Path / road */}
        <path
          d="M30,70 L35,60 L40,55 L52,52 L63,52 L73,50 L82,50"
          fill="none"
          stroke="#d7ccc8"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5,45 L18,43 L26,36 L30,28"
          fill="none"
          stroke="#d7ccc8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Guided route line */}
        {routeStops.slice(0, -1).map((id, i) => {
          const from = trees.find((t) => t.id === id);
          const to = trees.find((t) => t.id === routeStops[i + 1]);
          if (!from || !to) return null;
          return (
            <line
              key={id}
              x1={from.position.x}
              y1={from.position.y}
              x2={to.position.x}
              y2={to.position.y}
              stroke="#ff8f00"
              strokeWidth="0.6"
              strokeDasharray="1.2,0.8"
              opacity="0.6"
            />
          );
        })}

        {/* Tree markers */}
        {trees.map((tree) => {
          const isSelected = selected === tree.id;
          const isFound = found.has(tree.id);
          const routeIdx = routeStops.indexOf(tree.id);
          const isRoute = routeIdx !== -1;
          const { x, y } = tree.position;

          return (
            <g
              key={tree.id}
              onClick={() => onSelect(tree.id)}
              style={{ cursor: "pointer" }}
              className="tree-marker-group"
            >
              {/* Pulse ring for selected */}
              {isSelected && (
                <circle cx={x} cy={y} r="5" fill="none" stroke="#2e7d32" strokeWidth="0.8" opacity="0.5" className="pulse-ring" />
              )}

              {/* Main circle */}
              <circle
                cx={x}
                cy={y}
                r={isRoute ? 3.2 : 2.6}
                fill={isFound ? "#81c784" : isSelected ? "#2e7d32" : isRoute ? "#fff8e1" : "white"}
                stroke={isSelected ? "#1b5e20" : isRoute ? "#ff8f00" : "#4caf50"}
                strokeWidth={isSelected ? "0.9" : isRoute ? "0.8" : "0.6"}
              />

              {/* Emoji */}
              <text
                x={x}
                y={y + 1.2}
                textAnchor="middle"
                fontSize={isRoute ? "2.6" : "2.2"}
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {isFound ? "✓" : tree.emoji}
              </text>

              {/* Route number badge */}
              {isRoute && (
                <>
                  <circle cx={x + 2.4} cy={y - 2.4} r="1.4" fill="#ff8f00" />
                  <text
                    x={x + 2.4}
                    y={y - 1.7}
                    textAnchor="middle"
                    fontSize="1.6"
                    fill="white"
                    fontWeight="bold"
                    style={{ pointerEvents: "none" }}
                  >
                    {routeIdx + 1}
                  </text>
                </>
              )}

              {/* Name label on hover/selected */}
              {isSelected && (
                <g>
                  <rect
                    x={x - 10}
                    y={y - 8}
                    width="20"
                    height="4.5"
                    rx="1"
                    fill="#1b5e20"
                    opacity="0.92"
                  />
                  <text
                    x={x}
                    y={y - 4.8}
                    textAnchor="middle"
                    fontSize="2.2"
                    fill="white"
                    fontWeight="600"
                    style={{ pointerEvents: "none" }}
                  >
                    {tree.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div className="map-legend">
        <span className="legend-item">
          <span className="legend-dot route" />
          Guided route stop
        </span>
        <span className="legend-item">
          <span className="legend-dot found" />
          Discovered
        </span>
        <span className="legend-item">
          <span className="legend-dot plain" />
          Tap to explore
        </span>
      </div>
    </div>
  );
}
