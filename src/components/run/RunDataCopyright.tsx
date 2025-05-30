import { ContentProps } from "@/i18n";

import CCByLogos from "../CCByLogos";

interface RunDataCopyrightProps {
  label: string;
  leader: string | null;
  createdAt: Date | null;
}

export interface RunDataCopyrightContent {
  by: string;
  licensedUnder: string;
}

export default function RunDataCopyright({
  label,
  leader,
  createdAt,
  content,
}: RunDataCopyrightProps & ContentProps<RunDataCopyrightContent>) {
  return (
    <span>
      <strong>{label}</strong> © {(createdAt || new Date()).getFullYear()}{" "}
      {leader && `${content.by} ${leader}`} {content.licensedUnder}{" "}
      <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>
      <CCByLogos />
    </span>
  );
}
//
