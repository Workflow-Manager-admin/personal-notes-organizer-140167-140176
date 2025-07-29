# Environment Configuration for notes_frontend

This application does not *require* backend configuration (defaults to localStorage and demo authentication out-of-the-box).

If connecting to a real backend, configure relevant API URLs in `src/app/core/env.example.ts` (copy this to `env.ts` and fill in production values as needed):

```
export const environment = {
  production: false,
  API_BASE: 'https://your.backend/api'
};
```

You should also set the API base via env file during CI/deployment for actual backend integration.

For authentication (if using a third-party or real backend), see README for integration guidance and update `auth.service.ts` as necessary.

---

## Default Theme Colors

| Key   | Value    |
|-------|----------|
| primary | #1976d2 |
| secondary | #388e3c |
| accent | #ffca28 |

---

## Note

- By default, all configuration is in-browser/local for demo. For serious use, API endpoints and real authentication should be configured and connected in the core services.

