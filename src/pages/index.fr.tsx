import type { HeadFC, PageProps } from "gatsby";
import { graphql } from "gatsby";
import * as React from "react";

import { BaseHead } from "../components/BaseHead";
import { projectCard } from "../locales/fr";
import IndexPage from "../templates/index";

const content = {
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
    featureSoon: "Fonctionnalité à venir...",
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

const FrIndexPage: React.FC<PageProps<Queries.HomePageQuery>> = (props) => {
  return <IndexPage {...props} content={content} />;
};

export default FrIndexPage;

export const Head: HeadFC = BaseHead;

export const query = graphql`
  query HomePage {
    euphrosyneAPI {
      lastProjects(limit: 6) {
        name
        status
        objectGroupMaterials
        comments
        slug
      }
      stats {
        all {
          totalProjects
          totalObjectGroups
          totalHours
        }
        year {
          totalProjects
          totalObjectGroups
          totalHours
        }
      }
    }
  }
`;
