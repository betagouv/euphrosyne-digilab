import { Lang } from "@/i18n";

function getLink(lang?: Lang): string {
  switch (lang) {
    case "fr":
      return "https://creativecommons.org/licenses/by/4.0/deed.fr";
    default:
      return "https://creativecommons.org/licenses/by/4.0/";
  }
}

export default function CCLink({ lang }: { lang?: Lang }) {
  return (
    <a href={getLink(lang)} target="_blank" rel="noopener noreferrer">
      CC BY 4.0
    </a>
  );
}
