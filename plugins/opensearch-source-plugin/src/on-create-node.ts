import { CreateNodeArgs, GatsbyNode } from "gatsby";
import { FileSystemNode, createRemoteFileNode } from "gatsby-source-filesystem";

import { IThumbnail } from "../../../types/ICatalog";
import { NODE_TYPES } from "./constants";
import { getImagesForObject } from "./eros/image";
import type { IPluginOptionsInternal } from "./types";

export const onCreateNode: GatsbyNode[`onCreateNode`] = async (
  args: CreateNodeArgs<Record<string, unknown>>,
  options: IPluginOptionsInternal,
) => {
  const {
      node,
      actions,
      reporter,
      createNodeId,
      getCache,
      createContentDigest,
    } = args,
    { createNodeField, createNode } = actions;
  // From https://www.gatsbyjs.com/docs/how-to/images-and-media/preprocessing-external-images/

  if (
    ([NODE_TYPES.ObjectGroup, NODE_TYPES.Project] as string[]).includes(
      node.internal.type,
    ) &&
    node.thumbnail
  ) {
    const fileNode = await createRemoteFileNode({
      url: (node.thumbnail as IThumbnail).url as string, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      getCache,
    });

    // if the file was created, extend the node with "localFile"
    if (fileNode) {
      createNodeField({ node, name: "localThumbnail", value: fileNode.id });
    }
  }

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
    const objectImages = await getImagesForObject(
      c2rmfId,
      options.eros.apiToken,
    );
    if (objectImages && objectImages.length > 0) {
      reporter.verbose(`Fetching image URL for object ${c2rmfId}`);
      let fileNode: Awaited<
        ReturnType<typeof createRemoteImageNodeWithAttempts>
      > = null;
      try {
        fileNode = await createRemoteImageNodeWithAttempts(
          objectImages,
          args,
          true,
        );
      } catch (error) {
        reporter.error(
          `Failed to create localErosImage field for object ${slug} and image URL ${objectImages}. Skipping.`,
        );
      }
      if (fileNode) {
        const nodeId = createNodeId(`objectgroup-${slug}-localErosImage`);
        const { url, copyright } = fileNode.image;
        createNode({
          url,
          copyright,
          localImage: fileNode.node,
          id: nodeId,
          parent: node.id,
          internal: {
            type: NODE_TYPES.ErosImage,
            contentDigest: createContentDigest(url),
          },
        });
        createNodeField({ node, name: "erosImage", value: nodeId });
      }
    }
  }
};

async function createRemoteImageNodeWithAttempts(
  images: IThumbnail[],
  args: CreateNodeArgs<Record<string, unknown>>,
  tryNext = false,
): Promise<{ image: IThumbnail; node: FileSystemNode } | null> {
  const url = images[0].url;
  const { node, actions, createNodeId, getCache, reporter } = args,
    { createNode } = actions;
  try {
    return {
      node: await createRemoteFileNode({
        url,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      }),
      image: images[0],
    };
  } catch (error) {
    if (tryNext && images.length > 1) {
      reporter.error(
        `Failed to create localErosImage field for object. Image URL ${url}. Trying next URL.`,
      );
      return createRemoteImageNodeWithAttempts(images.slice(1), args, false);
    } else {
      reporter.error(
        `Failed to create localErosImage field for object. Image URL ${url}. Skipping.`,
      );
      return null;
    }
  }
}
