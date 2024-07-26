import type { HeadFC } from "gatsby";
import * as React from "react";

import { StartDsfr } from "../StartDsfr";

export const BaseHead: HeadFC = () => (
  <>
    <StartDsfr />
    <title>Catalogue des données de New AGLAE</title>
    <link rel="apple-touch-icon" href="/dsfr/favicon/apple-touch-icon.png" />
    <link rel="icon" href="/dsfr/favicon/favicon.svg" type="image/svg+xml" />
    <link
      rel="shortcut icon"
      href="/dsfr/favicon/favicon.ico"
      type="image/x-icon"
    />
    <link
      rel="manifest"
      href="/dsfr/favicon/manifest.webmanifest"
      crossOrigin="use-credentials"
    />

    <link rel="stylesheet" href="/dsfr/utility/icons/icons.min.css" />
    <link rel="stylesheet" href="/dsfr/dsfr.min.css" />
  </>
);
