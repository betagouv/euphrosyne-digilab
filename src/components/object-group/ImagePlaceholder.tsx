import { fr } from "@codegouvfr/react-dsfr";
import { SerializedStyles, css } from "@emotion/react";
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image";

import { ContentProps } from "../../i18n";

interface ImagePlaceholderProps {
  image?: IGatsbyImageData;
  objectGroupLabel: string;
}

interface ImagePlaceholderContent {
  altImageWithObjectName: string;
}

export default function ImagePlaceholder({
  image,
  content,
  objectGroupLabel,
}: ImagePlaceholderProps & ContentProps<ImagePlaceholderContent>) {
  const props: { alt: string; placeholder: "blurred"; css: SerializedStyles } =
    {
      alt: content.altImageWithObjectName.replace("{}", objectGroupLabel),
      placeholder: "blurred",
      css: css({
        [fr.breakpoints.down("lg")]: {
          maxHeight: "200px",
          width: "100%",
          marginBottom: fr.spacing("3w"),
        },
      }),
    };
  return image ? (
    <GatsbyImage image={image} {...props} />
  ) : (
    <StaticImage
      src="../../images/objectgroup-placeholder.svg"
      alt={content.altImageWithObjectName.replace("{}", objectGroupLabel)}
      placeholder="blurred"
      css={css`
        ${fr.breakpoints.down("lg")} {
          max-height: 200px;
          width: 100%;
          margin-bottom: ${fr.spacing("3w")};
        }
      `}
    />
  );
}
