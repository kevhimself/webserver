const COL_MAP = {
  amber: { border: 'card-border-amber', dot: 'var(--amber)' },
  green: { border: 'card-border-green', dot: 'var(--green)' },
  blue:  { border: 'card-border-blue',  dot: '#5B8DB8'      },
  red:   { border: 'card-border-red',   dot: 'var(--red)'   },
}

export default function StatRow({ stats }) {
  return (
    <div className="flex gap-3">
      {stats.map((s, i) => {
        const col = COL_MAP[s.col] || COL_MAP.amber
        return (
          <div
            key={i}
            className={`flex-1 rounded-xl p-3 ${col.border} rise-${i}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderBottom: `2px solid ${col.dot}`,
            }}
          >
            <div className="text-xl mb-1">{s.icon}</div>
            <div
              className="text-xl font-bold leading-tight"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
            >
              {s.val}
            </div>
            <div
              className="text-xs mt-1 leading-snug whitespace-pre-line"
              style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
            >
              {s.lbl}
            </div>
            <div
              className="text-xs mt-2 leading-snug"
              style={{ color: col.dot, fontFamily: '"DM Sans", sans-serif', fontWeight: 500 }}
            >
              {s.tgt}
            </div>
          </div>
        )
      })}
    </div>
  )
}
