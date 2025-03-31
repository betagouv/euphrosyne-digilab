# Next.js Migration for Euphrosyne-DigiLab

This project has been migrated from Gatsby to Next.js, maintaining Static Site Generation (SSG) capabilities.

## Migration Structure

The migration follows the App Router structure in Next.js:

```
app/
├── [locale]/
│   ├── layout.tsx           # Layout component for all pages
│   ├── page.tsx             # Home page
│   ├── cart/
│   │   └── page.tsx         # Cart page
│   ├── catalog/
│   │   └── page.tsx         # Catalog page
│   ├── object/
│   │   └── [slug]/
│   │       └── page.tsx     # Object detail page
│   ├── project/
│   │   └── [slug]/
│   │       └── page.tsx     # Project detail page
│   └── legal/
│       └── [slug]/
│           └── page.tsx     # Legal pages
├── api/                     # API routes (if needed)
└── not-found.tsx            # 404 page
```

Data fetching now happens at build time using:
- `lib/opensearch.ts` - OpenSearch client and search functions
- `lib/data/index.ts` - Data fetching functions for pages

## Key Changes

1. **Routing**: Moved from Gatsby's page-based routing to Next.js App Router with locale-based routing
2. **Data Fetching**: Replaced GraphQL with direct data fetching in `getStaticProps`/`generateStaticParams`
3. **Component Structure**: Separated client and server components
4. **DSFR Integration**: Updated for Next.js App Router
5. **Static Generation**: Using `output: 'export'` in `next.config.js`

## Development and Building

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build static site
npm run build
# Output is in the 'out' directory

# Serve the static site
npx serve out -p 8002
```

## Remaining Migration Steps

1. Copy static assets from `public/` to Next.js `public/` directory
2. Update image handling to use Next.js Image component
3. Implement client-side data fetching hooks for search functionality
4. Complete remaining component migrations for cart and object/project detail pages

## Environment Variables

Create `.env.local` file with:

```
SITE_URL=
OPENSEARCH_CONNECTION_URL=
EROS_ENABLED=
EROS_API_TOKEN=
SENTRY_DSN=
```