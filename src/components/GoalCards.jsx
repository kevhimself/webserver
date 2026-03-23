import { useState, useEffect } from 'react'

const MOODS = [
  { emoji: '😄', label: 'Great' },
  { emoji: '🙂', label: 'Good'  },
  { emoji: '😐', label: 'Ok'    },
  { emoji: '😔', label: 'Tough day' },
]

function getRag(current, target, thresholds) {
  if (!target) return 'on-track'
  const ratio = current / target
  if (ratio >= thresholds[1]) return 'on-track'
  if (ratio >= thresholds[0]) return 'building'
  return 'needs-focus'
}

const RAG_CONFIG = {
  'on-track':    { label: 'On track',    color: 'var(--green)', bg: 'rgba(122,173,102,0.12)' },
  'building':    { label: 'Building',    color: 'var(--amber)', bg: 'rgba(196,136,45,0.12)'  },
  'needs-focus': { label: 'Needs focus', color: 'var(--red)',   bg: 'rgba(192,96,74,0.12)'   },
}

function MoodSelector({ compact = false }) {
  const [mood, setMood] = useState(() => localStorage.getItem('vsMood') || null)

  useEffect(() => {
    const onStorage = () => setMood(localStorage.getItem('vsMood'))
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const pick = (emoji) => {
    localStorage.setItem('vsMood', emoji)
    setMood(emoji)
    window.dispatchEvent(new Event('storage'))
  }

  return (
    <div className={`flex gap-2 ${compact ? 'mt-3' : 'mt-4'}`}>
      {MOODS.map(m => {
        const selected = mood === m.emoji
        return (
          <button
            key={m.emoji}
            onClick={() => pick(m.emoji)}
            className="flex-1 flex flex-col items-center py-2 rounded-xl"
            style={{
              background: selected ? 'rgba(196,136,45,0.15)' : 'rgba(245,239,227,0.04)',
              border: selected ? '1px solid var(--amber)' : '1px solid var(--border)',
              minHeight: '44px',
              cursor: 'pointer',
              transition: 'background 0.15s, border-color 0.15s',
            }}
            aria-label={`Mood: ${m.label}`}
            aria-pressed={selected}
          >
            <span className={compact ? 'text-xl' : 'text-2xl'}>{m.emoji}</span>
            {!compact && (
              <span
                className="text-xs mt-1"
                style={{
                  color: selected ? 'var(--amber)' : 'var(--text-muted)',
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {m.label}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export { MoodSelector }

export default function GoalCards({ goals }) {
  return (
    <div className="flex flex-col gap-4">
      {goals.map((g, i) => {
        const isMood = !!g.mood
        const rag = isMood ? null : getRag(g.current, g.target, g.thresholds)
        const ragCfg = rag ? RAG_CONFIG[rag] : null
        const pct = (!isMood && g.target) ? Math.min(g.current / g.target, 1) : 0

        return (
          <div
            key={i}
            className={`rounded-xl p-4 rise-${Math.min(i + 1, 5)}`}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderBottom: isMood
                ? '2px solid var(--green)'
                : `2px solid ${ragCfg?.color}`,
            }}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <span className="text-2xl flex-shrink-0">{g.icon}</span>
                <div className="min-w-0">
                  <div
                    className="font-semibold text-base leading-snug"
                    style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
                  >
                    {g.name}
                  </div>
                  <div
                    className="text-xs mt-0.5 leading-snug"
                    style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {g.tag}
                  </div>
                </div>
              </div>

              {/* RAG badge */}
              {ragCfg && (
                <span
                  className="text-xs px-2 py-1 rounded-lg flex-shrink-0 font-semibold"
                  style={{
                    background: ragCfg.bg,
                    color: ragCfg.color,
                    fontFamily: '"DM Sans", sans-serif',
                    border: `1px solid ${ragCfg.color}33`,
                  }}
                >
                  {ragCfg.label}
                </span>
              )}

              {/* Mood target label */}
              {isMood && (
                <span
                  className="text-xs px-2 py-1 rounded-lg flex-shrink-0 font-semibold"
                  style={{
                    background: 'rgba(122,173,102,0.12)',
                    color: 'var(--green)',
                    fontFamily: '"DM Sans", sans-serif',
                    border: '1px solid rgba(122,173,102,0.3)',
                  }}
                >
                  {g.targetLabel}
                </span>
              )}
            </div>

            {/* Progress bar */}
            {!isMood && (
              <>
                <div
                  className="mt-4 rounded-full overflow-hidden"
                  style={{ height: '6px', background: 'rgba(245,239,227,0.07)' }}
                  role="progressbar"
                  aria-valuenow={Math.round(pct * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${pct * 100}%`,
                      background: ragCfg?.color,
                      transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
                      minWidth: pct > 0 ? '4px' : '0',
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {g.display}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {g.targetLabel}
                  </span>
                </div>
              </>
            )}

            {/* Mood selector */}
            {isMood && <MoodSelector compact />}
          </div>
        )
      })}
    </div>
  )
}
