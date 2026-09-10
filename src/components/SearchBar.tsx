import { type FormEvent } from 'react'
import Icon from './Icon.tsx'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
}

function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <Icon name="search" className="search-bar-icon" />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search GitHub username…"
        aria-label="Search GitHub username"
      />
      <button className="search-btn" type="submit">
        Search
      </button>
    </form>
  )
}

export default SearchBar
