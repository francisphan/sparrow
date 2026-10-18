/**
 * Anonymous usage counts through GoatCounter (goatcounter.com): page views
 * and a few named events, with no cookies and nothing personal. Off unless
 * VITE_GOATCOUNTER names a site, such as https://sparrow.goatcounter.com,
 * and GoatCounter's own script skips localhost by itself.
 *
 * Events, as paths in the GoatCounter dashboard:
 *   lesson/tiles         a lesson opened (tiles, sets, round, scoring, glossary)
 *   quiz/tile/right      an answer in "Name that tile"
 *   quiz/tile/wrong
 *   quiz/wait/right      a tile tried in "Find the wait"
 *   quiz/wait/wrong
 *   quiz/score/right     a faan count checked, right or not
 *   quiz/score/wrong
 */
const SITE = (import.meta.env.VITE_GOATCOUNTER as string | undefined)?.replace(/\/+$/, '')

interface GoatCounter {
  count(vars: { path: string; title?: string; event?: boolean }): void
}
declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

export function metricsEnabled(): boolean {
  return !!SITE
}

/** Add the counting script once. Call at start-up. */
export function installMetrics(): void {
  if (!SITE || typeof document === 'undefined' || document.querySelector('script[data-goatcounter]')) return
  const s = document.createElement('script')
  s.async = true
  s.src = 'https://gc.zgo.at/count.js'
  s.dataset.goatcounter = `${SITE}/count`
  document.head.appendChild(s)
}

/** Count a named event. Silent when metrics are off or the script has not loaded yet. */
export function track(path: string, title?: string): void {
  try {
    window.goatcounter?.count({ path, title, event: true })
  } catch {
    /* counting must never get in the way of the lesson */
  }
}
