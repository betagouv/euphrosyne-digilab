import { CartButtonContent } from "../cart/CartButton";
import { CartSubmitFormContent } from "../cart/CartSubmitForm";
import { CartTableContent } from "../cart/CartTable";
import type { PageBadgesContent } from "../components/PageBadges";
import type { ProjectCardContent } from "../components/ProjectCard";
import type { ProjectStatusBadgeContent } from "../components/ProjectStatusBadge";
import type { ProjectDataContent } from "../components/project/ProjectData";
import type { LayoutContentProps } from "../layouts";
import type { IndexPageContent } from "../pages";
import { NotFoundPageContent } from "../pages/404";
import { CartContent } from "../pages/cart";
import type { CatalogContent } from "../pages/catalog";
import type { ObjectTemplateContent } from "../pages/object/{ObjectGroup.slug}";
import type { ProjectTemplateContent } from "../pages/project/{Project.slug}";
import type { Translations } from "./fr";

export const translations = {
  project: "Project",
  objectGroup: "Object group",
  object: "Object",
  inventory: "Inventory number",
  period: "Period",
  era: "Era",
  geographicArea: "Geographic area",
  materials: "Materials",

  error: "Error",
};
export const erosLinkText = "Eros object page";

const layoutContent: LayoutContentProps = {
  header: {
    homeLinkTitle: "Home - NewAglae Data Catalog",
    euphrosyneLinkTitle: "Access Euphrosyne",
    homeLinkLabel: "Home",
    catalogLinkLabel: "Catalog",
    serviceTitle: "NewAglae Data Catalog",
    languageSwitcher: {
      selectLangBtnTitle: "Change language",
    },
  },
};

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

const indexPageContent: IndexPageContent = {
  hero: {
    title: "Data produced by NewAglae available online",
    description: `Euphrosyne is the digital platform linked to NewAglae, 
    the Grand Louvre Accelerator for Elemental Analysis dedicated to heritage sciences.
    It allows the collection and dissemination of data
    as well as, for NewAglae users, remote access to
    software for processing ion beam analysis acquired
    on NewAglae. The NewAglae data catalog helps you
    search for scientific data by keywords (materials, date,
    geographical area, etc.) to best meet your research needs.`,
  },
  search: {
    title: {
      highlight: "Browse",
      rest: "our Euphrosyne data catalog",
    },
  },
  howItWorks: {
    title: "Euphrosyne's services",
    catalogText:
      "A catalog referencing the datasets produced by NewAglae since 04/01/2022.",
    euphrosyneText:
      "A digital platform allowing NewAglae users to prepare their experiments.",
    workplaceText:
      "A virtual office for NewAglae users to process and retrieve their data remotely.",
  },
  about: {
    title: "About",
    newAglae: "NewAglae, Grand Louvre Accelerator for Elemental Analysis",
    description: `AGLAE, acronym for "Grand Louvre Accelerator for Elemental Analysis," is a unique large instrument, located within
    the Louvre Palace itself. Since its installation in 1988, AGLAE is the
    only particle accelerator in the world dedicated to heritage sciences, using advanced techniques to decipher the
    secrets buried in works of art. Winner of the Future Investment from the National Research Agency (ANR-10-EQPX-22),
    AGLAE became NewAglae in 2017. Completely automated, the
    beam line is now likely to operate
    24/7.`,
    moreInfo: "Learn more",
    img1Alt: "Statuette from the Bavay bronze treasure analyzed by New AGLAÉ.",
    img2Alt: "Object analyzed by New AGLAÉ.",
  },
  figure: {
    title: "Key figures of NewAglae",
    analyzedProjectsLabel: "analysis projects carried out",
    analyzedObjectsLabel: "objects analyzed",
    hoursLabel: "hours",
    sinceYear: "Since {}",
    inYear: "In {}",
  },
  projectList: {
    title: "Latest Euphrosyne research projects",
    projectCard,
  },
};

const catalogContent: CatalogContent = {
  noData: "No results for these search criteria.",
  numResult: "{} result",
  numResultPlural: "{} results",

  searchBar: {
    title: "Browse the Euphrosyne data catalog",
  },

  filterContainer: {
    filterResults: "Filter results",
    filter: "Filter",
  },

  catalogFilters: {
    project: "Project",
    objectGroup: "Object group",
    itemType: "Item type",
    materials: translations.materials,
    inventory: translations.inventory,
    collection: "Collection",
    datingFilters: {
      period: translations.period,
      era: translations.era,
    },
    discoveryPlaceFilter: {
      discoveryPlace: "Discovery place",
    },
    periodFilter: {
      period: translations.period,
    },
    createdRange: {
      label: "Project year",
    },
    dataAvailableSwitch: {
      label: "Data available",
      status: "Data status",
    },
  },

  sortSelect: {
    mostDated: "Oldest",
    mostRecent: "Most recent",
    sorting: "Sorting",
    relevance: "Relevance",
  },

  pagination: {
    firstPage: "First page",
    previousPage: "Previous",
    nextPage: "Next",
    lastPage: "Last page",
  },
};

const objectPageContent: ObjectTemplateContent = {
  catalog: "Catalog",
  projectWithName: "Project {}",
  altImageWithObjectName: "Image of the object {}",
  noProject: "No project",
  objectData: "Object data",
  project: "Project",
  viewProject: "View project",

  objectGroupDescription: {
    inventory: translations.inventory,
    period: translations.period,
    era: translations.era,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
    addObjectDataToCart: "Add all object data to cart",
    erosLinkText,

    pageBadges,
  },
  projectDataContent,
};

const projectPageContent: ProjectTemplateContent = {
  catalog: "Catalog",
  projectData: "Project data",

  projectDataContent,
  projectDescription: {
    pageBadges: pageBadges,
    noDescription: "No description for this project.",
  },
  projectObjects: {
    projectObjects: "Project objects",
    noObjects: "This project has no registered object.",
    seeObjectDetails: "See object details",
    seeMore: "See more related objects ({} remaining) +",
    seeLess: "See less -",
    erosLinkText,
    inventory: translations.inventory,
    period: translations.period,
    era: translations.era,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
  },
};

const cartButton: CartButtonContent = {
  title: "Cart",
};

const cartTable: CartTableContent = {
  headerRunName: "Run name",
  headerFromType: "From: type",
  headerFromPage: "From: page",
  headerDelete: "Delete",
  viewFromPage: "View page",
  noData: "Your selection is empty.",
};

const cartSubmitForm: CartSubmitFormContent = {
  email: "Email address",
  firstName: "First name",
  lastName: "Last name",
  description: "Description",
  descriptionHint:
    "Tell us why you need this data so we can better understand the needs of our users and improve this service.",
  institution: "Institution",
};

const cart: CartContent = {
  requestData: "Request data",
  title: "Cart",
  buttonSubmit: "Submit",
  error: translations.error,
  errorOnRequest:
    "An error occurred while requesting data. Please try again later or contact a New AGLAE administrator.",
  successTitle: "Your data request has been successfully submitted.",
  successDescription:
    "A New AGLAE team member will process your request. You will receive a confirmation email shortly.",
  successLink: "Back to catalog",
};

export const notFoundPageContent: NotFoundPageContent = {
  pageNotFound: "Page not found",
  pageNotFoundMessage: "The requested page does not exist.",
  goHome: "Back to home",
};

const t: Translations = {
  base: translations,
  erosLinkText,
  projectStatusBadge,
  pageBadges,
  projectCard,
  layoutContent,
  indexPageContent,
  catalogContent,
  objectPageContent,
  projectPageContent,
  notFoundPageContent,
  cart,
  cartButton,
  cartTable,
  cartSubmitForm,
};

export default t;
