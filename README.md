# Euphrosyne Digilab

## Description

Euphrosyne Digilab est une plateforme référençant les données de recherche des projets menés à New AGLAE, l’accélérateur de particules dans les sous-sols du Palais du Louvre. Elle permet de rechercher les données de ces projets par mots clefs, matériaux, date ou aire géographique.

Le projet est en cours de développement. Une version beta sera disponible prochainement contenant uniquement les données de certains projets.

## Specs

Le projet est basée sur [Gatsby](https://www.gatsbyjs.com/), un framework React, qui permet de générer un site statique. Le code est écrit en Typescript.

Les données nécessaires à la génération des pages sont récupérées sur Euphrosyne ([site](https://euphrosyne.beta.gouv.fr/login/?next=/) | [repo](https://github.com/betagouv/euphrosyne)) via un _endpoint_ GraphQL.

## Installation

1. Cloner le projet :

   ```bash
   git clone https://github.com/betagouv/euphrosyne-digilab
   ```

2. Installer les dépendances :

   ```bash
     npm install
   ```

## Développement

1. Copier le fichier `.env.example` en `.env.development` et remplir les valeurs.
2. Lancer le webserver [euphrosyne](https://github.com/betagouv/euphrosyne). La variable d'environnement EUPHROSYNE_GRAPHQL_ENDPOINT doit pointer vers l'endpoint graphql de ce webserver. Par exemple [http://localhost:8000/graphql](http://localhost:8000/graphql).
3. Lancer le serveur de développement :

```bash
npm run develop
```

## Build

1. Copier le fichier `.env.example` en `.env.development` et remplir les valeurs.
2. Lancer le build des pages (ensuite accessible dans le dossier `public`):

```bash
npm run build
```

## Ecosystème Euphrosyne

- [Euphrosyne](https://github.com/betagouv/euphrosyne)
- [Euphrosyne Tools API](https://github.com/betagouv/euphrosyne-tools-api)
- [Euphrosyne Infra](https://github.com/betagouv/euphrosyne-tools-infra)
- [New AGLAE Data Converter](https://github.com/betagouv/new-aglae-data-converter)
