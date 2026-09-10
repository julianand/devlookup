import type { GithubUser } from "../interfaces/github-user.interface.ts";
import Icon, { type IconName } from "./Icon.tsx";

const linkProps = (metaItem: { icon: IconName; text?: string; href?: string }) => {
  if (!metaItem.href) return;

  let href = metaItem.href;
  if (!href.startsWith("http")) href = "https://" + href;

  return { href, target: "_blank", rel: "noreferrer noopener" };
};

const getCreatedDateFormatted = (dateISO: string) => {
  // Use native locale formatter to format date
  const dateFormatter = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });

  // Format date in en-GB (Day Month Year)
  return dateFormatter.format(new Date(dateISO));
};

function UserDescription({ user }: { user: GithubUser | undefined }) {
  if (!user) return <div className="user-card"></div>;

  const stats = [
    { label: "Repos", value: user.public_repos },
    { label: "Followers", value: user.followers },
    { label: "Following", value: user.following },
  ];

  const meta: { icon: IconName; text?: string; href?: string }[] = [
    {
      icon: "location",
      text: user.location,
    },
    {
      icon: "twitter",
      text: user.twitter_username ? `@${user.twitter_username}` : undefined,
      href: user.twitter_username ? `https://x.com/${user.twitter_username}` : undefined,
    },
    {
      icon: "blog",
      text: user.blog,
      href: user.blog,
    },
    {
      icon: "company",
      text: user.company,
      href: (user.company ?? "").startsWith("@")
        ? `https://github.com/${user.company?.substring(1)}`
        : undefined,
    },
  ];

  return (
    <div className="user-card">
      <div className="user-avatar">
        <img src={user.avatar_url} alt={user.name ?? user.login} />
      </div>
      <div className="user-info">
        <div className="user-id">
          <div>
            <h1>{user.name ?? user.login}</h1>
            <h3 className="user-login">@{user.login}</h3>
          </div>
          <p className="user-joined">Joined {getCreatedDateFormatted(user.created_at)}</p>
        </div>

        <p className={`user-bio ${!user.bio ? "unavailable" : ""}`}>
          {user.bio ?? "This profile has no bio"}
        </p>

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
            <li key={item.icon} className={!item.text ? "unavailable" : undefined}>
              <Icon name={item.icon} />
              {!item.text ? <span>Not Available</span> : <a {...linkProps(item)}>{item.text}</a>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDescription;
