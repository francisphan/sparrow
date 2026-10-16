import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('opens on the tiles and switches lessons', async () => {
    window.location.hash = ''
    render(<App />)
    expect(screen.getByRole('heading', { name: 'The tiles' })).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Red dragon' }).length).toBeGreaterThan(0)

    await userEvent.click(screen.getByRole('tab', { name: /Sets and a winning hand/ }))
    expect(screen.getByRole('heading', { name: 'Sets and a winning hand' })).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: /How a round flows/ }))
    expect(screen.getByText(/Step 1 of/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Next' }))
    expect(screen.getByText(/Step 2 of/)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('tab', { name: /Glossary/ }))
    expect(screen.getByRole('heading', { name: 'Glossary' })).toBeInTheDocument()
  })

  it('finds a wait and shows the sets', async () => {
    window.location.hash = '#sets'
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /^Four of dots/ }))
    expect(screen.getByText(/there is no way to make four sets/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: /^Three of dots/ }))
    expect(screen.getByText(/completes it/)).toBeInTheDocument()
    await userEvent.click(screen.getByRole('button', { name: 'Show the sets' }))
    expect(screen.getByRole('button', { name: 'Back to the rack' })).toBeInTheDocument()
  })

  it('checks a faan count', async () => {
    window.location.hash = '#scoring'
    render(<App />)
    await userEvent.click(screen.getByRole('radio', { name: /Three of everything/ }))
    await userEvent.click(screen.getByRole('checkbox', { name: /All pungs/ }))
    await userEvent.click(screen.getByRole('button', { name: 'Check my count' }))
    expect(screen.getByText(/Right: 3 faan/)).toBeInTheDocument()
  })

  it('answers the tile quiz', async () => {
    window.location.hash = '#tiles'
    render(<App />)
    const group = screen.getByRole('group', { name: 'Which tile is this?' })
    const options = group.querySelectorAll('button')
    expect(options).toHaveLength(4)
    await userEvent.click(options[0])
    expect(screen.getByText(/Right\.|Not quite/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Next tile' })).toBeEnabled()
  })
})
