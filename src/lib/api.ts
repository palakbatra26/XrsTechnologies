const trimTrailingSlash = (value: string) => value.replace(/\/$/, "");

export function getApiBaseUrl() {
  const configuredBaseUrl =
    import.meta.env.VITE_VERIFY_API_BASE_URL || import.meta.env.VITE_API_BASE_URL;

  if (configuredBaseUrl) {
    return trimTrailingSlash(configuredBaseUrl);
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:5000";
  }

  return "";
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const baseUrl = getApiBaseUrl();

  if (!baseUrl) {
    return normalizedPath;
  }

  return `${baseUrl}${normalizedPath}`;
}
