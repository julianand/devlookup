import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { type Mock, beforeEach, expect, it, vi } from 'vitest'
import SearchBar from './SearchBar.tsx'

let onSubmit: Mock<(value: string) => void>
let onInput: Mock<(value: string) => void>

beforeEach(() => {
  cleanup()
  onSubmit = vi.fn()
  onInput = vi.fn()
})

function renderSearchBar(props = {}) {
  render(<SearchBar onSubmit={onSubmit} onInput={onInput} {...props} />)
  return screen.getByRole<HTMLInputElement>('textbox', { name: 'Search GitHub username' })
}

it('renders the search form with input and submit button', () => {
  renderSearchBar()

  expect(screen.getByRole('search')).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Search' })).toBeTruthy()
})

it('emits the input changes as the user types', async () => {
  const input = renderSearchBar()

  await userEvent.type(input, 'oct')

  expect(onInput).toHaveBeenCalledTimes(3)
  expect(onInput).toHaveBeenNthCalledWith(1, 'o')
  expect(onInput).toHaveBeenNthCalledWith(2, 'oc')
  expect(onInput).toHaveBeenNthCalledWith(3, 'oct')
})

it('submits the typed value once', async () => {
  const input = renderSearchBar()
  await userEvent.type(input, 'octocat')

  await userEvent.click(screen.getByRole('button', { name: 'Search' }))

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith('octocat')
})

it('trims surrounding whitespace from the submitted value', async () => {
  const input = renderSearchBar()
  await userEvent.type(input, '  octocat  ')

  await userEvent.click(screen.getByRole('button', { name: 'Search' }))

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith('octocat')
})

it('ignores an empty submit', async () => {
  renderSearchBar()

  await userEvent.click(screen.getByRole('button', { name: 'Search' }))

  expect(onSubmit).not.toHaveBeenCalled()
})

it('ignores a whitespace-only submit', async () => {
  const input = renderSearchBar()
  await userEvent.type(input, '   ')

  await userEvent.click(screen.getByRole('button', { name: 'Search' }))

  expect(onSubmit).not.toHaveBeenCalled()
})

it('shows the No results message and disables the button while searchError', () => {
  const input = renderSearchBar({ searchError: true })
  const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Search' })

  expect(screen.getByText('No results')).toBeTruthy()
  expect(button.disabled).toBe(true)
  expect(button.className).toContain('disabled')
  expect(input.disabled).toBe(false)
})

it('disables the button while loading', () => {
  renderSearchBar({ loading: true })

  const button = screen.getByRole<HTMLButtonElement>('button', { name: 'Search' })
  expect(button.disabled).toBe(true)
  expect(button.className).toContain('disabled')
  expect(screen.queryByText('No results')).toBeNull()
})
