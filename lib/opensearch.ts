import { Client } from '@opensearch-project/opensearch';

export const client = new Client({
  node: process.env.OPENSEARCH_CONNECTION_URL,
});

// These should be refactored to use types from your existing files
export async function searchCatalog(filters: any) {
  const {
    q,
    from,
    size,
    category,
    collection,
    inventory,
    materials,
    dating_era_ids,
    dating_period_ids,
    location,
    created_from,
    created_to,
    is_data_available,
    sort,
  } = filters;

  const must: any[] = [];
  const filter: any[] = [];

  if (q) {
    must.push({
      multi_match: {
        query: q,
        fields: ['name^3', 'comments', 'materials', 'id', 'inventory'],
        fuzziness: 'AUTO',
      },
    });
  }

  if (category) {
    filter.push({
      term: {
        category,
      },
    });
  }

  if (collection) {
    filter.push({
      term: {
        collection,
      },
    });
  }

  if (inventory) {
    filter.push({
      match: {
        inventory,
      },
    });
  }

  if (materials && materials.length > 0) {
    filter.push({
      terms: {
        materials,
      },
    });
  }

  if (dating_era_ids && dating_era_ids.length > 0) {
    filter.push({
      terms: {
        'dating.era_ids': dating_era_ids,
      },
    });
  }

  if (dating_period_ids && dating_period_ids.length > 0) {
    filter.push({
      terms: {
        'dating.period_ids': dating_period_ids,
      },
    });
  }

  if (location?.top_left && location?.bottom_right) {
    filter.push({
      geo_bounding_box: {
        'discoveryPlace.location': {
          top_left: location.top_left,
          bottom_right: location.bottom_right,
        },
      },
    });
  }

  if (created_from || created_to) {
    const range: any = {};
    if (created_from) range.gte = created_from;
    if (created_to) range.lte = created_to;
    filter.push({
      range: {
        created: range,
      },
    });
  }

  if (is_data_available !== undefined) {
    filter.push({
      term: {
        isDataAvailable: is_data_available,
      },
    });
  }

  const query: any = {
    bool: {},
  };

  if (must.length > 0) query.bool.must = must;
  if (filter.length > 0) query.bool.filter = filter;

  const body: any = {
    from: from || 0,
    size: size || 10,
    query,
  };

  if (sort) {
    const sortField = sort === 'created_asc' ? 'created' : 'created';
    const sortOrder = sort === 'created_asc' ? 'asc' : 'desc';
    body.sort = [{ [sortField]: { order: sortOrder } }];
  }

  try {
    const response = await client.search({
      index: 'catalog',
      body,
    });
    
    return response.body;
  } catch (error) {
    console.error('Error searching catalog:', error);
    throw error;
  }
}

// Copy parsing functions from your existing code
export function parseObjectDocument(source: any) {
  // This should match your existing parsers
  const object = {
    id: source.id,
    name: source.name,
    pagePath: source.pagePath,
    materials: source.materials || [],
    category: 'object',
    slug: source.slug,
    created: new Date(source.created),
    c2rmfId: source.c2rmfId,
    thumbnail: source.thumbnail,
  };
  
  return object;
}

export function parseProjectDocument(source: any) {
  // This should match your existing parsers
  const project = {
    id: source.id,
    name: source.name,
    pagePath: source.pagePath,
    materials: source.materials || [],
    category: 'project',  
    slug: source.slug,
    created: new Date(source.created),
    comments: source.comments,
    thumbnail: source.thumbnail,
  };
  
  return project;
}
