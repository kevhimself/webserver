const DIR_CONFIG = {
  up:   { color: 'var(--green)', bg: 'rgba(122,173,102,0.12)' },
  flat: { color: 'var(--text-muted)', bg: 'rgba(110,102,96,0.12)' },
  down: { color: 'var(--red)',   bg: 'rgba(192,96,74,0.12)'   },
}

export default function ReachGrid({ channels }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {channels.map((c, i) => {
        const dir = DIR_CONFIG[c.dir] || DIR_CONFIG.flat
        return (
          <div
            key={i}
            className={`rounded-xl p-4 flex flex-col rise-${Math.min(i, 5)}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderBottom: '2px solid var(--amber)',
            }}
          >
            {/* Platform header */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">{c.icon}</span>
              <span
                className="text-xs font-semibold"
                style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.05em' }}
              >
                {c.plat}
              </span>
            </div>

            {/* Big number */}
            <div
              className="text-2xl font-bold leading-none"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
            >
              {c.num}
            </div>
            <div
              className="text-xs mt-1"
              style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
            >
              {c.lbl}
            </div>

            {/* Sub note */}
            <div
              className="text-xs mt-2"
              style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif', opacity: 0.8 }}
            >
              {c.sub}
            </div>

            {/* Trend badge */}
            <div className="mt-3">
              <span
                className="text-xs px-2 py-1 rounded-lg font-medium"
                style={{
                  background: dir.bg,
                  color: dir.color,
                  fontFamily: '"DM Sans", sans-serif',
                }}
              >
                {c.badge}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
