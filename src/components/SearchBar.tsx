import { type InputEvent, type SubmitEvent } from "react";
import Icon from "./Icon.tsx";

interface SearchBarProps {
  onSubmit: (value: string) => void;
  onInput: (value: string) => void;
  loading?: boolean;
  searchError?: boolean;
}

function SearchBar(props: SearchBarProps) {
  const { onSubmit, loading, searchError, onInput } = props;
  const buttonDisabled = loading || searchError;

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const search = formData.get('search-text') as string;

    onSubmit(search);
  }

  function handleInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    onInput(input.value);
  }

  return (
    <form className="search-bar" role="search" onSubmit={handleSubmit}>
      <Icon name="search" className="search-bar-icon" />
      <input
        name="search-text"
        type="text"
        onInput={(event) => handleInput(event)}
        placeholder="Search GitHub username…"
        aria-label="Search GitHub username"
      />
      {searchError && <span className="search-no-results">No results</span>}
      <button className={`search-btn ${buttonDisabled ? 'disabled' : ''}`} type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
