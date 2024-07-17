import { CartButtonContent } from "../cart/CartButton";
import { CartSubmitFormContent } from "../cart/CartSubmitForm";
import { CartTableContent } from "../cart/CartTable";
import { DataAddedAlertContent } from "../cart/DataAddedAlert";
import type { PageBadgesContent } from "../components/PageBadges";
import type { ProjectCardContent } from "../components/ProjectCard";
import type { ProjectStatusBadgeContent } from "../components/ProjectStatusBadge";
import type { ProjectDataContent } from "../components/project/ProjectData";
import { RunCardContent } from "../components/run/RunCard";
import type { LayoutContentProps } from "../layouts";
import type { IndexPageContent } from "../pages";
import { NotFoundPageContent } from "../pages/404";
import { CartContent } from "../pages/cart";
import type { CatalogContent } from "../pages/catalog";
import type { ObjectTemplateContent } from "../pages/object/{ObjectGroup.slug}";
import type { ProjectTemplateContent } from "../pages/project/{Project.slug}";

export const translations = {
  project: "Projet",
  object: "Objet",
  objectGroup: "Groupe d'objets",

  inventory: "Numéro d'inventaire",
  period: "Période",
  era: "Époque",
  geographicArea: "Aire géographique",
  materials: "Matériaux",

  error: "Erreur",
};
export const erosLinkText = "Fiche objet Eros";

const layoutContent: LayoutContentProps = {
  header: {
    homeLinkTitle: "Accueil - Catalogue des données de NewAglae",
    euphrosyneLinkTitle: "Accéder à Euphrosyne",
    homeLinkLabel: "Accueil",
    catalogLinkLabel: "Catalogue",
    serviceTitle: "Catalogue des données de NewAglae",
    languageSwitcher: {
      selectLangBtnTitle: "Changer de langue",
    },
  },
};

export const projectDataContent: ProjectDataContent = {
  addToCart: "Ajouter les données au panier",
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

const indexPageContent: IndexPageContent = {
  hero: {
    title: "Les données produites par NewAglae accessibles en ligne",
    description: `Euphrosyne est la plateforme numérique liée à NewAglae, 
    l'Accélérateur Grand Louvre d'Analyse Elémentaire dédié aux sciences
    du patrimoine. Elle permet la collecte et la diffusion des données
    ainsi que, pour les utilisateurs de NewAglae, l'accès à distance aux
    logiciels de traitement des analyses par faisceau d'ions acquises
    sur NewAglae. Le catalogue des données de NewAglae vous aide a
    chercher des données scientifiques par mots-clefs (matériaux, date,
    aire géographique, etc.) afin de répondre au mieux à vos besoins de
    recherche.`,
  },
  search: {
    title: {
      highlight: "Parcourez",
      rest: "notre catalogue de données Euphrosyne",
    },
  },
  howItWorks: {
    title: "Les services d'Euphrosyne",
    catalogText:
      "Un catalogue référençant les jeux de données produits par NewAglae depuis le 01/04/2022.",
    euphrosyneText:
      "Une plateforme numérique permettant aux utilisateurs de NewAglae de préparer leurs expériences.",
    workplaceText:
      "Un bureau virtuel pour que les utilisateurs de NewAglae puissent traiter et récupérer leurs données à distance.",
  },
  about: {
    title: "À propos",
    newAglae: "NewAglae, Accélérateur Grand Louvre d'analyse élémentaire",
    description: `AGLAE, acronyme pour "Accélérateur Grand Louvre d'Analyse
    Élémentaire," est un grand instrument unique, situé au sein même
    du Palais du Louvre. Depuis son installation en 1988, AGLAE est le
    seul accélérateur de particules au monde dédié aux sciences du
    patrimoine, utilisant des techniques avancées pour décrypter les
    secrets enfouis dans les œuvres d'art. Lauréat de l'Investissement
    d'Avenir de l'Agence Nationale de la Recherche (ANR-10-EQPX-22),
    AGLAE est devenu NewAglae en 2017. Complètement automatisée, la
    ligne de faisceau est dorénavant susceptible de fonctionner
    24h/24.`,
    moreInfo: "En savoir plus",
    img1Alt: "Statuette du trésor des bronzes de Bavay analysée par New AGLAÉ.",
    img2Alt: "Objet analysé par New AGLAÉ.",
  },
  figure: {
    title: "Les chiffres clefs de NewAglae",
    analyzedProjectsLabel: "projets d'analyse menés",
    analyzedObjectsLabel: "objets analysés",
    hoursLabel: "heures",
    sinceYear: "Depuis {}",
    inYear: "En {}",
  },
  projectList: {
    title: "Les dernières recherches Euphrosyne",
    projectCard,
  },
};

const catalogContent: CatalogContent = {
  noData: "Aucun résultat pour ces critères de recherche.",
  numResult: "{} résultat",
  numResultPlural: "{} résultats",

  searchBar: {
    title: "Parcourez le catalogue de données Euphrosyne",
  },

  filterContainer: {
    filterResults: "Filtrer les résultats",
    filter: "Filtrer",
  },

  catalogFilters: {
    project: "Projet",
    objectGroup: "Groupe d'objets",
    itemType: "Type d 'item",
    materials: translations.materials,
    inventory: translations.inventory,
    collection: "Collection",
    discoveryPlaceFilter: {
      discoveryPlace: "Lieu de découverte",
    },
    periodFilter: {
      period: translations.period,
    },
    createdRange: {
      label: "Année du projet",
    },
    dataAvailableSwitch: {
      label: "Données disponibles",
      status: "Statut des données",
    },
    datingFilters: {
      period: translations.period,
      era: translations.era,
    },
  },

  sortSelect: {
    mostDated: "Plus anciens",
    mostRecent: "Plus récents",
    sorting: "Tri",
    relevance: "Pertinence",
  },

  pagination: {
    firstPage: "Première page",
    previousPage: "Page précédente",
    nextPage: "Page suivante",
    lastPage: "Dernière page",
  },
};

const objectPageContent: ObjectTemplateContent = {
  catalog: "Catalogue",
  projectWithName: "Projet {}",
  altImageWithObjectName: "Image de l'objet {}",
  noProject: "Aucun projet",
  objectData: "Données de l'objet",
  project: "Projet",
  viewProject: "Voir le projet",

  objectGroupDescription: {
    inventory: translations.inventory,
    period: translations.period,
    era: translations.era,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
    erosLinkText,

    pageBadges,
  },
  projectDataContent,
};

const projectPageContent: ProjectTemplateContent = {
  catalog: "Catalogue",
  projectData: "Données du projet",

  projectDataContent,
  projectDescription: {
    pageBadges: pageBadges,
    noDescription: "Pas de description pour ce projet.",
  },
  projectObjects: {
    projectObjects: "Objets du projet",
    noObjects: "Ce projet n'a pas d'objet enregistré.",
    seeObjectDetails: "Voir le détail de l'objet",
    seeMore: "Voir plus d'objets liés ({} restants) +",
    seeLess: "Voir moins -",
    erosLinkText,
    inventory: translations.inventory,
    period: translations.period,
    era: translations.era,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
  },
};

const cartButton: CartButtonContent = {
  title: "Panier",
};

const cartTable: CartTableContent = {
  headerRunName: "Nom du run",
  headerFromType: "Provenance : type",
  headerFromPage: "Provenance : page",
  headerDelete: "Supprimer",
  viewFromPage: "Voir la page",
  noData: "Votre sélection est vide.",
};

const cartSubmitForm: CartSubmitFormContent = {
  email: "Adresse électronique",
  firstName: "Prénom",
  lastName: "Nom",
  description: "Description",
  descriptionHint:
    "Dites-nous pourquoi vous avez besoin de ces données pour que nous puissions mieux comprendre les besoins de nos utilisateurs et améliorer ce service.",
  institution: "Institution",
};

const cart: CartContent = {
  requestData: "Demande de données",
  title: "Panier",
  buttonSubmit: "Envoyer",
  error: translations.error,
  errorOnRequest:
    "Une erreur s'est produite lors de la demande. Merci de réessayer plus tard ou de contacter un administrateur New AGLAE.",
  errorOnRunTitle: "Erreur sur la sélection de run",
  successTitle: "La demande a bien été envoyée",
  successDescription:
    "Un membre de l'équipe New AGLAE va traiter votre demande. Vous recevrez un email de confirmation sous peu.",
  successLink: "Retour au catalogue",
};

export const notFoundPageContent: NotFoundPageContent = {
  pageNotFound: "Page non trouvée",
  pageNotFoundMessage: "La page demandée n'existe pas.",
  goHome: "Retour à l'accueil",
};

export const runCard: RunCardContent = {
  date: "Date",
  projectLeader: "Chef de projet",
  experimentalCondition: "Conditions expérimentales",
  methods: "Méthodes",
  dataUnderEmbargo: "Ces données ne sont pas encore accesibles",
};

const dataAlert: DataAddedAlertContent = {
  description: "Les données ont été ajoutées au panier.",
};

const t = {
  base: translations,
  cart,
  cartButton,
  cartSubmitForm,
  cartTable,
  catalogContent,
  erosLinkText,
  indexPageContent,
  layoutContent,
  notFoundPageContent,
  objectPageContent,
  pageBadges,
  projectCard,
  projectPageContent,
  projectStatusBadge,
  runCard,
  dataAlert,
};

export type Translations = typeof t;
export type BaseTranslations = typeof translations;

export default t;
