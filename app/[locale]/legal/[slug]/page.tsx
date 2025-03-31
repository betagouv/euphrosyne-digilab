import React from 'react';
import { notFound } from 'next/navigation';
import { getLegalPageBySlug } from '../../../../lib/data';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// This is a server component that fetches data
export default async function LegalPage({ params }: PageProps) {
  const legalPage = await getLegalPageBySlug(params.slug);
  
  if (!legalPage) {
    return notFound();
  }

  // In a real implementation, you'd pass this data to a client component
  // This would render the HTML content from the markdown
  return (
    <div>
      <h1>{legalPage.frontmatter.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: legalPage.html }} />
    </div>
  );
}

// Pre-generate legal pages at build time
export async function generateStaticParams() {
  // In a real implementation, you'd get these slugs from your data source
  const slugs = ['cgu', 'mentions-legales', 'donnees-personnelles', 'legal-notices', 'personal-data'];
  const locales = ['en', 'fr'];
  
  return slugs.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug
    }))
  );
}