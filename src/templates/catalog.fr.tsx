import { HeadFC, PageProps } from "gatsby";

import { BaseHead } from "../components/BaseHead";
import CatalogTemplate, {
  CatalogContent,
  CatalogTemplateProps,
} from "../components/page-templates/catalog";

const content: CatalogContent = {
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
    itemType: "Type d'item",
  },

  sortSelect: {
    mostDated: "Plus anciens",
    mostRecent: "Plus récents",
    sorting: "Tri",
  },
};

export default function FrCatalogTemplate(
  props: PageProps<null, CatalogTemplateProps>,
) {
  return <CatalogTemplate content={content} {...props} />;
}

export const Head: HeadFC = BaseHead;
