import SearchBar from "./components/SearchBar.tsx";
import UserDescription from "./components/UserDescription.tsx";
import "./App.css";
import { ThemeButton } from "./components/ThemeButton.tsx";

const dummyUser = {
  avatar: "https://avatars.githubusercontent.com/octocat?v=4",
  name: "The Octocat",
  username: "octocat",
  joinedDate: "25 Jan 2011",
  bio: null,
  repos: 8,
  followers: 3938,
  following: 9,
  location: "San Francisco",
  website: "https://github.blog",
  twitter: null,
  company: "@github",
};

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>devfinder</h1>
        <ThemeButton />
      </header>
      <SearchBar value="" onChange={() => {}} onSubmit={() => {}} />
      <UserDescription user={dummyUser} />
    </div>
  );
}

export default App;
