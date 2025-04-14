import Link from "next/link";

import {
  defaultLangKey,
  getCurrentLangKey,
  langs,
  localizePath,
} from "../i18n";

export function I18nLink(props: React.ComponentProps<typeof Link>) {
  const href = props.href,
    lang = getCurrentLangKey(),
    definitivePath = localizePath(
      href as string,
      (langs as string[]).includes(lang) ? lang : defaultLangKey
    );

  const { children, ...rest } = props;

  return (
    <Link {...rest} href={definitivePath}>
      {children}
    </Link>
  );
}
