# ZetaRe frontend

- **Dev:** `bun install` then `bun run dev` (Vite SPA; **no in-repo API server**).
- **Config:** Vite and browser values use `VITE_*` in `.env` (baked at `build`). See `src/config/appConfig.ts` and `src/vite-env.d.ts`. Identity: **Authentik** (OIDC); profiles from JWT in `src/lib/authentikUser.ts` and `src/contexts/JWTContext.tsx`.
- **Data:** **Supabase** with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` under `src/lib/supabase/`.

**OIDC token exchange:** confidential clients must not use a browser-only token step. A separate **OIDC BFF** service (e.g. `https://oidc-bff.flordearagua.com`) runs the `code → token` exchange. This repository is only the static app; the BFF is a separate container/repo. `VITE_OIDC_BFF_URL` (and `VITE_OIDC_BFF_CLIENT_KEY` if your BFF YAML has multiple clients) are in `appConfig` for the SPA to call the BFF. CORS is handled on the BFF, not on Nginx in front of the IdP.

## Docker (on-prem)

Service name / image: **`zeta-re-frontend`**: **nginx** serves `dist/`. The image has **no** application server—only static files.

```bash
docker compose build
docker compose up -d
# e.g. http://127.0.0.1:8080 (see `docker-compose.yml` for port)

```

Pass build-time `VITE_*` via your `.env` and `docker-compose.yml` `build.args` (or CI). `VITE_OIDC_REDIRECT_URI` in Authentik must match the SPA callback (e.g. `https://…/auth/callback`). **Logout** is **local to this app** only (`removeUser` + redirect to `/login`); it does not call Authentik end-session, so SSO sessions for other apps stay signed in.

Override the port in `docker-compose.yml` if you need something other than `8080:80`.
