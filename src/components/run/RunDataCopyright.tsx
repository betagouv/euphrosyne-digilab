import { ContentProps } from "@/i18n";
import { Leader } from "@/types/project";

import CCByLogos from "../CCByLogos";

interface RunDataCopyrightProps {
  label: string;
  projectLeader: Leader | null;
  createdAt: Date | null;
}

export interface RunDataCopyrightContent {
  by: string;
  licensedUnder: string;
  atInstitution: string;
}

export default function RunDataCopyright({
  label,
  projectLeader,
  createdAt,
  content,
}: RunDataCopyrightProps & ContentProps<RunDataCopyrightContent>) {
  return (
    <span>
      <strong>{label}</strong> © {(createdAt || new Date()).getFullYear()}{" "}
      {projectLeader &&
        `${content.by.replace("{firstName}", projectLeader.firstName).replace("{lastName}", projectLeader.lastName)}`}{" "}
      {projectLeader?.institutionName &&
        `${content.atInstitution.replace("{institutionName}", projectLeader.institutionName)}`}{" "}
      {content.licensedUnder}{" "}
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      <CCByLogos />
    </span>
  );
}
//
