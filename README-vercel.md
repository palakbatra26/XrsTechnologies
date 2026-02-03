# Vercel SPA Routing Fix

The `/verify` page is a client-side React Router route. When deploying the **vprotech** Vite app on Vercel, you must configure a rewrite so that all routes return `index.html`.

## Required configuration

1. Ensure **`vprotech/vercel.json`** is deployed with the app:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

2. In Vercel **Project Settings → General**, set:

- **Root Directory**: `vprotech`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

This ensures `/verify` (and any other SPA route) renders correctly instead of returning 404.

## Environment variables

Make sure the Vercel project has:

- `VITE_VERIFY_API_BASE_URL` (or `VITE_API_BASE_URL`) pointing to your deployed API
- `VITE_CLERK_PUBLISHABLE_KEY`
