import { Octokit } from "@octokit/core";



async function getPullRequests(accessToken: string) {
  if (!accessToken) { throw new Error('Not logged in');}

  const octokit = new Octokit({ auth: accessToken })

  // Get 10 most recently updated repositories
  const response = await octokit.request('GET /user/repos', {
    per_page: 10,
    sort: 'updated'
  });

  // Fetch pull requests for each repository
  const prPromises = [];
  for (const repo of response.data) {
    const prPromise = octokit.request('GET /repos/{owner}/{repo}/pulls', {
      owner: repo.owner.login,
      repo: repo.name,
      state: 'all',
      per_page: 10
    });
    prPromises.push(prPromise);
  }

  const prResponses = await Promise.all(prPromises);
  const prs = prResponses.map((response) => response.data).flat();
  return prs;
}

export { getPullRequests };