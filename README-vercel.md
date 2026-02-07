# Vercel Deployment Guide (SPA + Verification APIs)

This project now supports **frontend + verification APIs in the same `vprotech` deployment**.

## 1) Routing configuration

`vprotech/vercel.json` must keep API routes before SPA fallback:

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/:path*", "destination": "/index.html" }
  ]
}
```

## 2) Vercel project settings

- **Root Directory**: `vprotech`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## 3) Required environment variables (Vercel)

- `MONGODB_URI` = your Mongo connection string
- `CERT_TOKEN_SECRET` = strong random secret
- `VITE_CLERK_PUBLISHABLE_KEY` = Clerk publishable key

Optional:
- `VITE_VERIFY_API_BASE_URL` only if you want frontend to call an external API.
  If omitted, frontend uses same-origin `/api` in production.

## 4) Available verification endpoints

- `POST /api/verify-student`
- `POST /api/verify-employee`
- `GET /api/verify/:certId?token=...`

## 5) Smoke tests after deploy

1. Open `/verify` and test student roll no: `IT2023-045`
2. Open certificate URL format:
   `/verify/B42152620?token=demo-token`
3. Confirm no 404 on refresh for `/verify` and `/verify/:certId`.
