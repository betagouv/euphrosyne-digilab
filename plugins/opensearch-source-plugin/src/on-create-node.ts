import { CreateNodeArgs, GatsbyNode } from "gatsby";
import { FileSystemNode, createRemoteFileNode } from "gatsby-source-filesystem";

import { NODE_TYPES } from "./constants";
import { getImageURLForObject } from "./eros/image";
import type { IPluginOptionsInternal } from "./types";

export const onCreateNode: GatsbyNode[`onCreateNode`] = async (
  args: CreateNodeArgs<Record<string, unknown>>,
  options: IPluginOptionsInternal,
) => {
  const { node, actions, reporter } = args,
    { createNodeField } = actions;
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
    const objectImageUrls = await getImageURLForObject(
      c2rmfId,
      options.eros.apiToken,
    );
    if (objectImageUrls && objectImageUrls.length > 0) {
      reporter.verbose(`Fetching image URL for object ${c2rmfId}`);
      let fileNode: FileSystemNode | null = null;
      try {
        fileNode = await createRemoteImageNodeWithAttempts(
          objectImageUrls,
          args,
          true,
        );
      } catch (error) {
        reporter.error(
          `Failed to create localErosImage field for object ${slug} and image URL ${objectImageUrls}. Skipping.`,
        );
      }
      if (fileNode) {
        createNodeField({ node, name: "localErosImage", value: fileNode.id });
      }
    }
  }
};

async function createRemoteImageNodeWithAttempts(
  urls: string[],
  args: CreateNodeArgs<Record<string, unknown>>,
  tryNext = false,
) {
  const url = urls[0];
  const { node, actions, createNodeId, getCache, reporter } = args,
    { createNode } = actions;
  try {
    return await createRemoteFileNode({
      url,
      parentNodeId: node.id,
      createNode,
      createNodeId,
      getCache,
    });
  } catch (error) {
    if (tryNext && urls.length > 1) {
      reporter.error(
        `Failed to create localErosImage field for object. Image URL ${url}. Trying next URL.`,
      );
      return createRemoteImageNodeWithAttempts(urls.slice(1), args, false);
    } else {
      reporter.error(
        `Failed to create localErosImage field for object. Image URL ${url}. Skipping.`,
      );
      return null;
    }
  }
}
