import { StaticImage } from "gatsby-plugin-image";
import { css } from "@emotion/react";
import { BaseSection } from "./BaseSection";

export const HowItWorksSection = () => (
  <BaseSection
    css={css`
      text-align: center;
    `}
  >
    <div>
      <h4>Comment ça marche ?</h4>
    </div>
    <div>
      <h3>Les services d'Euphrosyne</h3>
    </div>

    <div className="fr-grid-row fr-grid-row--gutters">
      <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
        <StaticImage
          src="../../images/illustrations/calendar.svg"
          alt="Icône de calendrier"
          placeholder="blurred"
          width={80}
          height={80}
        />
        <p>Une plateforme Fixlab pour prévoir vos projets à l'accélérateur.</p>
      </div>
      <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
        <StaticImage
          src="../../images/illustrations/human-cooperation.svg"
          alt="Icône représentant la coopération humaine"
          placeholder="blurred"
          width={80}
          height={80}
        />
        <p>
          Une mise à disposition d'un bureau virtuel pour traiter vos données à
          distance.
        </p>
      </div>
      <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
        <StaticImage
          src="../../images/illustrations/search.svg"
          alt="Icône de recherche"
          placeholder="blurred"
          width={80}
          height={80}
        />
        <p>
          Une plateforme Digilab référençant les données des projets menés à
          Aglaé.
        </p>
      </div>
    </div>
  </BaseSection>
);
