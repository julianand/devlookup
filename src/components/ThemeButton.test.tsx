import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import ThemeButton from './ThemeButton.tsx'

beforeEach(() => {
  cleanup()
  document.documentElement.removeAttribute('data-theme')
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function stubSystemPrefersDark(prefersDark: boolean) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn().mockImplementation((query: string) => ({
      media: query,
      matches: prefersDark,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  )
}

it('defaults to dark when the system prefers dark and toggles to light', async () => {
  stubSystemPrefersDark(true)
  render(<ThemeButton />)

  const button = screen.getByRole('button', { name: /light/i })
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  expect(button.querySelector('svg')).not.toBeNull()

  await userEvent.click(button)
  expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  expect(document.activeElement).toBe(document.body)
  expect(screen.getByRole('button', { name: /dark/i })).toBeTruthy()
})

it('defaults to light when the system prefers light and toggles to dark', async () => {
  stubSystemPrefersDark(false)
  render(<ThemeButton />)

  const button = screen.getByRole('button', { name: /dark/i })
  expect(document.documentElement.getAttribute('data-theme')).toBe('light')

  await userEvent.click(button)
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
  expect(document.activeElement).toBe(document.body)
  expect(screen.getByRole('button', { name: /light/i })).toBeTruthy()
})
