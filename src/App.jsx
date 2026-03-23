import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import useValleyData from './data/useValleyData'
import StatRow from './components/StatRow'
import GoalCards from './components/GoalCards'
import ReachGrid from './components/ReachGrid'
import MoneyCards from './components/MoneyCards'
import TeamView from './components/TeamView'

/* ── Auth Gate ─────────────────────────────────────────────── */
function AuthGate({ onAuth }) {
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)
  const [fading, setFading] = useState(false)

  const attempt = () => {
    if (pass === import.meta.env.VITE_PASS) {
      sessionStorage.setItem('vsauth', '1')
      setFading(true)
      setTimeout(onAuth, 500)
    } else {
      setError(true)
      setPass('')
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-8"
      style={{
        background: 'var(--bg)',
        transition: 'opacity 0.5s',
        opacity: fading ? 0 : 1,
      }}
    >
      {/* Wordmark */}
      <div className="mb-10 text-center rise-0">
        <div
          className="text-4xl mb-1"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          Valley Sawmill
        </div>
        <div className="gold-rule w-48 mx-auto mt-3" />
        <div className="text-xs mt-3" style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}>
          HERRIARD SAWMILLS · FROME
        </div>
      </div>

      {/* Input */}
      <div className="w-full max-w-xs rise-1">
        <input
          type="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          placeholder="Enter passphrase"
          autoComplete="current-password"
          className="w-full px-4 py-4 rounded-xl text-center text-lg outline-none"
          style={{
            background: 'var(--card)',
            border: `1px solid ${error ? 'var(--red)' : 'var(--border-hi)'}`,
            color: 'var(--text)',
            fontFamily: '"DM Sans", sans-serif',
            transition: 'border-color 0.2s',
          }}
          aria-label="Passphrase"
        />
        {error && (
          <p className="text-center mt-3 text-sm" style={{ color: 'var(--red)', fontFamily: '"DM Sans", sans-serif' }}>
            That's not right — try again.
          </p>
        )}
        <button
          onClick={attempt}
          className="w-full mt-4 py-4 rounded-xl text-base font-medium"
          style={{
            background: 'var(--amber)',
            color: '#141210',
            fontFamily: '"DM Sans", sans-serif',
            minHeight: '44px',
          }}
          aria-label="Unlock dashboard"
        >
          Unlock
        </button>
      </div>
    </div>
  )
}

/* ── Nav tabs ────────────────────────────────────────────────── */
const TABS = [
  { to: '/',      emoji: '🏡', label: 'Home'  },
  { to: '/reach', emoji: '📡', label: 'Reach' },
  { to: '/money', emoji: '💷', label: 'Money' },
  { to: '/team',  emoji: '🌱', label: 'Team'  },
]

function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 flex justify-around items-end"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        zIndex: 100,
      }}
      aria-label="Main navigation"
    >
      {TABS.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.to === '/'}
          className="flex flex-col items-center py-3 px-4 flex-1"
          style={({ isActive }) => ({
            color: isActive ? 'var(--amber)' : 'var(--text-muted)',
            textDecoration: 'none',
            minHeight: '44px',
          })}
          aria-label={tab.label}
        >
          {({ isActive }) => (
            <>
              <span className="text-2xl leading-none">{tab.emoji}</span>
              <span
                className="text-xs mt-1"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--amber)' : 'var(--text-muted)',
                }}
              >
                {tab.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

/* ── Page wrapper ────────────────────────────────────────────── */
function PageShell({ children }) {
  return (
    <div
      className="scroll-content"
      style={{
        paddingTop: '0',
        paddingBottom: 'calc(72px + env(safe-area-inset-bottom))',
        minHeight: '100dvh',
        background: 'var(--bg)',
      }}
    >
      <div className="max-w-[480px] mx-auto px-4 pt-6">
        {children}
      </div>
    </div>
  )
}

/* ── Pages ────────────────────────────────────────────────────── */
function HomePage({ data }) {
  return (
    <PageShell>
      {/* Header */}
      <div className="mb-6 rise-0">
        <h1
          className="text-3xl"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          Valley Sawmill
        </h1>
        <div className="gold-rule mt-3 mb-1" />
      </div>

      {/* This Week */}
      <section className="mb-8">
        <h2
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}
        >
          This Week
        </h2>
        <StatRow stats={data.week} />
      </section>

      {/* Goals */}
      <section className="mb-8">
        <h2
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif', letterSpacing: '0.12em' }}
        >
          Our Four Goals
        </h2>
        <GoalCards goals={data.goals} />
      </section>

      {/* Updated note */}
      <p
        className="text-center text-xs pb-2"
        style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
      >
        Updated {data.updated}
      </p>
    </PageShell>
  )
}

function ReachPage({ data }) {
  return (
    <PageShell>
      <div className="mb-6 rise-0">
        <h1
          className="text-3xl"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          How many people know us
        </h1>
        <div className="gold-rule mt-3" />
      </div>
      <ReachGrid channels={data.reach} />
      <p
        className="text-center text-xs pb-2 mt-4"
        style={{ color: 'var(--text-muted)', fontFamily: '"DM Sans", sans-serif' }}
      >
        Updated {data.updated}
      </p>
    </PageShell>
  )
}

function MoneyPage({ data }) {
  return (
    <PageShell>
      <div className="mb-6 rise-0">
        <h1
          className="text-3xl"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          Money in the business
        </h1>
        <div className="gold-rule mt-3" />
      </div>
      <MoneyCards cards={data.money} />
    </PageShell>
  )
}

function TeamPage({ data }) {
  return (
    <PageShell>
      <div className="mb-6 rise-0">
        <h1
          className="text-3xl"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text)' }}
        >
          Team
        </h1>
        <div className="gold-rule mt-3" />
      </div>
      <TeamView tasks={data.tasks} />
    </PageShell>
  )
}

/* ── Loading / Error ─────────────────────────────────────────── */
function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div
        className="text-4xl"
        style={{ fontFamily: '"Playfair Display", serif', color: 'var(--text-muted)' }}
      >
        🪵
      </div>
    </div>
  )
}

/* ── App shell ────────────────────────────────────────────────── */
function AppShell() {
  const { data, loading, error } = useValleyData()

  if (loading) return <LoadingScreen />
  if (error || !data) return (
    <div className="fixed inset-0 flex items-center justify-center px-8" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--red)', fontFamily: '"DM Sans", sans-serif', textAlign: 'center' }}>
        Couldn't load dashboard data. Please try again.
      </p>
    </div>
  )

  return (
    <>
      <Routes>
        <Route path="/"      element={<HomePage  data={data} />} />
        <Route path="/reach" element={<ReachPage data={data} />} />
        <Route path="/money" element={<MoneyPage data={data} />} />
        <Route path="/team"  element={<TeamPage  data={data} />} />
      </Routes>
      <BottomNav />
    </>
  )
}

/* ── Root ─────────────────────────────────────────────────────── */
export default function App() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('vsauth') === '1')
  const [visible, setVisible] = useState(authed)

  const handleAuth = () => {
    setAuthed(true)
    setVisible(true)
  }

  if (!authed) return <AuthGate onAuth={handleAuth} />

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.4s' }}>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </div>
  )
}
