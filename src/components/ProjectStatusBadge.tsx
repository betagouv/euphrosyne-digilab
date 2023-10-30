import { Badge } from "@codegouvfr/react-dsfr/Badge";
import { AlertProps } from "@codegouvfr/react-dsfr/Alert";

import { Project, ProjectStatus } from "../types/project";

function projectStatusToLabelAndSeverity(
  status: ProjectStatus
): [string, AlertProps.Severity | "new"] {
  switch (status) {
    case "Status.FINISHED":
      return ["À venir", "info"];
    case "Status.DATA_AVAILABLE":
      return ["Données disponibles", "success"];
    default:
      return [status, "info"];
  }
}

export const ProjectStatusBadge = ({ project }: { project: Project }) => {
  const [label, severity] = projectStatusToLabelAndSeverity(project.status);
  return (
    <Badge severity={severity} noIcon={true}>
      {label}
    </Badge>
  );
};
