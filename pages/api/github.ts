import type { NextApiRequest, NextApiResponse } from 'next';

const baseURL = `https://api.github.com/users`;
const githubProfile = process.env.GITHUB_USERNAME || 'octocat';

async function getProfileInfo() {
  const request = await fetch(`${baseURL}/${githubProfile}`);
  const response = await request.json();
  return response;
}

async function getProjectRepos() {
  const request = await fetch(`${baseURL}/${githubProfile}/repos`);
  const response = await request.json();
  return response.filter((repo: any) => repo.fork === false);
}

async function getGithub() {
  const results = await Promise.all([getProfileInfo(), getProjectRepos()]);
  return results.reduce(
    (acc: { repos: any[]; profile: any }, cur) => {
      if (Array.isArray(cur)) {
        acc.repos = cur;
      } else {
        acc.profile = cur;
      }
      return acc;
    },
    { repos: [], profile: {} }
  );
}

export default async function handler({ query }: NextApiRequest, res: NextApiResponse) {
  const { projects, profile } = query;
  const data: Record<string, any> = {};
  if (Object.keys(query).length === 0) {
    return res.status(200).json(await getGithub());
  }
  if (projects) data.repos = await getProjectRepos();
  if (profile) data.profile = await getProfileInfo();
  return res.status(200).json(data);
}
