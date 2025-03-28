import {
  DsfrHeadBase,
  type DsfrHeadProps,
  createGetHtmlAttributes,
} from "@codegouvfr/react-dsfr/next-app-router/server-only-index";

import { I18nLink as Link } from "../components/I18nLink";
import { defaultColorScheme } from "./defaultColorScheme";

export const { getHtmlAttributes } = createGetHtmlAttributes({
  defaultColorScheme,
});

export function DsfrHead(props: DsfrHeadProps) {
  return <DsfrHeadBase Link={Link} {...props} />;
}
