import { ILeader, IObjectGroup, IProjectItem } from "./ICatalog";

export type ProjectStatus = "Status.FINISHED" | "Status.DATA_AVAILABLE";

export type Project = IProjectItem;
export type ObjectGroup = IObjectGroup;
export type Leader = ILeader;
