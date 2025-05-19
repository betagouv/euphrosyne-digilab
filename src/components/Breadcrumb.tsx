import DsfrBreadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

import { WithCurrentLang, localizePath } from "@/i18n";

export interface BreadcrumbSegment {
  label: string;
  linkProps: {
    href: string;
  };
}

export default function Breadcrumb({
  currentPageLabel,
  additionalSegments,
  currentLang,
  ...props
}: {
  currentPageLabel: string;
  additionalSegments?: BreadcrumbSegment[];
} & WithCurrentLang &
  Omit<React.ComponentProps<typeof DsfrBreadcrumb>, "segments">) {
  return (
    <DsfrBreadcrumb
      currentPageLabel={currentPageLabel}
      homeLinkProps={{
        href: localizePath("/", currentLang),
      }}
      segments={[...(additionalSegments || [])]}
      {...props}
    />
  );
}
