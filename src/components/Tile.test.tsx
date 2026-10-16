import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Tile from './Tile'
import { TILES, tileName } from '../data/tiles'

describe('Tile', () => {
  it('renders every face with its name as alt text', () => {
    for (const t of TILES) {
      const { unmount } = render(<Tile id={t.id} />)
      expect(screen.getByRole('img', { name: tileName(t.id) })).toBeInTheDocument()
      unmount()
    }
  })

  it('draws the Chinese numeral and 萬 on characters tiles', () => {
    const { container } = render(<Tile id="C7" />)
    const texts = [...container.querySelectorAll('text')].map((t) => t.textContent)
    expect(texts).toContain('七')
    expect(texts).toContain('萬')
  })

  it('draws nine sticks on the nine of bamboo and a bird on the one', () => {
    const nine = render(<Tile id="B9" />)
    expect(nine.container.querySelectorAll('rect.ink-fill')).toHaveLength(9)
    nine.unmount()
    const one = render(<Tile id="B1" />)
    expect(one.container.querySelectorAll('path.ink-fill').length).toBeGreaterThan(0)
  })

  it('shows corner hints only when asked', () => {
    const plain = render(<Tile id="D4" />)
    expect(plain.container.querySelector('.tile-hint')).toBeNull()
    plain.unmount()
    const hinted = render(<Tile id="D4" hint />)
    expect(hinted.container.querySelector('.tile-hint')?.textContent).toBe('4')
  })

  it('renders a face-down back', () => {
    render(<Tile id="D4" back />)
    expect(screen.getByRole('img', { name: 'Face-down tile' })).toBeInTheDocument()
  })
})
