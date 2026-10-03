import SearchBar from "./components/SearchBar.tsx";
import UserDescription from "./components/UserDescription.tsx";
import "./App.css";
import ThemeButton from "./components/ThemeButton.tsx";
import { useUserInfo } from "./hooks/useUserInfo.ts";

function App() {
  const { userInfo, loading, searchError, clearSearchError, loadUser } = useUserInfo("octocat");

  return (
    <div className="app">
      <header className="app-header">
        <h1>devlookup</h1>
        <ThemeButton />
      </header>
      <SearchBar
        onInput={() => clearSearchError()}
        onSubmit={loadUser}
        loading={loading}
        searchError={searchError}
      />
      <UserDescription user={userInfo} />
    </div>
  );
}

export default App;
