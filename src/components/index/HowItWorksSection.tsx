import { css } from "@emotion/react";
import { StaticImage } from "gatsby-plugin-image";
import { IStaticImageProps } from "gatsby-plugin-image/dist/src/components/static-image.server";

import { ContentProps } from "../../i18n";
import { BaseSection } from "../BaseSection";

export interface HowItWorksSectionContent {
  title: string;
  catalogText: string;
  euphrosyneText: string;
  workplaceText: string;
}

interface ContentElement {
  image: React.ReactElement<IStaticImageProps>;
  text: string;
}

export const HowItWorksSection: React.FC<
  ContentProps<HowItWorksSectionContent>
> = ({ content }) => {
  const defaultStaticImageProps: Omit<Omit<IStaticImageProps, "src">, "alt"> = {
    placeholder: "blurred",
    width: 80,
    height: 80,
  };
  const componentContent: ContentElement[] = [
    {
      image: (
        <StaticImage
          src="../../images/illustrations/search.svg"
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.catalogText,
    },
    {
      image: (
        <StaticImage
          src="../../images/illustrations/calendar.svg"
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.euphrosyneText,
    },
    {
      image: (
        <StaticImage
          src="../../images/illustrations/human-cooperation.svg"
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.workplaceText,
    },
  ];
  return (
    <BaseSection
      css={css`
        text-align: center;
      `}
    >
      <div>
        <h3>{content.title}</h3>
      </div>

      <div className="fr-grid-row fr-grid-row--gutters">
        {componentContent.map((element) => (
          <div className="fr-col-12 fr-col-lg-4 fr-p-7w" key={element.text}>
            {element.image}
            <p>{element.text}</p>
          </div>
        ))}
      </div>
    </BaseSection>
  );
};
