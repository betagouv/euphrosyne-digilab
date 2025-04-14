import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import { Badge, BadgeProps } from "@codegouvfr/react-dsfr/Badge";

import { ContentProps } from "../i18n";
import { ProjectStatus } from "../types/project";

export interface ProjectStatusBadgeContent {
  upcoming: string;
  dataAvailable: string;
}

function projectStatusToLabelAndSeverity(
  status: ProjectStatus,
  content: ProjectStatusBadgeContent,
): [string, AlertProps.Severity | "new"] {
  switch (status) {
    case "Status.FINISHED":
      return [content.upcoming, "info"];
    case "Status.DATA_AVAILABLE":
      return [content.dataAvailable, "success"];
    default:
      return [status, "info"];
  }
}

export const ProjectStatusBadge = ({
  status,
  content,
  ...props
}: Omit<BadgeProps, "children"> & {
  status: ProjectStatus;
} & ContentProps<ProjectStatusBadgeContent>) => {
  const [label, severity] = projectStatusToLabelAndSeverity(status, content);
  return (
    <Badge severity={severity} noIcon={true} {...props}>
      {label}
    </Badge>
  );
};
