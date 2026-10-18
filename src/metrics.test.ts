import { afterEach, describe, expect, it, vi } from 'vitest'
import { track } from './metrics'

describe('metrics', () => {
  afterEach(() => {
    delete window.goatcounter
  })

  it('does nothing without the counting script', () => {
    expect(() => track('lesson/tiles')).not.toThrow()
  })

  it('counts named events once the script is there', () => {
    const count = vi.fn()
    window.goatcounter = { count }
    track('quiz/tile/right', 'Named a tile')
    expect(count).toHaveBeenCalledWith({ path: 'quiz/tile/right', title: 'Named a tile', event: true })
  })

  it('never lets a failing counter break the page', () => {
    window.goatcounter = {
      count: () => {
        throw new Error('boom')
      },
    }
    expect(() => track('lesson/sets')).not.toThrow()
  })
})
