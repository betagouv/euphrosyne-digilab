import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { EuphrosyneHeader } from "./EuphrosyneHeader";
import { Footer } from "./Footer";

export default function BasePage({
  currentPath,
  children,
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  return (
    <DsfrProvider>
      <EuphrosyneHeader currentPath={currentPath} />
      <main>{children}</main>
      <Footer></Footer>
    </DsfrProvider>
  );
}
