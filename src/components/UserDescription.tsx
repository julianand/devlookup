import Icon, { type IconName } from './Icon.tsx'

interface GitHubUser {
  avatar: string
  name: string
  username: string
  joinedDate: string
  bio: string | null
  repos: number
  followers: number
  following: number
  location: string | null
  website: string | null
  twitter: string | null
  company: string | null
}

function UserDescription({ user }: { user: GitHubUser }) {
  const stats = [
    { label: 'Repos', value: user.repos },
    { label: 'Followers', value: user.followers },
    { label: 'Following', value: user.following },
  ]

  const meta: { icon: IconName; text: string; unavailable: boolean; href: string | null }[] = [
    {
      icon: 'location',
      text: user.location ?? 'Not Available',
      unavailable: user.location === null,
      href: null,
    },
    {
      icon: 'website',
      text: user.website ?? 'Not Available',
      unavailable: user.website === null,
      href: user.website,
    },
    {
      icon: 'twitter',
      text: user.twitter ?? 'Not Available',
      unavailable: user.twitter === null,
      href: user.twitter,
    },
    {
      icon: 'company',
      text: user.company ?? 'Not Available',
      unavailable: user.company === null,
      href: user.company,
    },
  ]

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar} alt={user.name} />
      </div>
      <div className="user-info">
        <div className="user-id">
          <div>
            <h2>{user.name}</h2>
            <p className="user-login">@{user.username}</p>
          </div>
          <p className="user-joined">Joined {user.joinedDate}</p>
        </div>

        <p className="user-bio">{user.bio ?? 'This profile has no bio'}</p>

        <dl className="user-stats">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <ul className="user-meta">
          {meta.map((item) => (
            <li key={item.icon} className={item.unavailable ? 'unavailable' : undefined}>
              <Icon name={item.icon} />
              {item.unavailable ? (
                <span>{item.text}</span>
              ) : (
                <a href={item.href ?? '#'}>{item.text}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserDescription
