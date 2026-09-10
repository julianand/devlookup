import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, it } from 'vitest'
import ThemeButton from './ThemeButton.tsx'

beforeEach(() => {
  cleanup()
  document.documentElement.removeAttribute('data-theme')
})

it('activates dark theme by default and shows the label to switch to light', () => {
  render(<ThemeButton />)

  const button = screen.getByRole('button', { name: /light/i })
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  expect(button.querySelector('svg')).not.toBeNull()
})

it('switches data-theme and label on click', async () => {
  render(<ThemeButton />)

  await userEvent.click(screen.getByRole('button', { name: /light/i }))

  expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  expect(screen.getByRole('button', { name: /dark/i })).toBeTruthy()
})
