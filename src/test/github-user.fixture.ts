import type { GithubUser } from "../interfaces/github-user.interface.ts";

export const octocatUser: GithubUser = {
  avatar_url: "https://avatars.githubusercontent.com/octocat?v=4",
  login: "octocat",
  name: "The Octocat",
  created_at: "2011-01-25T18:44:36Z",
  bio: "learned to code by watching the octocat",
  public_repos: 8,
  followers: 3938,
  following: 9,
  location: "San Francisco",
  blog: "https://github.blog",
  twitter_username: "mona",
  company: "@github",
};

export function responseWith(payload: object | null, ok = true, status = 200) {
  return {
    ok,
    status,
    json: () => Promise.resolve(payload),
  };
}
