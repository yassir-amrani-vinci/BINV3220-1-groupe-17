# Gesta project guidelines

## Build, test, and lint

Use Node.js 22.14 or newer (Node 24 LTS is recommended). Run commands from the repository
root unless noted otherwise.

```bash
npm ci                 # install the lockfile exactly
npm run setup          # create backend/.env and initialize the demo database
npm run dev            # API at http://localhost:3000, frontend at http://localhost:5173
npm run check          # lint, typecheck, tests, and production builds
npm run lint
npm run typecheck
npm test
npm run build
```

Database helpers are `npm run db:init` and `npm run db:reset`; stop the dev server before
resetting the database. The root scripts delegate to both npm workspaces. Backend-only or
frontend-only commands can be run with `npm run <script> -w backend` or
`npm run <script> -w frontend`.

Run a focused test with Vitest, for example:

```bash
npx vitest run backend/tests/offers.test.ts
npx vitest run frontend/tests/OffersPage.test.tsx
npx vitest run frontend/tests/OffersPage.test.tsx -t "shows published offers"
```

Backend tests use an in-memory SQLite database and `tests/helpers/testApp.ts`; frontend
tests use Testing Library and the fetch mock in `frontend/tests/helpers/fetchMock.ts`.
Do not use the development database for tests.

## Architecture

Gesta is a two-workspace application:

- `backend/` is an Express API backed by SQLite and `better-sqlite3`.
- `frontend/` is a React 19 application built with Vite and React Router.
- In development, Vite proxies frontend `/api/...` requests to the backend at port 3000,
  removing the `/api` prefix.

Backend request flow is `main.ts` → `app.ts` → middleware → controller → service →
repository → SQLite. Controllers validate HTTP input and format responses; services contain
business rules and never receive Express `Request` or `Response` objects; repositories own
SQL and return database rows; mappers convert database rows to domain/API shapes. Authentication
reloads the account, roles, and companies from the database on every request, and named
permission functions are enforced by `authorize` middleware and services. Domain errors are
raised as `HttpError` and converted centrally to the documented JSON error shape by
`errorHandler`.

Frontend flow is `pages` → `hooks` → `services`/`utils` → `models`, with reusable
presentation in `components`. `App` calls `useAuth` once and passes session state and
logout handling down to pages. API services check response status and validate JSON with
type guards; hooks own loading/error state and redirect to login through `onUnauthorized`
after a 401.

For the full layer map and reference implementations, see
[docs/architecture.md](../docs/architecture.md). API contracts and error codes are in
[backend/API.md](../backend/API.md), and business requirements are in
[docs/cdc_gesta_developpement.md](../docs/cdc_gesta_developpement.md).

## Repository conventions

- Keep backend imports relative and ending in `.ts`; the TypeScript build rewrites them to
  `.js`.
- Add schema changes as a new ordered SQL migration under
  `backend/src/db/migrations/` (for example `002_...sql`). Never edit an already-applied
  migration. Migrations are tracked in `schema_migrations`.
- Keep referential integrity, uniqueness, and allowed values in SQLite constraints; keep
  authorization, visibility, and status-transition rules in backend services.
- Store status values as English codes such as `PUBLISHED`; translate them to French only
  in the frontend presentation layer.
- The demo token is sent directly in `Authorization`, without a `Bearer` prefix. Demo
  authentication must remain disabled in production; configuration enforces this.
- Implement access control on the backend even when the frontend hides a control. Use the
  existing named permission helpers rather than duplicating role checks.
- When adding or changing an API route, update `backend/API.md` and the corresponding
  `backend/http/*.http` request example. Keep API errors in the shared
  `{ "error": { "code", "message" } }` format.
- Follow the existing cross-layer pattern used by the companies and offers features:
  controller, service, repository, model/mapper, API tests, then frontend service, hook,
  page/component, and interface tests as applicable.
- Use `seedIds.ts` for stable demo identities in backend tests rather than hard-coding
  unexplained database IDs.
- Keep the REST client examples and user-facing labels consistent with the French UI and
  API documentation.

The root [README.md](../README.md) contains setup, troubleshooting, and current
implementation status. The pull-request checklist in
[.github/pull_request_template.md](./pull_request_template.md) is part of the expected
change workflow.
