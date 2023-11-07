import { Badge, BadgeProps } from "@codegouvfr/react-dsfr/Badge";
import { AlertProps } from "@codegouvfr/react-dsfr/Alert";
import { ProjectStatus } from "../types/project";

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

export const ProjectStatusBadge = ({
  status,
  ...props
}: Omit<BadgeProps, "children"> & { status: ProjectStatus }) => {
  const [label, severity] = projectStatusToLabelAndSeverity(status);
  return (
    <Badge severity={severity} noIcon={true} {...props}>
      {label}
    </Badge>
  );
};
