import Image from "next/image";

import { ContentProps } from "@/i18n";
import { BaseSection } from "../BaseSection";

import searchSVG from "../../../public/images/illustrations/search.svg";
import humanCoopSVG from "../../../public/images/illustrations/human-cooperation.svg";
import calendarSVG from "../../../public/images/illustrations/calendar.svg";

export interface HowItWorksSectionContent {
  title: string;
  catalogText: string;
  euphrosyneText: string;
  workplaceText: string;
}

interface ContentElement {
  image: React.ReactElement<typeof Image>;
  text: string;
}

export const HowItWorksSection: React.FC<
  ContentProps<HowItWorksSectionContent>
> = ({ content }) => {
  const defaultStaticImageProps = {
    width: 80,
    height: 80,
  };
  const componentContent: ContentElement[] = [
    {
      image: (
        <Image
          src={searchSVG}
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.catalogText,
    },
    {
      image: (
        <Image
          src={calendarSVG}
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.euphrosyneText,
    },
    {
      image: (
        <Image
          src={humanCoopSVG}
          alt=""
          aria-hidden="true"
          {...defaultStaticImageProps}
        />
      ),
      text: content.workplaceText,
    },
  ];
  return (
    <BaseSection className="text-center">
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
