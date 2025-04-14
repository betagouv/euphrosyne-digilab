"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import { useRef } from "react";

import useHasBeenInViewport from "../../hooks/useHasBeenInViewport";
import { ContentProps } from "@/i18n";
import FadeInDiv from "../FadeInDiv";
import { tss } from "tss-react";

import imageZoomed1 from "../../../public/images/analyzed-object-zoomed-1.png";
import imageZoomed2 from "../../../public/images/analyzed-object-zoomed-2.png";

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
  });
  const { classes } = useStyles();
  const elementRef = useRef<HTMLDivElement>(null);
  const hasBeenInViewport = useHasBeenInViewport(elementRef);

  return hasBeenInViewport ? (
    <FadeInDiv
      className={`fr-col-12 fr-col-lg-6 ${classes.root}`}
      ref={elementRef}
    >
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
          <p className="fr-text--xs">
            © Christophe Hargoues. C2RMF. AGLAÉ. CNRS Photothèque. 2017
          </p>
        </div>
        <div className={`fr-col-lg-6 ${classes.imageContainer}}`}>
          <Image
            src={imageZoomed2}
            alt={content.img2Alt}
            placeholder="blur"
            height={490}
            className={`fr-ml-1v ${classes.secondImage}`}
          />
          <p className="fr-text--xs">© Vanessa Fournier. C2RMF.</p>
        </div>
      </div>
    </FadeInDiv>
  ) : (
    <div></div>
  );
}
