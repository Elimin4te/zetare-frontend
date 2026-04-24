# ZetaRe frontend

- **Dev:** `bun install` then `bun run dev` (Vite SPA only; no in-repo backend).
- **Config:** Vite and browser-facing values live in `src/config/appConfig.ts`. Common names: `VITE_TITLE`, `VITE_BASE_PATH`, `VITE_OIDC_*`, `VITE_SUPABASE_*` (see `src/vite-env.d.ts` for the full set). Identity is **Authentik** (OIDC) in the browser; the app maps JWT claims to `UserProfile` (see `src/lib/authentikUser.ts` and `src/contexts/JWTContext.tsx`).
- **Data:** **Supabase** from the app’s perspective: `src/lib/supabase/` after setting `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.

## Docker (on-prem)

Service name / image: **`zeta-re-frontend`**. The image is **nginx** serving the static `dist/` build. There is **no** Bun or Hono BFF in the container.

```bash
# Build: pass Vite args from your .env; see `docker-compose.yml` `build.args`
docker compose build

docker compose up -d
# App: http://127.0.0.1:8080  (or map host:container as you like)
```

OIDC and Supabase settings are **build-time** `VITE_*` values (baked into the static bundle), not a separate server runtime. Configure your IdP redirect URI to match the SPA (e.g. `/callback` or whatever you set in `VITE_OIDC_REDIRECT_URI`).

Adjust the published port in `docker-compose.yml` if you need something other than `8080:80`.
