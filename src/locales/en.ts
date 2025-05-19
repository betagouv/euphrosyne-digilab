import { ObjectTemplateContent } from "@/app/[lang]/[itemType]/[slug]/ObjectPage";
import { ProjectTemplateContent } from "@/app/[lang]/[itemType]/[slug]/page";
import { ICartContent } from "@/app/[lang]/cart/page";
import { CatalogContent } from "@/app/[lang]/catalog/page";
import { NotFoundPageContent } from "@/app/[lang]/not-found";
import type { IndexPageContent } from "@/app/[lang]/page";
import { EuphrosyneHeaderContent } from "@/components/EuphrosyneHeader";
import { IProjectSelectContent } from "@/components/object-group/ProjectSelect";
import { AddToCartContent } from "@/components/project/AddToCartSection";

import { CartButtonContent } from "../cart/CartButton";
import { CartSubmitFormContent } from "../cart/CartSubmitForm";
import { CartTableContent } from "../cart/CartTable";
import { DataAddedAlertContent } from "../cart/DataAddedAlert";
import { CatalogViewModeToggleContent } from "../catalog/components/CatalogViewModeToggle";
import { RunCardContent } from "../components/run/RunCard";

import type { Translations } from "./fr";
import type { PageBadgesContent } from "../components/PageBadges";
import type { ProjectCardContent } from "../components/ProjectCard";
import type { ProjectStatusBadgeContent } from "../components/ProjectStatusBadge";

const _system = {
  project: "project",
  object: "object",
};

const siteTitle = "New AGLAE Data Catalog";

export const translations = {
  project: "Project",
  objectGroup: "Object group",
  object: "Object",
  inventory: "Inventory number",
  collection: "Collection",
  period: "Period",
  era: "Era",
  geographicArea: "Geographic area",
  materials: "Materials",

  error: "Error",

  siteTitle,
};
export const erosLinkText = "Eros object page";

const headerContent: EuphrosyneHeaderContent = {
  homeLinkTitle: `Home - ${siteTitle}`,
  euphrosyneLinkTitle: "Access Euphrosyne",
  homeLinkLabel: "Home",
  catalogLinkLabel: "Catalog",
  serviceTitle: siteTitle,
  languageSwitcher: {
    selectLangBtnTitle: "Change language",
  },
};

export const addToCartContent: AddToCartContent = {
  addToCart: "Add data to cart",
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
    title: "Data produced by New AGLAE available online",
    description: `Euphrosyne is the digital platform linked to New AGLAE, 
    the Grand Louvre Accelerator for Elemental Analysis dedicated to heritage sciences.
    It allows the collection and dissemination of data
    as well as, for New AGLAE users, remote access to
    software for processing ion beam analysis acquired
    on New AGLAE. The New AGLAE data catalog helps you
    search for scientific data by keywords (materials, date,
    geographical area, etc.) to best meet your research needs.`,
  },
  search: {
    title: {
      highlight: "Browse",
      rest: "our New AGLAE data catalog",
    },
  },
  howItWorks: {
    title: "Euphrosyne's services",
    catalogText:
      "A catalog referencing the datasets produced by New AGLAE since 04/01/2022.",
    euphrosyneText:
      "A digital platform allowing New AGLAE users to prepare their experiments.",
    workplaceText:
      "A virtual office for New AGLAE users to process and retrieve their data remotely.",
  },
  about: {
    title: "About",
    newAglae: "New AGLAE, Grand Louvre Accelerator for Elemental Analysis",
    description: `AGLAE, acronym for "Grand Louvre Accelerator for Elemental Analysis," is a unique large instrument, located within
    the Louvre Palace itself. Since its installation in 1988, AGLAE is the
    only particle accelerator in the world dedicated to heritage sciences, using advanced techniques to decipher the
    secrets buried in works of art. Winner of the Future Investment from the National Research Agency (ANR-10-EQPX-22),
    AGLAE became New AGLAE in 2017. Completely automated, the
    beam line is now likely to operate
    24/7.`,
    moreInfo: "Learn more",
    img1Alt: "Statuette from the Bavay bronze treasure analyzed by New AGLAÉ.",
    img2Alt: "Object analyzed by New AGLAÉ.",
  },
  figure: {
    title: "Key figures of New AGLAE",
    analyzedProjectsLabel: "analysis projects carried out",
    analyzedObjectsLabel: "objects analyzed",
    hoursLabel: "hours",
    sinceYear: "Since {}",
    inYear: "In {}",
  },
  projectList: {
    title: "Latest New AGLAE research projects",
    projectCard,
  },
};

const catalogContent: CatalogContent = {
  noData: "No results for these search criteria.",
  numResult: "{} result",
  numResultPlural: "{} results",

  searchBar: {
    title: "Browse the New AGLAE data catalog",
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
    collection: translations.collection,
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

const catalogViewModeToggleContent: CatalogViewModeToggleContent = {
  grid: "Grid",
  list: "List",
};

const objectPageContent: ObjectTemplateContent = {
  catalog: "Catalog",
  projectWithName: "Project {}",
  objectGroupThumbnailContent: {
    altImageWithObjectName: "Image of the object {}",
  },
  objectData: "Object data",

  objectGroupDescription: {
    collection: translations.collection,
    inventory: translations.inventory,
    period: translations.period,
    era: translations.era,
    geographicArea: translations.geographicArea,
    materials: translations.materials,
    erosLinkText,

    pageBadges,
  },
};

const runCard: RunCardContent = {
  date: "Date",
  projectLeader: "Project leader",
  experimentalCondition: "Experimental conditions",
  methods: "Methods",
  dataUnderEmbargo: "Data not yet accessible",
};

const projectPageContent: ProjectTemplateContent = {
  catalog: "Catalog",
  projectData: "Project data",

  runCard,

  projectDescription: {
    pageBadges: pageBadges,
    noDescription: "No description for this project.",
  },
  projectObjects: {
    projectObjects: "Project objects",
    noObjects: "This project has no registered object.",
    seeMore: "See more related objects ({} remaining) +",
    seeLess: "See less -",
    projectObject: {
      erosLinkText,
      seeObjectDetails: "See object details",
      period: translations.period,
      era: translations.era,
      geographicArea: translations.geographicArea,
      materials: translations.materials,
    },
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

const cart: ICartContent = {
  requestData: "Request data",
  title: "Cart",
  buttonSubmit: "Submit",
  error: translations.error,
  errorOnRequest:
    "An error occurred while requesting data. Please try again later or contact a New AGLAE administrator.",
  successTitle: "Your data request has been successfully submitted.",
  errorOnRunTitle: "Error on run selection.",
  successDescription:
    "A New AGLAE team member will process your request. You will receive a confirmation email shortly.",
  successLink: "Back to catalog",
};

export const notFoundPageContent: NotFoundPageContent = {
  pageNotFound: "Page not found",
  pageNotFoundMessage: "The requested page does not exist.",
  goHome: "Back to home",
};

const dataAlert: DataAddedAlertContent = {
  description: "Data has been added to your cart.",
};

const projectSelect: IProjectSelectContent = {
  noProject: "No project",
  viewProject: "View project",
  projectDataContent: runCard,
  projects: translations.project,
  project: translations.project,
};

const footerContent = {
  description: "Euphrosyne, open the data from {link}.",
  homeLinkTitle: `Home - ${siteTitle}`,
  bottomItems: [
    {
      href: "/legal/donnees-personnelles",
      text: "Personal data and Cookies",
    },
    {
      href: "/legal/cgu",
      text: "Terms of Use",
    },
  ],
  termsLink: {
    href: "/legal/mentions-legales",
  },
};

const t: Translations = {
  _system,
  base: translations,
  cart,
  cartButton,
  cartSubmitForm,
  cartTable,
  catalogContent,
  erosLinkText,
  indexPageContent,
  headerContent,
  notFoundPageContent,
  objectPageContent,
  pageBadges,
  projectCard,
  projectPageContent,
  projectStatusBadge,
  runCard,
  dataAlert,
  catalogViewModeToggleContent,
  addToCartContent,
  projectSelect,
  footerContent,
};

export default t;
