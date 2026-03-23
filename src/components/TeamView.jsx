import { MoodSelector } from './GoalCards'

export default function TeamView({ tasks }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Mood section */}
      <div
        className="rounded-xl p-5 rise-0"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderBottom: '2px solid var(--green)',
        }}
      >
        <h2
          className="text-base font-semibold mb-1"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          How's the team today?
        </h2>
        <p
          className="text-xs"
          style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
        >
          Tap to record how things feel right now
        </p>
        <MoodSelector />
      </div>

      {/* Checklist section */}
      <div
        className="rounded-xl p-5 rise-1"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderBottom: '2px solid var(--amber)',
        }}
      >
        <h2
          className="text-base font-semibold mb-4"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          Site Readiness
        </h2>
        <div className="flex flex-col gap-3">
          {tasks.map((t, i) => (
            <div
              key={i}
              className="flex items-start gap-3"
              style={{ minHeight: '44px', alignItems: 'center' }}
            >
              <span className="text-xl flex-shrink-0" aria-hidden="true">
                {t.done ? '✅' : '⬜'}
              </span>
              <span
                className="text-sm flex-1"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  color: t.done ? 'var(--text-muted)' : 'var(--text)',
                  textDecoration: t.done ? 'line-through' : 'none',
                  opacity: t.done ? 0.6 : 1,
                }}
              >
                {t.lbl}
              </span>
              <span className="sr-only">{t.done ? 'Complete' : 'Not done'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
