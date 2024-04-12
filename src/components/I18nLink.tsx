import { GatsbyLinkProps, Link } from "gatsby";

import { defaultLangKey, getCurrentLangKey, langs } from "../i18n";

type CustomGatsbyLinkProps = Omit<GatsbyLinkProps<object>, "ref">;

export function I18nLink(props: CustomGatsbyLinkProps) {
  const to = props.to;
  const lang = getCurrentLangKey();
  if ((langs as string[]).includes(lang)) {
    return <Link {...props} to={`/${lang}${to}`} />;
  }
  return <Link {...props} to={`/${defaultLangKey}${to}`} />;
}
