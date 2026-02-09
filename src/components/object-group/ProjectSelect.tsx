"use client";

import Select from "@codegouvfr/react-dsfr/SelectNext";
import { useContext, useState } from "react";
import React from "react";

import { buildCatalogItemPath } from "@/catalog/utils";
import { LangContext } from "@/contexts/LangContext";
import { IObjectGroupItem } from "@/types/ICatalog";

import { I18nLink as Link } from "../I18nLink";
import { ProjectData } from "../project/ProjectData";
import { RunCardContent } from "../run/RunCard";

export interface IProjectSelectContent {
  noProject: string;
  viewProject: string;
  projectDataContent: RunCardContent;
  projects: string;
  project: string;
}

interface IProjectSelectProps {
  objectGroup: IObjectGroupItem;
}

export default function ProjectSelect({ objectGroup }: IProjectSelectProps) {
  const { translations } = useContext(LangContext);
  const content = translations.projectSelect;

  const projects = React.useMemo(
    () => objectGroup?.objectPageData?.projects || [],
    [objectGroup],
  );

  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string>("");

  let selectOptions = [{ label: content.noProject, value: "" }];
  if (projects && projects.length > 0) {
    selectOptions = projects.map((project) => ({
      label: project.name,
      value: project.slug,
    }));
  }

  const runs = objectGroup?.objectPageData?.runs;
  const selectedProject = React.useMemo(() => {
    if (!projects.length) {
      return null;
    }

    const matchingProject = projects.find(
      (project) => project?.slug === selectedProjectSlug,
    );

    return matchingProject ?? projects[0];
  }, [projects, selectedProjectSlug]);
  const selectedProjectRuns = runs?.filter(
    (run) => run?.projectSlug === selectedProject?.slug,
  );
  const onProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProjectSlug(event.target.value);
  };

  return (
    <div>
      <Select
        label={translations.base.project}
        disabled={!(projects && projects.length > 0)}
        options={selectOptions}
        nativeSelectProps={{
          value: selectedProject?.slug,
          onChange: onProjectSelect,
        }}
        style={{
          maxWidth: "400px",
        }}
      />
      {selectedProject && (
        <div>
          <div className="fr-mb-1w">
            <Link
              href={buildCatalogItemPath({
                ...selectedProject,
                category: "project",
              })}
            >
              {content.viewProject}
            </Link>
          </div>
          {selectedProjectRuns && selectedProjectRuns.length > 0 && (
            <div className="fr-mb-2w">
              <ProjectData
                runs={selectedProjectRuns}
                projectLeader={selectedProject.leader}
                content={content.projectDataContent}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
