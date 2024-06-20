# Euphrosyne Digilab

## Description

Euphrosyne Digilab est une plateforme référençant les données de recherche des projets menés à NewAglae, l’accélérateur de particules dans les sous-sols du Palais du Louvre. Elle permet de rechercher les données de ces projets par mots clefs, matériaux, date ou aire géographique.

Le projet est en cours de développement. Une version beta sera disponible prochainement contenant uniquement les données de certains projets.

## Specs

Le projet est basée sur [Gatsby](https://www.gatsbyjs.com/), un framework React, qui permet de générer un site statique. Le code est écrit en Typescript.

Les données nécessaires à la génération des pages sont récupérées sur une instance Opensearch/Elasticseatch, qui est synchronisée avec Euphrosyne ([site](https://euphrosyne.beta.gouv.fr/login/?next=/) | [repo](https://github.com/betagouv/euphrosyne)). Les requêtes sur la page du catalogue de données sont faites via une API disponible sur Euphrosyne.

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
2. Lancer le webserver [euphrosyne](https://github.com/betagouv/euphrosyne). La variable d'environnement `GATSBY_EUPHROSYNE_HOST` doit pointer vers l'url de l'application Euphrosyne. Par exemple [http://localhost:8000](http://localhost:8000).
3. Lancer l'instance Elasticsearch / Opensearch. Elle contient les données du catalogue et est utilisée pour générer les pages au moment du build. La variable doit `ELASTICSEARCH_CONNECTION_URL` pointer vers cette instance. Il est possible de synchroniser les données d'Euphrosyne avec l'instance via un script (cf. la documentation d'Euphrosyne).
4. Lancer le serveur de développement :

```bash
npm run develop
```

## Build

1. Copier le fichier `.env.example` en `.env.production` et remplir les valeurs.
2. Lancer le build des pages (ensuite accessible dans le dossier `public`):

```bash
npm run build
```

## Ecosystème Euphrosyne

- [Euphrosyne](https://github.com/betagouv/euphrosyne)
- [Euphrosyne Tools API](https://github.com/betagouv/euphrosyne-tools-api)
- [Euphrosyne Infra](https://github.com/betagouv/euphrosyne-tools-infra)
- [NewAglae Data Converter](https://github.com/betagouv/new-aglae-data-converter)
