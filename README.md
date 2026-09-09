# devlookup

A GitHub user search app: look up any GitHub user by username and see their profile, stats, and links in a clean, themeable card.

Built as my solution to the [GitHub user search app](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6) challenge on [Frontend Mentor](https://www.frontendmentor.io). The design/requirements came from the challenge; the implementation, theming, and tests are my own.

## Features

- Search GitHub users by username via the [GitHub Users API](https://docs.github.com/en/rest/reference/users#get-a-user).
- Shows Octocat's profile on first load.
- Displays a "No results" message when a user isn't found.
- Graceful fallbacks: `user.name ?? user.login` (login repeated below with `@`), "This profile has no bio", and "Not Available" for empty location/website/Twitter/company.
- Company `@` is stripped and linked to `https://github.com/<company>`; website links get `https://` prefixed when scheme-less; links open with `rel="noreferrer noopener"`.
- Light/dark theme toggle that defaults to the system preference.

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Vitest + Testing Library (jsdom)
- lucide-react icons
- Plain CSS with a token-based theme (no CSS framework)

## Getting Started

- `npm install` — install dependencies
- `npm run dev` — start the dev server
- `npm test` / `npm run test:run` — run the test suite (watch / single pass)
- `npm run lint` — ESLint
- `npm run build` — typecheck + production build
- `npm run preview` — serve the production build

## Architecture at a Glance

- `App` — wires the pieces together: search state (via `useUserInfo`), the search bar, and the rendered profile.
- `SearchBar` — uncontrolled form; owns the input draft, shows "No results", and disables while loading/error.
- `useUserInfo` — data hook: fetches a user from the GitHub API, manages loading/error state, and cancels in-flight requests with `AbortController`.
- `UserDescription` — presentational profile card: stats, joined date, and bio/meta fallbacks.
- `ThemeButton` — light/dark toggle; defaults to the system preference and applies `data-theme` on `<html>`.
- `Icon` — thin wrapper over `lucide-react` that maps icon names to components.

## Testing

Tests are colocated next to their components (`Foo.test.tsx`) and run with Vitest + Testing Library. Network calls are mocked (`vi.stubGlobal('fetch', …)`), so the suite never hits the live API.

## AI-Assisted Development

This project was developed with AI assistance, treated as a coding partner — not a shortcut. I made the architectural and product decisions (design-token system, custom fetch hook with request cancellation, uncontrolled search form, test strategy), used an AI agent for pairing on implementation, code review, test scaffolding, and documentation, and reviewed every change before it landed. Working context for any AI agent or contributor is documented in `AGENTS.md`, following the rules I wrote there.

## License

MIT — see [LICENSE](./LICENSE).
