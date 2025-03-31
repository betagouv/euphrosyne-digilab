import React from 'react';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjectSlugs } from '../../../../lib/data';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// This is a server component that fetches data
export default async function ProjectPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return notFound();
  }

  // In a real implementation, you'd pass this data to the client component
  // that renders your project page
  return (
    <div>
      <h1>{project.name}</h1>
      {/* Add your ProjectPage components here */}
    </div>
  );
}

// Pre-generate all project pages at build time
export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  const locales = ['en', 'fr'];
  
  return slugs.flatMap(slug => 
    locales.map(locale => ({
      locale,
      slug
    }))
  );
}