import { GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";

import { NODE_TYPES } from "./constants";
import { getImageURLForObject } from "./eros/image";
import type { IPluginOptionsInternal } from "./types";

export const onCreateNode: GatsbyNode[`onCreateNode`] = async (
  {
    node,
    actions: { createNode, createNodeField },
    createNodeId,
    getCache,
    reporter,
  },
  options: IPluginOptionsInternal,
) => {
  // From https://www.gatsbyjs.com/docs/how-to/images-and-media/preprocessing-external-images/
  if (
    options.eros.enabled &&
    node.internal.type === NODE_TYPES.ObjectGroup &&
    node.c2rmfId !== null
  ) {
    const c2rmfId = node.c2rmfId as string,
      slug = node.slug as string;
    // Fetch image from EROS API
    if (!options.eros.apiToken) {
      reporter.warn(
        `No EROS API token provided. Skipping fetching image for object ${slug}`,
      );
      return;
    }
    reporter.verbose(`Trying to get image URL for C2RMF ID ${c2rmfId}`);
    const objectImageUrl = await getImageURLForObject(
      c2rmfId,
      options.eros.apiToken,
    );
    if (objectImageUrl) {
      reporter.verbose(`Fetching image URL for object ${c2rmfId}`);
      const fileNode = await createRemoteFileNode({
        url: objectImageUrl,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      });
      if (fileNode) {
        createNodeField({ node, name: "localErosImage", value: fileNode.id });
      }
    }
  }
};
