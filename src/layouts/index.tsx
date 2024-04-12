import { PageProps } from "gatsby";

import LayoutEn from "./en";
import LayoutFr from "./fr";

interface PageContext {
  langKey: string;
}
export default ({
  pageContext,
  ...props
}: PageProps & { currentPath: string }) => {
  const lang = (pageContext as PageContext).langKey;
  if (lang === "en") {
    return <LayoutEn pageContext={pageContext} {...props}></LayoutEn>;
  } else {
    return <LayoutFr pageContext={pageContext} {...props}></LayoutFr>;
  }
};
