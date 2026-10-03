import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { octocatUser, responseWith } from './test/github-user.fixture.ts'
import App from './App.tsx'

beforeEach(() => {
  cleanup()
})

afterEach(() => {
  vi.unstubAllGlobals()
})

it('renders the app shell and loads the default octocat profile on mount', async () => {
  const fetchMock = vi.fn().mockResolvedValue(responseWith(octocatUser))
  vi.stubGlobal('fetch', fetchMock)

  render(<App />)

  expect(screen.getByRole('heading', { name: 'devlookup' })).toBeTruthy()
  expect(screen.getByRole('search')).toBeTruthy()

  expect(fetchMock).toHaveBeenCalledWith(
    'https://api.github.com/users/octocat',
    expect.anything(),
  )

  await waitFor(() => expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeTruthy())
  expect(screen.getByText('@octocat')).toBeTruthy()
  expect(screen.getByText('3938')).toBeTruthy()
  expect(screen.getByText('learned to code by watching the octocat')).toBeTruthy()

  await waitFor(() =>
    expect(screen.getByRole<HTMLButtonElement>('button', { name: 'Search' }).disabled).toBe(false),
  )
})
