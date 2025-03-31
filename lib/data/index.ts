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

export async function getHomePageData() {
  // Get projects for homepage
  const projectsResponse = await client.search({
    index: 'catalog',
    body: {
      size: 6,
      query: {
        term: {
          category: 'project',
        },
      },
      sort: [{ created: { order: 'desc' } }],
    },
  });

  const projects = projectsResponse.body.hits.hits.map((doc: any) => 
    parseProjectDocument(doc._source)
  );

  // Get stats - you'll need to implement this based on your Gatsby data structure
  // For now returning a placeholder
  const stats = {
    all: {
      totalProjects: 0,
      totalObjectGroups: 0,
      totalHours: 0,
    },
    year: {
      totalProjects: 0,
      totalObjectGroups: 0,
      totalHours: 0,
    },
  };

  // Ideally, you would fetch real stats here
  // Count projects
  const projectsCount = await client.count({
    index: 'catalog',
    body: {
      query: {
        term: {
          category: 'project',
        },
      },
    },
  });

  // Count objects
  const objectsCount = await client.count({
    index: 'catalog',
    body: {
      query: {
        term: {
          category: 'object',
        },
      },
    },
  });

  stats.all.totalProjects = projectsCount.body.count;
  stats.all.totalObjectGroups = objectsCount.body.count;

  return { projects, stats };
}

export async function getAllProjectSlugs() {
  const response = await client.search({
    index: 'catalog',
    body: {
      size: 1000,
      _source: ['slug'],
      query: {
        term: {
          category: 'project',
        },
      },
    },
  });

  return response.body.hits.hits.map((doc: any) => doc._source.slug);
}

export async function getAllObjectSlugs() {
  const response = await client.search({
    index: 'catalog',
    body: {
      size: 1000,
      _source: ['slug'],
      query: {
        term: {
          category: 'object',
        },
      },
    },
  });

  return response.body.hits.hits.map((doc: any) => doc._source.slug);
}

export async function getProjectBySlug(slug: string) {
  const response = await client.search({
    index: 'catalog',
    body: {
      query: {
        bool: {
          must: [
            { term: { category: 'project' } },
            { term: { slug: slug } },
          ],
        },
      },
    },
  });

  if (response.body.hits.total.value === 0) {
    return null;
  }

  return parseProjectDocument(response.body.hits.hits[0]._source);
}

export async function getObjectBySlug(slug: string) {
  const response = await client.search({
    index: 'catalog',
    body: {
      query: {
        bool: {
          must: [
            { term: { category: 'object' } },
            { term: { slug: slug } },
          ],
        },
      },
    },
  });

  if (response.body.hits.total.value === 0) {
    return null;
  }

  return parseObjectDocument(response.body.hits.hits[0]._source);
}

export async function getLegalPageBySlug(slug: string) {
  // This would typically fetch markdown content
  // For the migration, you'll need to implement this to match your Gatsby data source
  // This is a placeholder implementation
  return {
    frontmatter: {
      title: 'Legal Page',
      slug: slug,
    },
    html: '<p>Legal content placeholder</p>',
  };
}
