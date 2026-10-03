import {
  Building2,
  Link as LinkIcon,
  MapPin,
  Moon,
  Search,
  Sun,
  X,
  type LucideIcon,
} from 'lucide-react'
import { type ReactElement } from 'react'

export type IconName = 'search' | 'location' | 'blog' | 'twitter' | 'company' | 'sun' | 'moon'

const ICONS: Record<IconName, LucideIcon> = {
  search: Search,
  location: MapPin,
  blog: LinkIcon,
  twitter: X,
  company: Building2,
  sun: Sun,
  moon: Moon,
}

const SIZES: Record<IconName, number> = {
  search: 24,
  location: 20,
  blog: 20,
  twitter: 18,
  company: 20,
  sun: 20,
  moon: 20,
}

function Icon({ name, className }: { name: IconName; className?: string }): ReactElement {
  const IconComponent = ICONS[name]
  return (
    <IconComponent
      className={className}
      size={SIZES[name]}
      strokeWidth={2}
      aria-hidden="true"
    />
  )
}

export default Icon
