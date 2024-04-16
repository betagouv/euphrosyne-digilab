import { PageBadgesContent } from "../components/PageBadges";
import { ProjectCardContent } from "../components/ProjectCard";
import { ProjectStatusBadgeContent } from "../components/ProjectStatusBadge";
import { ProjectDataContent } from "../components/project/ProjectData";

export const translations = {
  project: "Project",
  objectGroup: "Object group",

  inventory: "Inventory",
  period: "Period",
  geographicArea: "Geographic area",
  materials: "Materials",
};
export const erosLinkText = "Eros object page";

export const projectDataContent: ProjectDataContent = {
  addToCart: "Add data to cart",
  runCard: {
    date: "Date",
    projectLeader: "Project leader",
    experimentalCondition: "Experimental conditions",
    methods: "Methods",
  },
};

const projectStatusBadge: ProjectStatusBadgeContent = {
  upcoming: "Upcoming",
  dataAvailable: "Data available",
};

export const pageBadges: PageBadgesContent = {
  project: translations.project,
  objectGroup: translations.objectGroup,
  projectStatusBadge,
};

export const projectCard: ProjectCardContent = {
  project: translations.project,
  objectGroup: translations.objectGroup,
  projectImage: "Image of project {}",
  projectStatusBadge,
};
