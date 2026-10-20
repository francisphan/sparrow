import { useEffect, useState } from 'react'
import { metricsEnabled, track } from './metrics'
import Glossary from './sections/Glossary'
import Round from './sections/Round'
import Scoring from './sections/Scoring'
import Sets from './sections/Sets'
import Tiles from './sections/Tiles'

type Tab = 'tiles' | 'sets' | 'round' | 'scoring' | 'glossary'

const TABS: { id: Tab; label: string; mark: string }[] = [
  { id: 'tiles', label: 'The tiles', mark: '1' },
  { id: 'sets', label: 'Sets and a winning hand', mark: '2' },
  { id: 'round', label: 'How a round flows', mark: '3' },
  { id: 'scoring', label: 'Scoring basics', mark: '4' },
  { id: 'glossary', label: 'Glossary', mark: '字' },
]

function tabFromHash(): Tab {
  const h = window.location.hash.replace('#', '')
  return TABS.some((t) => t.id === h) ? (h as Tab) : 'tiles'
}

export default function App() {
  const [tab, setTab] = useState<Tab>(tabFromHash)

  useEffect(() => {
    const onHash = () => setTab(tabFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Which lessons get read.
  useEffect(() => {
    track(`lesson/${tab}`, TABS.find((t) => t.id === tab)?.label)
  }, [tab])

  function go(t: Tab) {
    setTab(t)
    window.history.replaceState(null, '', `#${t}`)
  }

  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to the lesson
      </a>
      <header className="masthead">
        <div>
          <h1 className="wordmark">
            Sparrow
            <span className="wordmark-cjk" lang="zh-Hant" aria-hidden="true">
              麻雀
            </span>
          </h1>
          <p className="tagline">Mahjong for people who have never seen a tile.</p>
        </div>
      </header>

      <nav className="tabs" role="tablist" aria-label="Lessons">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className="tab"
            onClick={() => go(t.id)}
          >
            <span className="tab-mark" aria-hidden="true">
              {t.mark}
            </span>
            <span className="tab-label">{t.label}</span>
          </button>
        ))}
      </nav>

      <main id="main" tabIndex={-1}>
        {tab === 'tiles' && <Tiles />}
        {tab === 'sets' && <Sets />}
        {tab === 'round' && <Round />}
        {tab === 'scoring' && <Scoring />}
        {tab === 'glossary' && <Glossary />}
      </main>

      <footer className="footer">
        <p>
          Tiles, sets and the flow of a turn are the same almost everywhere. Winning and scoring here
          follow Hong Kong (Cantonese) rules; Riichi (Japanese), Chinese Official and American mahjong
          score differently. Where tables disagree, the lesson says which reading it uses.
        </p>
        <p className="footer-credit">
          Tile faces by{' '}
          <a href="https://commons.wikimedia.org/wiki/Category:SVG_mahjong_tiles">Cangjie6, Wikimedia Commons</a>,{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>; see{' '}
          <a href="https://github.com/francisphan/sparrow/blob/main/CREDITS.md">credits</a>.{' '}
          <a href="https://github.com/francisphan/sparrow">Source on GitHub</a>. Ready to play?{' '}
          <a href="https://francisphan.github.io/pung/">Pung</a> deals a full game against three opponents.
        </p>
        {metricsEnabled() && (
          <p className="footer-credit">
            Visits and quiz answers are counted anonymously by <a href="https://www.goatcounter.com/">GoatCounter</a>,
            without cookies.
          </p>
        )}
      </footer>
    </div>
  )
}
