import useSWR from 'swr';
import fetcher from '@/lib/fetch';
import LocalStorageMiddleware from '@/lib/localStorage';

export type GithubResponse = {
  repos?: any[];
  profile?: Record<string, any>;
};

type useGithubParams = {
  projects?: boolean;
  profile?: boolean;
  options?: {
    ttl: number;
  };
};

const urlParams = (params?: Record<string, any> | useGithubParams) => {
  let searchParams = new URLSearchParams(params || {});
  const queryString = searchParams.toString();
  if (queryString) return `?${queryString}`;
  return queryString;
};

const localMiddleware = new LocalStorageMiddleware();

export const useGithub = <T = GithubResponse>(_config?: useGithubParams) => {
  const { options, ...config } = _config || {};
  const url = `/api/github${urlParams(config || { repos: true, profile: true })}`;
  localMiddleware.setTTL(url, { ttl: options?.ttl || 0.5 });
  const { data, error } = useSWR<T>(url, fetcher, {
    use: [localMiddleware.middleware],
  });
  return {
    data,
    error,
  };
};
