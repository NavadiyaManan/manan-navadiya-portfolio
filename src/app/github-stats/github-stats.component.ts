import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface GitHubProfile {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

@Component({
  selector: 'app-github-stats',
  imports: [CommonModule],
  templateUrl: './github-stats.component.html',
  styleUrl: './github-stats.component.scss'
})
export class GithubStatsComponent implements OnInit {
  username = 'NavadiyaManan';
  profile: GitHubProfile | null = null;
  repos: GitHubRepo[] = [];
  isLoading = true;
  isError = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchGitHubData();
    }
  }

  async fetchGitHubData() {
    try {
      this.isLoading = true;
      this.isError = false;

      // 1. Fetch user profile
      const profileResponse = await fetch(`https://api.github.com/users/${this.username}`);
      if (!profileResponse.ok) throw new Error('Failed to fetch profile');
      this.profile = await profileResponse.json();

      // 2. Fetch user repositories
      const reposResponse = await fetch(`https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`);
      if (!reposResponse.ok) throw new Error('Failed to fetch repos');
      const allRepos: any[] = await reposResponse.json();

      // Filter and select top repositories (filter out forks, sort by stars, limit to 4)
      this.repos = allRepos
        .filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        .slice(0, 4)
        .map(repo => ({
          name: repo.name,
          description: repo.description || 'No description provided.',
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language || 'TypeScript',
          html_url: repo.html_url,
          updated_at: repo.updated_at
        }));

      this.isLoading = false;
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      this.isLoading = false;
      this.isError = true;
    }
  }
}
