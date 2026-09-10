import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, expect, it } from 'vitest'
import { octocatUser } from '../test/github-user.fixture.ts'
import UserDescription from './UserDescription.tsx'

function renderUser(overrides: Partial<typeof octocatUser> = {}) {
  return render(<UserDescription user={{ ...octocatUser, ...overrides }} />)
}

beforeEach(() => {
  cleanup()
})

it('renders the always-present identity fields', () => {
  renderUser()

  expect(screen.getByRole('heading', { name: 'The Octocat' })).toBeTruthy()
  expect(screen.getByText('@octocat')).toBeTruthy()
  expect(screen.getByText(/Joined 25 Jan 2011/)).toBeTruthy()

  const avatar = screen.getByRole('img')
  expect(avatar.getAttribute('src')).toContain(octocatUser.avatar_url)
  expect(avatar.getAttribute('alt')).toBe('The Octocat')
})

it('renders the stats with their labels and values', () => {
  renderUser()

  for (const [label, value] of [
    ['Repos', 8],
    ['Followers', 3938],
    ['Following', 9],
  ] as const) {
    expect(screen.getByText(label)).toBeTruthy()
    expect(screen.getByText(String(value))).toBeTruthy()
  }
})

it('falls back to the username without @ when there is no name', () => {
  renderUser({ name: undefined })

  const heading = screen.getByRole('heading', { name: 'octocat' })
  expect(heading.tagName).toBe('H1')
  expect(screen.getByText('@octocat')).toBeTruthy()
  expect(screen.getByRole('img').getAttribute('alt')).toBe('octocat')
})

it('shows the no-bio message with the unavailable style', () => {
  const { container } = renderUser({ bio: undefined })

  const bio = screen.getByText('This profile has no bio')
  expect(bio.className).toBe('user-bio unavailable')
  expect(container.querySelector('.user-bio.unavailable')).toBe(bio)
})

it.each(['location', 'blog', 'twitter_username', 'company'] as const)(
  'shows Not Available for a missing %s meta field',
  (field) => {
    renderUser({ [field]: undefined })

    const notAvailable = screen.getAllByText('Not Available')
    expect(notAvailable).toHaveLength(1)

    const item = screen.getByText('Not Available').closest('li')
    expect(item?.className).toBe('unavailable')

    if (field !== 'location') {
      expect(item?.querySelector('a')).toBeNull()
    }
  },
)

it('links the company removing the @ prefix and targets github', () => {
  renderUser()

  const link = screen.getByRole('link', { name: '@github' })
  expect(link.getAttribute('href')).toBe('https://github.com/github')
  expect(link.getAttribute('rel')).toBe('noreferrer noopener')
  expect(link.getAttribute('target')).toBe('_blank')
})

it('prepends https to blog urls without a scheme', () => {
  renderUser({ blog: 'github.blog' })

  const link = screen.getByRole('link', { name: 'github.blog' })
  expect(link.getAttribute('href')).toBe('https://github.blog')
})

it('links the twitter username to x.com', () => {
  renderUser({ twitter_username: 'mona' })

  const link = screen.getByRole('link', { name: '@mona' })
  expect(link.getAttribute('href')).toBe('https://x.com/mona')
})

it('renders only the empty card skeleton when there is no user', () => {
  const { container } = render(<UserDescription user={undefined} />)

  const card = container.querySelector('.user-card')
  expect(card).toBeTruthy()
  expect(card?.textContent).toBe('')
  expect(screen.queryByRole('heading')).toBeNull()
  expect(screen.queryByRole('img')).toBeNull()
})
