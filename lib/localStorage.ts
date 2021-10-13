import type { Middleware, SWRHook } from 'swr';

type StoredObject = {
  value: any;
  ttl?: number;
};

const hoursToMS = (hours: number) => {
  return hours * 60 * 60 * 1000;
};

const getLocalStorage = (key: string, initialValue: any) => {
  try {
    if (typeof localStorage === 'undefined') return initialValue;
    const item = localStorage.getItem(key);
    if (item) {
      const now = new Date();
      const { ttl, value } = JSON.parse(item) as StoredObject;
      if (ttl && now.getTime() > ttl) {
        localStorage.removeItem(key);
        return initialValue;
      }
      return value ? value : initialValue;
    }
    return initialValue;
  } catch (err) {
    console.log(err);
    return initialValue;
  }
};

const setLocalStorage = (key: string, valueToStore: any, ttl?: number) => {
  try {
    if (typeof localStorage === 'undefined') return;
    const now = new Date();
    const item: StoredObject = {
      value: valueToStore,
    };
    if (ttl) {
      item.ttl = now.getTime() + ttl;
    }
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    // A more advanced implementation would handle the error case
    console.log(error);
  }
};

type StorageConfig = {
  ttl: number;
};
class localStorageMiddleware {
  private keyMap: Record<string, StorageConfig> = {};
  constructor(key?: string, config?: { ttl: number }) {
    if (key && config) this.setTTL(key, config);
  }
  public setTTL(key: string, config: { ttl: number }) {
    this.keyMap[key] = config;
  }

  public get middleware(): Middleware {
    const getTTL = (key: string) => this.keyMap[key];
    return (useSWRNext: SWRHook) => {
      return (key, fetcher, config) => {
        const currentTTL = getTTL(key as string) || { ttl: 0.5 };
        // Before hook runs...
        const localData = getLocalStorage(key as string, []);

        const shouldFetch = localData.length === 0;
        // Handle the next middleware, or the `useSWR` hook if this is the last one.
        const swr = useSWRNext(shouldFetch ? (key as string) : null, fetcher, config);

        if (swr.data) {
          setLocalStorage(key as string, swr.data, hoursToMS(currentTTL.ttl));
        }
        // After hook runs...
        return {
          ...swr,
          data: shouldFetch ? swr.data : localData,
        };
      };
    };
  }
}

export default localStorageMiddleware;
