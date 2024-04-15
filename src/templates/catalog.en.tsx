import { HeadFC, PageProps } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import CatalogTemplate, {
  CatalogContent,
  CatalogTemplateProps,
} from "../components/page-templates/catalog";

const content: CatalogContent = {
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
  },

  sortSelect: {
    mostDated: "Oldest",
    mostRecent: "Most recent",
    sorting: "Sorting",
  },
};

export default function EnCatalogTemplate(
  props: PageProps<null, CatalogTemplateProps>,
) {
  return <CatalogTemplate {...props} content={content} />;
}

export const Head: HeadFC = BaseHead;
