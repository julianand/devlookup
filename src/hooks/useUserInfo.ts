import { useEffect, useRef, useState } from "react";
import type { GithubUser } from "../interfaces/github-user.interface";

export function useUserInfo(defaultUser: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<GithubUser | undefined>(undefined);
  const ctrlRef = useRef(new AbortController());

  function loadUser(username: string) {
    const ctrl = new AbortController();
    ctrlRef.current.abort();
    ctrlRef.current = ctrl;

    setLoading(true);

    // Fetch user
    fetch(`https://api.github.com/users/${username}`, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(res.status + "");
        return res.json();
      })
      // If failed and was not because it was cancelled, setSearchError true to remove error state from ui
      .catch(() => {
        if (!ctrl.signal.aborted) setSearchError(true);
        return undefined;
      })
      // Set user info if was not cancelled
      .then((userResponse) => {
        if (!userResponse) return;
        setUserInfo(userResponse);
      })
      // Set loading false
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });
    
    return () => ctrl.abort();
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect -- setLoading(true) must run synchronously with the fetch start; the defaultUser kick-start on mount is intentional
  useEffect(() => loadUser(defaultUser), [defaultUser]);

  return {
    userInfo,
    loading,
    searchError,
    loadUser,
    clearSearchError: () => setSearchError(false),
  };
}
