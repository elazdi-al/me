# elazdi.com

Personal site of Ali El Azdi. Next.js exports it as static files, and a Cloudflare Worker serves those files as static assets at https://elazdi.com. The site has no server code, API routes, or secrets.

All page content is in `app/data.ts`.

## Develop

```sh
bun install
bun run dev
```

## Build

```sh
bun run build
```

The build writes the static site to `out/`.

## Preview

```sh
bun run preview
```

This builds the site and serves `out/` with `wrangler dev` at http://localhost:8787, with the same asset routing as production.

## Deploy

1. Log in with the Cloudflare account that owns the `elazdi.com` zone:

   ```sh
   bunx wrangler login
   ```

   Wrangler uses `CLOUDFLARE_API_TOKEN` before the login. If your shell exports a token for another account, unset it for these commands.

2. Build and deploy:

   ```sh
   bun run deploy
   ```

   `wrangler.jsonc` deploys the Worker `elazdi` and attaches the custom domains `elazdi.com` and `www.elazdi.com`. Cloudflare creates the DNS records and certificates on the first deploy.

3. Redirect `www` to the apex once. A Custom Domain matches one exact hostname, so the redirect is a zone rule, not Worker config. In the dashboard, open the `elazdi.com` zone, go to **Rules** > **Redirect Rules**, and create a rule from the **Redirect from WWW to root** template:

   - Request URL: `https://www.*`
   - Target URL: `https://${1}`
   - Status code: 301
   - Preserve query string: on

   Until the rule exists, `www.elazdi.com` serves the same site as the apex.
