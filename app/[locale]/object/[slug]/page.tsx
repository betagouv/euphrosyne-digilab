import React from 'react';
import { notFound } from 'next/navigation';
import { getObjectBySlug, getAllObjectSlugs } from '../../../../lib/data';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// This is a server component that fetches data
export default async function ObjectPage({ params }: PageProps) {
  const object = await getObjectBySlug(params.slug);
  
  if (!object) {
    return notFound();
  }

  // In a real implementation, you'd pass this data to the client component
  // that renders your object page
  return (
    <div>
      <h1>{object.name}</h1>
      {/* Add your ObjectPage components here */}
    </div>
  );
}

// Pre-generate all object pages at build time
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