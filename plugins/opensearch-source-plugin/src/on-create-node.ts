import { CreateNodeArgs, GatsbyNode } from "gatsby";
import { createRemoteFileNode } from "gatsby-source-filesystem";

import { IThumbnail } from "../../../types/ICatalog";
import { NODE_TYPES } from "./constants";

export const onCreateNode: GatsbyNode[`onCreateNode`] = async (
  args: CreateNodeArgs<Record<string, unknown>>,
) => {
  const { node, actions, createNodeId, getCache } = args,
    { createNodeField, createNode } = actions;
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
};
