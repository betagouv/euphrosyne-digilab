# Migrating from Gatsby to Next.js (Static Site Generation)

This document outlines the steps required to migrate the Euphrosyne-DigiLab application from Gatsby to Next.js, keeping only the Static Site Generation (SSG) features.

## 1. Setup and Configuration

### 1.1 Initialize Next.js project

```bash
# Create next.config.js (if not already present)
touch next.config.js
```

### 1.2 Update dependencies in package.json

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "@codegouvfr/react-dsfr": "^1.9.28",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@opensearch-project/opensearch": "^2.8.0",
    "@sentry/nextjs": "^8.54.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-spring": "^9.7.3",
    "slugify": "^1.6.6"
  },
  "devDependencies": {
    "@trivago/prettier-plugin-sort-imports": "^4.3.0",
    "@types/node": "^20.14.11",
    "@types/react": "^18.2.14",
    "@types/react-dom": "^18.2.6",
    "@typescript-eslint/eslint-plugin": "^6.12.0",
    "@typescript-eslint/parser": "^6.12.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "^14.2.0",
    "prettier": "^3.0.3",
    "typescript": "^5.1.6"
  },
  "scripts": {
    "dev": "next dev -p 8002",
    "build": "next build",
    "start": "next start -p 8002",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### 1.3 Next.js Configuration

Create/update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Use Static Site Generation (SSG)
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for SSG export
  },
  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      // Add any URL rewrites needed for backward compatibility
    ];
  },
  // Add environment variables that were previously in gatsby-config.ts
  env: {
    SITE_URL: process.env.SITE_URL,
    OPENSEARCH_CONNECTION_URL: process.env.ELASTICSEARCH_CONNECTION_URL,
    EROS_ENABLED: process.env.EROS_ENABLED,
    EROS_API_TOKEN: process.env.EROS_API_TOKEN,
  },
};

module.exports = nextConfig;
```

## 2. Directory Structure Changes

### 2.1 Pages & Routing

Gatsby and Next.js have different routing patterns. Migrate the pages as follows:

| Gatsby Page | Next.js Page |
|-------------|-------------|
| src/pages/index.tsx | app/[locale]/page.tsx |
| src/pages/catalog.tsx | app/[locale]/catalog/page.tsx |
| src/pages/cart.tsx | app/[locale]/cart/page.tsx |
| src/pages/404.tsx | app/not-found.tsx |
| src/pages/legal/{markdownRemark.frontmatter__slug}.tsx | app/[locale]/legal/[slug]/page.tsx |
| src/pages/object/{ObjectGroup.slug}.tsx | app/[locale]/object/[slug]/page.tsx |
| src/pages/project/{Project.slug}.tsx | app/[locale]/project/[slug]/page.tsx |

### 2.2 Directory Structure

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

## 3. Data Fetching

### 3.1 Replace GraphQL with getStaticProps and getStaticPaths

Next.js uses different methods for data fetching in SSG mode:

#### 3.1.1 Data fetching for static pages (Home, Catalog, etc.)

For pages like `app/[locale]/page.tsx` (former index.tsx):

```typescript
import { getHomePageData } from '@/lib/data';

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
  ];
}

async function HomePage({ params }: { params: { locale: string } }) {
  const { projects, stats } = await getHomePageData();
  
  return (
    <>
      {/* Components */}
    </>
  );
}

export default HomePage;
```

#### 3.1.2 Dynamic routes (Object, Project, Legal)

For pages like `app/[locale]/object/[slug]/page.tsx`:

```typescript
import { getAllObjectSlugs, getObjectBySlug } from '@/lib/data';

export async function generateStaticParams() {
  const slugs = await getAllObjectSlugs();
  const locales = ['en', 'fr'];
  
  return slugs.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug
    }))
  );
}

async function ObjectPage({ params }: { params: { locale: string, slug: string } }) {
  const object = await getObjectBySlug(params.slug);
  
  return (
    // Component rendering
  );
}

export default ObjectPage;
```

### 3.2 Create OpenSearch Client

Create `lib/opensearch.ts`:

```typescript
import { Client } from '@opensearch-project/opensearch';

export const client = new Client({
  node: process.env.OPENSEARCH_CONNECTION_URL,
});

export async function searchCatalog(filters) {
  // Implement search functionality similar to src/clients/search.ts
}

// Add parsing functions similar to plugins/opensearch-source-plugin/src/parsers.ts
export function parseObjectDocument(source) {
  // ...
}

export function parseProjectDocument(source) {
  // ...
}
```

## 4. Metadata and Head

Replace Gatsby's `<Head>` component with Next.js metadata:

```typescript
// app/[locale]/layout.tsx
export const metadata = {
  title: 'Catalogue des données de New AGLAE',
  description: 'euphrosyne-digilab',
  icons: {
    icon: '/dsfr/favicon/favicon.svg',
    apple: '/dsfr/favicon/apple-touch-icon.png',
    shortcut: '/dsfr/favicon/favicon.ico',
  },
};
```

## 5. Component Modifications

### 5.1 Replace Gatsby-specific imports

```typescript
// FROM:
import { Link } from 'gatsby';
// TO:
import Link from 'next/link';

// FROM:
import { StaticImage } from 'gatsby-plugin-image';
// TO:
import Image from 'next/image';
```

### 5.2 Update Context Providers

Update the context providers in `app/[locale]/layout.tsx`:

```typescript
export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const [items, setItems] = useState<ICart['items']>();
  const [currentProject, setCurrentProject] = useState(null);
  const translations = useTranslations(params.locale as Lang);

  return (
    <html lang={params.locale}>
      <body>
        <DsfrProvider lang={params.locale}>
          <LangContext.Provider value={{ translations }}>
            <PageContext.Provider value={{ currentProject, setCurrentProject }}>
              <CartContext.Provider value={createCart(items, setItems)}>
                <EuphrosyneHeader currentPath={/* derive from usePathname() */} content={translations.layoutContent.header} />
                <main>{children}</main>
                <Footer />
              </CartContext.Provider>
            </PageContext.Provider>
          </LangContext.Provider>
        </DsfrProvider>
      </body>
    </html>
  );
}
```

### 5.3 Client-Side Components

Some components that rely on browser-specific APIs need to be client components:

```typescript
'use client';

// Component code here
```

## 6. Custom Plugin Migration

### 6.1 Migrate OpenSearch Source Plugin

Create a data fetching library to replace the functionality of the custom Gatsby plugin:

- Create `lib/data/index.ts` for data access functions
- Implement `getAllProjects()`, `getAllObjects()`, etc.
- Use these functions in `getStaticProps` for each page

Example implementation:

```typescript
// lib/data/index.ts
import { client, parseObjectDocument, parseProjectDocument } from '../opensearch';

export async function getAllCatalogItems() {
  const response = await client.search({
    index: 'catalog',
    body: {
      size: 10000,
      query: {
        match_all: {},
      },
    },
  });
  
  const documents = response.body.hits.hits;
  const items = [];
  
  for (const document of documents) {
    let documentData = null;
    if (document._source.category === 'project') {
      documentData = parseProjectDocument(document._source);
    } else if (document._source.category === 'object') {
      documentData = parseObjectDocument(document._source);
    }
    
    if (documentData) {
      items.push({
        id: `catalog-item-${documentData.id}`,
        slug: `catalog-item-${documentData.id}`,
        created: documentData.created,
        materials: documentData.materials,
        name: documentData.name,
        pagePath: documentData.pagePath,
        category: documentData.category,
        [documentData.category]: documentData,
      });
    }
  }
  
  return items;
}

// Additional data fetching functions
```

## 7. Static Assets

### 7.1 Public Directory

Move static assets from Gatsby's `static/` and `public/` to Next.js `public/` directory:

```bash
mkdir -p public/dsfr
cp -r public/dsfr public/
```

### 7.2 Image Handling

Replace Gatsby image components with Next.js Image:

```typescript
// FROM:
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
const image = getImage(data.file);
<GatsbyImage image={image} alt="description" />;

// TO:
import Image from 'next/image';
<Image 
  src={imageUrl} 
  alt="description"
  width={600}
  height={400}
  unoptimized
/>;
```

## 8. Sentry Integration

Replace Gatsby Sentry with Next.js Sentry:

```bash
npm install @sentry/nextjs
```

Create `sentry.client.config.ts` and `sentry.server.config.ts`:

```typescript
// sentry.client.config.ts and sentry.server.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 0.2,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
});
```

## 9. DSFR Integration

Update the DSFR integration for Next.js:

```typescript
// app/StartDsfr.tsx
'use client';

import { startReactDsfr } from '@codegouvfr/react-dsfr/next-appdir/StartDsfr';

declare module '@codegouvfr/react-dsfr/next-appdir/StartDsfr' {
  interface RegisterLink {
    href: string;
  }
}

startReactDsfr({
  defaultColorScheme: 'light',
});

export default function StartDsfr() {
  return null;
}
```

## 10. I18n and Translations

### 10.1 Set up i18n routing

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const LOCALE_COOKIE = 'NEXT_LOCALE';
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  // Skip for public files like images, fonts, etc
  if (PUBLIC_FILE.test(request.nextUrl.pathname)) {
    return;
  }

  // Get locale from cookie or default to 'en'
  const locale = request.cookies.get(LOCALE_COOKIE)?.value || 'en';
  
  // If pathname doesn't start with locale, redirect
  if (
    !request.nextUrl.pathname.startsWith('/en') &&
    !request.nextUrl.pathname.startsWith('/fr')
  ) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
```

### 10.2 Update translation hooks

```typescript
// hooks/useTranslations.ts
import { useCallback } from 'react';
import { en } from '@/locales/en';
import { fr } from '@/locales/fr';

export default function useTranslations(locale: 'en' | 'fr') {
  const translations = locale === 'fr' ? fr : en;

  return {
    translations,
    t: useCallback(
      (key: string) => {
        // Implement dot-notation accessor
        return key.split('.').reduce((o, i) => o[i], translations as any);
      },
      [translations]
    ),
  };
}
```

## 11. Testing and Deployment

### 11.1 Update build script and export

```bash
npm run build
```

This will generate static HTML in the `out/` directory.

### 11.2 Serve the static site

You can serve the static site using any web server:

```bash
npx serve out -p 8002
```

### 11.3 Update deployment pipeline

If you're using CI/CD, update your deployment scripts to use Next.js export instead of Gatsby build.

## 12. Cleanup

Remove Gatsby-specific files and dependencies:

- `gatsby-config.ts`
- `gatsby-node.ts`
- The Gatsby plugin directory

## Final Notes

1. OpenSearch data fetching will now happen at build time using Next.js `getStaticProps`
2. For client-side search, create React context or hooks that load data at build time
3. The migration preserves the SSG-only approach while leveraging Next.js modern features
4. SSG in Next.js requires the `output: 'export'` configuration and has some limitations:
   - No API routes (serverless functions)
   - No middleware at runtime
   - Limited image optimization (use `unoptimized: true`)