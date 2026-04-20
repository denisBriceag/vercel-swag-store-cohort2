# Vercel Swag Store

A Next.js e-commerce application submitted for Cohort 2 of the Vercel Solution Partner Certification Program.

## Running locally

### 1. Node.js version

This project requires Node.js 24. If you use [nvm](https://github.com/nvm-sh/nvm), the correct version is pinned in `.nvmrc`:

```bash
nvm use
```

Otherwise, install any Node.js 24.x release manually.

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Environment variables are managed through Vercel. Make sure you have the [Vercel CLI](https://vercel.com/docs/cli) installed, then:

```bash
vercel link --project vercel-swag-store-cohort2 --team team_7FKF8jBuiFFh9vZ3q0pDUgvs --yes
vercel env pull
```

`vercel link` connects your local repo to the Vercel project. `vercel env pull` pulls all variables into `.env.local`.

### 4. Start the dev server

```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).
