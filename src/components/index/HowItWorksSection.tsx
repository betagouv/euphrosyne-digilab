import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";

import { BaseSection } from "../BaseSection";

interface ContentElement {
  image: React.ReactElement<IStaticImageProps>;
  text: string;
}

export const HowItWorksSection = () => {
  const defaultStaticImageProps: Omit<Omit<IStaticImageProps, "src">, "alt"> = {
    placeholder: "blurred",
    width: 80,
    height: 80,
  };
  const content: ContentElement[] = [
    {
      image: (
        <StaticImage
          src="../../images/illustrations/search.svg"
          alt="Icône de recherche"
          {...defaultStaticImageProps}
        />
      ),
      text: "Un catalogue référençant les jeux de données produits par NewAglae depuis le 01/04/2022.",
    },
    {
      image: (
        <StaticImage
          src="../../images/illustrations/calendar.svg"
          alt="Icône de calendrier"
          {...defaultStaticImageProps}
        />
      ),
      text: "Une plateforme numérique permettant aux utilisateurs de NewAglae de préparer leurs expériences.",
    },
    {
      image: (
        <StaticImage
          src="../../images/illustrations/human-cooperation.svg"
          alt="Icône représentant la coopération humaine"
          {...defaultStaticImageProps}
        />
      ),
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
            {element.image}
            <p>{element.text}</p>
          </div>
        ))}
      </div>
    </BaseSection>
  );
};
