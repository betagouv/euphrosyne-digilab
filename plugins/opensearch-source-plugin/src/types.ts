import type {
  PluginOptions as GatsbyDefaultPluginOptions,
  IPluginRefOptions,
} from "gatsby";

import {
  ICatalogItem,
  IObjectGroupItem,
  IProjectItem,
} from "../../../types/ICatalog";
import { NODE_TYPES } from "./constants";

export type NodeBuilderInput =
  | { type: typeof NODE_TYPES.Project; data: IProjectItem }
  | { type: typeof NODE_TYPES.ObjectGroup; data: IObjectGroupItem }
  | { type: typeof NODE_TYPES.CatalogItem; data: ICatalogItem };

interface IPluginOptionsKeys {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  openSearch: {
    host: string;
  };
  eros: {
    enabled: boolean;
    apiToken: string;
  };
}

/**
 * Gatsby expects the plugin options to be of type "PluginOptions" for gatsby-node APIs (e.g. sourceNodes)
 */
export interface IPluginOptionsInternal
  extends IPluginOptionsKeys,
    GatsbyDefaultPluginOptions {}

/**
 * These are the public TypeScript types for consumption in gatsby-config
 */
export interface IPluginOptions extends IPluginOptionsKeys, IPluginRefOptions {}
