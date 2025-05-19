import * as React from "react";

import { ContentProps } from "@/i18n";

import { ObjectGroup } from "../../types/project";
import { BaseSection } from "../BaseSection";
import { ExpandableList } from "../ExpandableList";
import ProjectObject, { ProjectObjectContent } from "./ProjectObject";

export interface ProjectObjectsContent {
  projectObjects: string;
  noObjects: string;
  seeMore: string;
  seeLess: string;
  projectObject: ProjectObjectContent;
}

interface ProjectObjectsProps
  extends Omit<React.InputHTMLAttributes<HTMLDivElement>, "content"> {
  objectGroups: ObjectGroup[];
}

export const ProjectObjects = ({
  objectGroups,
  content,
  ...props
}: ProjectObjectsProps & ContentProps<ProjectObjectsContent>) => {
  const excerptLength = 3;

  const alwaysVisibleObjectGroups = objectGroups.slice(0, excerptLength);

  return (
    <BaseSection {...props}>
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12 fr-col-md-6">
          <h2 className="fr-mb-2w">{content.projectObjects}</h2>
        </div>
      </div>
      {objectGroups.length === 0 ? (
        <p>
          <i>{content.noObjects}</i>
        </p>
      ) : (
        <>
          <div className="fr-grid-row fr-grid-row--gutters">
            {alwaysVisibleObjectGroups.map((objectGroup) => (
              <ProjectObject
                content={content.projectObject}
                key={`project-object-${objectGroup.id}`}
                objectGroup={objectGroup}
                className="fr-col-6 fr-col-lg-4"
              />
            ))}
            {objectGroups.length > excerptLength && (
              <ExpandableList
                excerptLength={excerptLength}
                expandText={content.seeMore.replace(
                  "{}",
                  (objectGroups.length - excerptLength).toString(),
                )}
                collapseText={content.seeLess}
              >
                {objectGroups.slice(excerptLength).map((objectGroup) => (
                  <ProjectObject
                    content={content.projectObject}
                    key={`project-object-${objectGroup.id}`}
                    objectGroup={objectGroup}
                    className="fr-col-6 fr-col-lg-4"
                  />
                ))}
              </ExpandableList>
            )}
          </div>
        </>
      )}
    </BaseSection>
  );
};
