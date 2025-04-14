import { fr } from "@codegouvfr/react-dsfr";

import { ContentProps } from "@/i18n";
import { tss } from "tss-react";
import Image from "next/image";

interface ImagePlaceholderProps {
  image?: string;
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
  const { classes } = tss.create(() => ({
    image: {
      [fr.breakpoints.down("lg")]: {
        maxHeight: "200px",
        width: "100%",
        marginBottom: fr.spacing("3w"),
      },
    },
  }))();
  const props: { placeholder: "blur"; className: string } = {
    placeholder: "blur",
    className: classes.image,
  };
  return image ? (
    <Image
      src={image}
      alt={content.altImageWithObjectName.replace("{}", objectGroupLabel)}
      {...props}
    />
  ) : (
    <Image
      src="../../images/objectgroup-placeholder.svg"
      alt={content.altImageWithObjectName.replace("{}", objectGroupLabel)}
      className={classes.image}
    />
  );
}
