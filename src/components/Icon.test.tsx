import { render } from '@testing-library/react'
import { expect, it } from 'vitest'
import Icon, { type IconName } from './Icon.tsx'

const NAMES: IconName[] = ['search', 'location', 'blog', 'twitter', 'company', 'sun', 'moon']

it.each(NAMES)(
  'renders the %s icon as a decorative currentColor svg',
  (name) => {
    const { container } = render(<Icon name={name} className="my-icon" />)

    const svg = container.querySelector('svg')
    expect(svg).not.toBeNull()
    expect(svg?.getAttribute('aria-hidden')).toBe('true')
    expect(svg?.getAttribute('stroke')).toBe('currentColor')
    expect(svg?.classList.contains('my-icon')).toBe(true)
  },
)
