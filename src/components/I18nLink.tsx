"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  defaultLangKey,
  getPathnameLangKey,
  langs,
  localizePath,
} from "../i18n";

export function I18nLink(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  if (!pathname) {
    throw new Error("usePathname must be used within a Router");
  }
  const href = props.href,
    lang = getPathnameLangKey(pathname),
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
