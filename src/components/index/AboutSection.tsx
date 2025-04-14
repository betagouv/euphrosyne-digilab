import { ContentProps } from "@/i18n";
import { BaseSection } from "../BaseSection";
import AboutSectionImages from "./AboutSectionImages";
import styles from "./AboutSection.module.css";

export interface AboutSectionContent {
  title: string;
  newAglae: string;
  description: string;
  moreInfo: string;
  img1Alt: string;
  img2Alt: string;
}

export default function AboutSection({
  content,
}: ContentProps<AboutSectionContent>) {
  return (
    <div className={styles.root}>
      <BaseSection className={styles.container}>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-lg-6">
            <div>
              <h4>{content.title}</h4>
            </div>
            <div>
              <h3>{content.newAglae}</h3>
            </div>
            <p className={styles.paddedUpToLg}>{content.description}</p>
            <a href="https://c2rmf.fr/aglae">{content.moreInfo}</a>
          </div>

          <AboutSectionImages content={content} />
        </div>
      </BaseSection>
    </div>
  );
}
