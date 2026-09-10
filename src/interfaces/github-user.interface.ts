export interface GithubUser {
  avatar_url: string;
  created_at: string;
  login: string;
  name?: string;
  bio?: string;
  public_repos?: number;
  followers?: number;
  following?: number;
  location?: string;
  blog?: string;
  twitter_username?: string;
  company?: string;
}