import { GatsbyLinkProps, Link } from "gatsby";

import {
  defaultLangKey,
  getCurrentLangKey,
  langs,
  localizePath,
} from "../i18n";

type CustomGatsbyLinkProps = Omit<GatsbyLinkProps<object>, "ref">;

export function I18nLink(props: CustomGatsbyLinkProps) {
  const to = props.to,
    lang = getCurrentLangKey(),
    definitivePath = localizePath(
      to,
      (langs as string[]).includes(lang) ? lang : defaultLangKey,
    );

  return <Link {...props} to={definitivePath} />;
}
