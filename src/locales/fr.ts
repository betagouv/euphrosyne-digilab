import { PageBadgesContent } from "../components/PageBadges";
import { ProjectCardContent } from "../components/ProjectCard";
import { ProjectStatusBadgeContent } from "../components/ProjectStatusBadge";
import { ProjectDataContent } from "../components/project/ProjectData";

export const translations = {
  project: "Projet",
  objectGroup: "Groupe d'objets",

  inventory: "Inventaire",
  period: "Époque",
  geographicArea: "Aire géographique",
  materials: "Matériaux",
};
export const erosLinkText = "Fiche objet Eros";

export const projectDataContent: ProjectDataContent = {
  addToCart: "Ajouter les données au panier",
  runCard: {
    date: "Date",
    projectLeader: "Chef de projet",
    experimentalCondition: "Conditions expérimentales",
    methods: "Méthodes",
  },
};

const projectStatusBadge: ProjectStatusBadgeContent = {
  upcoming: "À venir",
  dataAvailable: "Données disponibles",
};

export const pageBadges: PageBadgesContent = {
  project: translations.project,
  objectGroup: translations.objectGroup,
  projectStatusBadge,
};

export const projectCard: ProjectCardContent = {
  project: translations.project,
  objectGroup: translations.objectGroup,
  projectImage: "Image du projet {}",
  projectStatusBadge,
};
