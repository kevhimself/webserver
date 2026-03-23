const DOT_COLOR = {
  green: 'var(--green)',
  amber: 'var(--amber)',
  red:   'var(--red)',
}

export default function MoneyCards({ cards }) {
  return (
    <div className="flex flex-col gap-4">
      {cards.map((c, i) => {
        const dotColor = DOT_COLOR[c.dot] || DOT_COLOR.amber
        return (
          <div
            key={i}
            className={`rounded-xl p-5 rise-${Math.min(i, 5)}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderBottom: `2px solid ${dotColor}`,
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {c.lbl}
                  </span>
                </div>
                <div
                  className="text-4xl font-bold"
                  style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
                >
                  {c.val}
                </div>
                <div
                  className="text-sm mt-2"
                  style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
                >
                  {c.sub}
                </div>
              </div>

              {/* Health dot */}
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                style={{ background: dotColor, boxShadow: `0 0 8px ${dotColor}66` }}
                aria-label={`Status: ${c.dot}`}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
