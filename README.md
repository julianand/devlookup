<h1 align="center">🔎 devlookup</h1>

<p align="center">
  <em>A GitHub user search app — look up any user by username and see their profile, stats, and links in a clean, themeable card.</em>
</p>

<p align="center">
  <img alt="React 19" src="https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img alt="TypeScript 6" src="https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Vite 8" src="https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
</p>

<p align="center">
  <img alt="Vitest 5" src="https://img.shields.io/badge/Vitest_5-6E9F18?style=for-the-badge&logo=vitest&logoColor=white" />
  <img alt="Testing Library" src="https://img.shields.io/badge/Testing_Library-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white" />
  <img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
  <img alt="lucide" src="https://img.shields.io/badge/lucide-000000?style=for-the-badge&logo=lucide&logoColor=white" />
  <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge" />
  <img alt="Deployed on Vercel" src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

> 🎓 Built as my solution to the [GitHub user search app](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6) challenge on [Frontend Mentor](https://www.frontendmentor.io). The design and requirements came from the challenge; the implementation, theming, and tests are my own.

## 🌐 Live Demo

👉 **[devlookup-psi.vercel.app](https://devlookup-psi.vercel.app/)**

## ✨ Features

- 🔍 **Search** any GitHub user by username via the [GitHub Users API](https://docs.github.com/en/rest/reference/users#get-a-user).
- 🐙 **Octocat on first load** so the UI is never empty.
- 🚫 **"No results"** feedback when a username isn't found.
- 🧩 **Graceful fallbacks**: `user.name ?? user.login` (login repeated below with `@`), *"This profile has no bio"*, and *"Not Available"* for empty location / website / Twitter / company.
- 🔗 **Smart links**: company `@` is stripped and linked to `https://github.com/<company>`, scheme-less websites get `https://` prefixed, and all external links open with `rel="noreferrer noopener"`.
- 🌗 **Light / dark theme** that defaults to the system preference.

## 🛠️ Tech Stack

| Layer | Technology |
| --- | --- |
| UI | [React 19](https://react.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| Build tool | [Vite 8](https://vite.dev) |
| Testing | [Vitest 5](https://vitest.dev) + [Testing Library](https://testing-library.com) (jsdom) |
| Icons | [lucide-react](https://lucide.dev) |
| Styling | Plain CSS with a token-based theme — no CSS framework |
| Linting | ESLint (flat config) |

## 🚀 Getting Started

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# run the test suite (watch / single pass)
npm test
npm run test:run

# lint
npm run lint

# typecheck + production build
npm run build

# preview the production build
npm run preview
```

## 📁 Project Structure

```text
src/
├── components/        # UI + colocated Foo.css and Foo.test.tsx
├── hooks/             # useUserInfo — data fetching
├── interfaces/        # GitHub API types
├── test/              # shared test fixture
├── App.tsx
├── App.css            # design tokens + theme
├── index.css          # global element styles
└── main.tsx
```

## 🏗️ Architecture at a Glance

| Piece | Responsibility |
| --- | --- |
| `App` | Wires the pieces: search state (via `useUserInfo`), search bar, and rendered profile. |
| `SearchBar` | Uncontrolled form; owns the input draft, shows "No results", disables while loading/error. |
| `useUserInfo` | Fetches a user from the GitHub API, manages loading/error state, and cancels in-flight requests with `AbortController`. |
| `UserDescription` | Presentational profile card: stats, joined date, and bio/meta fallbacks. |
| `ThemeButton` | Light/dark toggle; defaults to the system preference and applies `data-theme` on `<html>`. |
| `Icon` | Thin wrapper over `lucide-react` that maps icon names to components. |

## 🧪 Testing

Tests are colocated next to their components (`Foo.test.tsx`) and run with **Vitest + Testing Library**. Network calls are mocked (`vi.stubGlobal('fetch', …)`), so the suite never hits the live API.

## 🤝 AI-Assisted Development

This project was developed with AI assistance, treated as a coding partner — not a shortcut. I made the architectural and product decisions (design-token system, custom fetch hook with request cancellation, uncontrolled search form, test strategy), used an AI agent for pairing on implementation, code review, test scaffolding, and documentation, and reviewed every change before it landed. Working context for any AI agent or contributor is documented in `AGENTS.md`, following the rules I wrote there.

## 📄 License

MIT — see [LICENSE](./LICENSE).

---

<p align="center">Made with ❤️ by Julian Pitre</p>
