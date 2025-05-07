import { langs } from "@/i18n";

export function generateStaticParams() {
  return langs.map((lang) => ({
    lang,
  }));
}
