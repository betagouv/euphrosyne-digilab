"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { tss } from "tss-react";

import { ContentProps } from "@/i18n";
import useSharedStyles from "@/styles";

import heroImg from "../../../public/images/hero-banner.jpg";
import { BaseSection } from "../BaseSection";
import RomboidContainer from "../RomboidContainer";

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
    copyrightContainer: {
      position: "absolute",
      bottom: fr.spacing("1v"),
      left: fr.spacing("2v"),
      zIndex: 2,
    },
  });

  const sharedClasses = useSharedStyles().classes;
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      <BaseSection>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className={`fr-col-12 fr-col-lg-6 ${classes.imageContainer}`}>
            <div style={{ position: "relative", height: "100%" }}>
              <Image
                src={heroImg}
                alt="Objet analysé par New AGLAE"
                placeholder="blur"
                fill
                style={{ objectFit: "cover" }}
              />
              <RomboidContainer className={classes.copyrightContainer}>
                <p className="fr-text--xs fr-m-0">
                  © C2RMF - Vanessa Fournier
                </p>
              </RomboidContainer>
            </div>
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
