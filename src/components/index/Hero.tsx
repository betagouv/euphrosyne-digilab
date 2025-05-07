"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { tss } from "tss-react";

import { ContentProps } from "@/i18n";
import useSharedStyles from "@/styles";

import heroImg from "../../../public/images/hero-banner.jpg";
import { BaseSection } from "../BaseSection";


export interface HeroContent {
  title: string;
  description: string;
}

export const Hero: React.FC<ContentProps<HeroContent>> = ({ content }) => {
  const useStyles = tss.create({
    root: {
      backgroundColor: fr.colors.decisions.background.alt.grey.default,
    },
    imageContainer: {
      position: "relative",
      [fr.breakpoints.down("lg")]: {
        height: "200px",
      },
    },
  });

  const sharedClasses = useSharedStyles().classes;
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <BaseSection>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className={`fr-col-12 fr-col-lg-6 ${classes.imageContainer}`}>
            <Image
              src={heroImg}
              alt="Objet analysé par New AGLAE"
              placeholder="blur"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div
            className={`fr-col-12 fr-col-lg-6 ${sharedClasses.paddedUpToLg}`}
          >
            <h1>{content.title}</h1>
            <p>{content.description}</p>
          </div>
        </div>
      </BaseSection>
    </div>
  );
};
