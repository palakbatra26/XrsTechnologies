export const ADMIN_AUTH_KEY = "trendora_admin_authed";

export const getAdminAuth = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return window.localStorage.getItem(ADMIN_AUTH_KEY) === "true";
};

export const setAdminAuth = (value: boolean) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(ADMIN_AUTH_KEY, value ? "true" : "false");
};
