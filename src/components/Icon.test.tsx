import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import Icon, { type IconName } from './Icon.tsx'

it.each<[IconName, string, string, string]>([
  ['search', '0 0 25 24', '25', '24'],
  ['location', '0 0 14 20', '14', '20'],
  ['website', '0 0 20 20', '20', '20'],
  ['twitter', '0 0 20 18', '20', '18'],
  ['company', '0 0 20 20', '20', '20'],
  ['sun', '0 0 20 20', '20', '20'],
  ['moon', '0 0 20 20', '20', '20'],
])('renders %s with its intrinsic size and colors via currentColor', (name, viewBox, width, height) => {
  const { container } = render(<Icon name={name} />)

  const svg = container.querySelector('svg')
  expect(svg).not.toBeNull()
  expect(svg?.getAttribute('aria-hidden')).toBe('true')
  expect(svg?.getAttribute('viewBox')).toBe(viewBox)
  expect(svg?.getAttribute('width')).toBe(width)
  expect(svg?.getAttribute('height')).toBe(height)

  const path = svg?.querySelector('path')
  expect(path?.getAttribute('fill')).toBe('currentColor')
})
