import { ContentProps } from "@/i18n";

import ImagePlaceholder from "./ImagePlaceholder";
import styles from "./ObjectGroupThumbnail.module.css";

export interface ObjectGroupThumbnailContent {
  altImageWithObjectName: string;
}

export default function ObjectGroupThumbnail({
  src,
  copyright,
  objectGroupLabel,
  content,
}: {
  className?: string;
  src: string;
  copyright?: string;
  objectGroupLabel: string;
} & ContentProps<ObjectGroupThumbnailContent>) {
  return (
    <div className={`${styles.imageContainer} fr-mb-2w`}>
      <ImagePlaceholder
        image={src}
        objectGroupLabel={objectGroupLabel}
        alt={content.altImageWithObjectName.replace("{}", objectGroupLabel)}
      />
      {copyright && (
        <p className="fr-text--sm fr-mt-1w" style={{ textAlign: "right" }}>
          © {copyright}
        </p>
      )}
    </div>
  );
}
