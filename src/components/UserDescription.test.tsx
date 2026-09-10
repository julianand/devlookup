import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import UserDescription from './UserDescription.tsx'
import type { GitHubUser } from './UserDescription.tsx'

const fixture: GitHubUser = {
  avatar: 'https://avatars.githubusercontent.com/octocat?v=4',
  name: 'The Octocat',
  username: 'octocat',
  joinedDate: '25 Jan 2011',
  bio: null,
  repos: 8,
  followers: 3938,
  following: 9,
  location: 'San Francisco',
  website: 'https://github.blog',
  twitter: null,
  company: '@github',
}

it('renders the user profile with fallbacks for missing fields', () => {
  render(<UserDescription user={fixture} />)

  expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeTruthy()
  expect(screen.getByText('@octocat')).toBeTruthy()
  expect(screen.getByText('This profile has no bio')).toBeTruthy()
  expect(screen.getAllByText('Not Available')).toHaveLength(1)
  expect(screen.getByText(/Joined 25 Jan 2011/)).toBeTruthy()
})
