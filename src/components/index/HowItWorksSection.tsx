import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";

import { BaseSection } from "../BaseSection";

interface ContentElement {
  imageSrc: string;
  imageAlt: string;
  text: string;
}

export const HowItWorksSection = () => {
  const content: ContentElement[] = [
    {
      imageSrc: "../../images/illustrations/search.svg",
      imageAlt: "Icône de recherche",
      text: "Un catalogue référençant les jeux de données produits par NewAglae depuis le 01/04/2022.",
    },
    {
      imageSrc: "../../images/illustrations/calendar.svg",
      imageAlt: "Icône de calendrier",
      text: "Une plateforme numérique permettant aux utilisateurs de NewAglae de préparer leurs expériences.",
    },
    {
      imageSrc: "../../images/illustrations/human-cooperation.svg",
      imageAlt: "Icône représentant la coopération humaine",
      text: "Un bureau virtuel pour que les utilisateurs de NewAglae puissent traiter et récupérer leurs données à distance.",
    },
  ];
  return (
    <BaseSection
      css={css`
        text-align: center;
      `}
    >
      <div>
        <h3>Les services d'Euphrosyne</h3>
      </div>

      <div className="fr-grid-row fr-grid-row--gutters">
        {content.map((element) => (
          <div className="fr-col-12 fr-col-lg-4 fr-p-7w">
            <StaticImage
              src={element.imageSrc}
              alt={element.imageAlt}
              placeholder="blurred"
              width={80}
              height={80}
            />
            <p>{element.text}</p>
          </div>
        ))}
      </div>
    </BaseSection>
  );
};
