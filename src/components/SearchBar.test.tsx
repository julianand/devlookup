import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import SearchBar from './SearchBar.tsx'

it('renders the search form with input and submit button', () => {
  render(<SearchBar value="" onChange={() => {}} onSubmit={() => {}} />)

  expect(screen.getByRole('search')).toBeTruthy()
  expect(screen.getByRole('textbox', { name: 'Search GitHub username' })).toBeTruthy()
  expect(screen.getByRole('button', { name: /search/i })).toBeTruthy()
})
