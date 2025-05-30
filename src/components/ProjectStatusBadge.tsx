import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import { Badge, BadgeProps } from "@codegouvfr/react-dsfr/Badge";

import { ContentProps } from "../i18n";

export interface ProjectStatusBadgeContent {
  upcoming: string;
  dataAvailable: string;
}

function projectStatusToLabelAndSeverity(
  dataAvailable: boolean,
  content: ProjectStatusBadgeContent,
): [string, AlertProps.Severity | "new"] {
  if (dataAvailable) return [content.dataAvailable, "success"];
  return [content.upcoming, "info"];
}

export const ProjectStatusBadge = ({
  dataAvailable,
  content,
  ...props
}: Omit<BadgeProps, "children"> & {
  dataAvailable: boolean;
} & ContentProps<ProjectStatusBadgeContent>) => {
  const [label, severity] = projectStatusToLabelAndSeverity(
    dataAvailable,
    content,
  );
  return (
    <Badge severity={severity} noIcon={true} {...props}>
      {label}
    </Badge>
  );
};
