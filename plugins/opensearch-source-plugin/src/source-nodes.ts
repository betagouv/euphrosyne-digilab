import { Client } from "@opensearch-project/opensearch";
import type { GatsbyNode, NodeInput, SourceNodesArgs } from "gatsby";

import { IObjectGroupItem, IProjectItem } from "../../../types/ICatalog";
import type { SearchHit } from "../../../types/IOpenSearch";
import { NODE_TYPES } from "./constants";
import { parseObjectDocument, parseProjectDocument } from "./parsers";
import type { IPluginOptionsInternal, NodeBuilderInput } from "./types";

function formatLogMessage(message: string) {
  return `[opensearch-source-plugin] ${message}`;
}
export const sourceNodes: GatsbyNode[`sourceNodes`] = async (
  gatsbyApi,
  options: IPluginOptionsInternal,
) => {
  const { reporter } = gatsbyApi;

  reporter.info(formatLogMessage(`Connecting to host...`));
  const client = new Client({
    node: options.openSearch.host,
  });
  const countResponse = await client.count({ index: "catalog" });
  const documentCount = countResponse.body.count as number;

  reporter.info(formatLogMessage(`Found ${documentCount} documents`));

  const sourcingTimer = reporter.activityTimer(
    formatLogMessage(`Querying documents...`),
  );
  sourcingTimer.start();

  const pageSize = 1000;
  const pageCount = Math.ceil(documentCount / pageSize);
  for (let page = 0; page < pageCount; page++) {
    reporter.verbose(
      formatLogMessage(`Fetching page ${page + 1}/${pageCount} of documents`),
    );
    const searchResponse = await client.search({
      index: "catalog",
      body: {
        from: page * pageSize,
        size: pageSize,
        query: {
          match_all: {},
        },
      },
    });
    const documents: SearchHit[] = searchResponse.body.hits.hits;
    for (const document of documents) {
      let documentData: IProjectItem | IObjectGroupItem | null = null;
      if (document._source.category === "project") {
        documentData = parseProjectDocument(document._source);
        await nodeBuilder({
          gatsbyApi,
          input: { type: NODE_TYPES.Project, data: documentData },
        });
      } else if (document._source.category === "object") {
        documentData = parseObjectDocument(document._source);
        await nodeBuilder({
          gatsbyApi,
          input: { type: NODE_TYPES.ObjectGroup, data: documentData },
        });
      }
      if (documentData) {
        const { id, created, materials, name, pagePath } = documentData;
        const slug = `catalog-item-${documentData.id}`;
        const catalogItem = {
          id: `catalog-item-${documentData.id}`,
          slug,
          created,
          materials,
          name,
          pagePath,
          [documentData.category]: id,
          category: documentData.category,
        };
        await nodeBuilder({
          gatsbyApi,
          input: {
            type: NODE_TYPES.CatalogItem,
            data: catalogItem,
          },
        });
      }
    }
  }
  sourcingTimer.end();
};

interface INodeBuilderArgs {
  gatsbyApi: SourceNodesArgs;
  input: NodeBuilderInput;
}

export function nodeBuilder({ gatsbyApi, input }: INodeBuilderArgs) {
  const { reporter } = gatsbyApi;
  reporter.verbose(
    formatLogMessage(`Building node ${input.type} for ${input.data.slug}`),
  );
  const node = {
    ...input.data,
    id: input.data.id,
    parent: null,
    children: [],
    internal: {
      type: input.type,
      contentDigest: gatsbyApi.createContentDigest(input.data),
    },
  } satisfies NodeInput;

  return gatsbyApi.actions.createNode(node);
}
