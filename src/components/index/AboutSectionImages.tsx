"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { tss } from "tss-react";

import { ContentProps } from "@/i18n";

import imageZoomed1 from "../../../public/images/analyzed-object-zoomed-1.png";
import imageZoomed2 from "../../../public/images/analyzed-object-zoomed-2.png";
import RomboidContainer from "../RomboidContainer";

export interface AboutSectionContent {
  title: string;
  newAglae: string;
  description: string;
  moreInfo: string;
  img1Alt: string;
  img2Alt: string;
}

export default function AboutSectionImages({
  content,
}: ContentProps<AboutSectionContent>) {
  const useStyles = tss.create({
    root: {
      backgroundColor:
        fr.colors.decisions.background.actionLow.blueFrance.default,
      display: "flex",
      [fr.breakpoints.down("lg")]: {
        display: "none",
      },
      [fr.breakpoints.down("xl")]: {
        textAlign: "center",
      },
    },
    imageContainer: {
      position: "relative",
      [fr.breakpoints.down("xl")]: {
        display: "none",
      },
    },
    image: {
      mixBlendMode: "luminosity",
    },
    secondImage: {
      mixBlendMode: "luminosity",
      transform: "scaleX(-1)",
    },
    copyrightContainer: {
      position: "absolute",
      bottom: fr.spacing("3v"),
      left: fr.spacing("3v"),
      maxWidth: "calc(100% - 2rem)",
      zIndex: 2,
    },
  });
  const { classes } = useStyles();

  return (
    <div className={`fr-col-12 fr-col-lg-6 ${classes.root}`}>
      <div className={`fr-col-lg-6 ${classes.imageContainer}`}>
        <Image
          src={imageZoomed1}
          alt={content.img1Alt}
          placeholder="blur"
          height={490}
          className={`fr-mr-1v
                  ${classes.image}`}
        />
        <RomboidContainer className={classes.copyrightContainer}>
          <p className="fr-text--xs fr-m-0">
            © C2RMF. Christophe Hargoues. AGLAÉ. CNRS Photothèque. 2017
          </p>
        </RomboidContainer>
      </div>
      <div className={`fr-col-xl-6 fr-col-12 ${classes.imageContainer}`}>
        <Image
          src={imageZoomed2}
          alt={content.img2Alt}
          placeholder="blur"
          height={490}
          className={`fr-ml-1v ${classes.secondImage}`}
        />
        <RomboidContainer className={classes.copyrightContainer}>
          <p className="fr-text--xs fr-m-0">© C2RMF. Vanessa Fournier.</p>
        </RomboidContainer>
      </div>
    </div>
  );
}
