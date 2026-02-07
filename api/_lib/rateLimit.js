const DEFAULT_WINDOW_MS = 60_000;
const DEFAULT_MAX = 10;

if (!globalThis.__vproRateLimitStore) {
  globalThis.__vproRateLimitStore = new Map();
}

export function isRateLimited(key, windowMs = DEFAULT_WINDOW_MS, max = DEFAULT_MAX) {
  const now = Date.now();
  const store = globalThis.__vproRateLimitStore;
  const entry = store.get(key);

  if (!entry) {
    store.set(key, { count: 1, lastSeen: now });
    return false;
  }

  if (now - entry.lastSeen > windowMs) {
    store.set(key, { count: 1, lastSeen: now });
    return false;
  }

  entry.count += 1;
  entry.lastSeen = now;
  store.set(key, entry);

  return entry.count > max;
}
