import { useState } from "react";

import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { PageContext } from "../contexts/PageContext";
import { EuphrosyneHeader } from "../components/EuphrosyneHeader";
import { Footer } from "../components/Footer";

export default function Layout({
  children,
  currentPath,
}: {
  currentPath: string;
  children: React.ReactNode;
}) {
  const [currentProject, setCurrentProject] =
    useState<PageContext["currentProject"]>(null);

  return (
    <DsfrProvider>
      <PageContext.Provider
        value={{
          currentProject,
          setCurrentProject,
        }}
      >
        <EuphrosyneHeader currentPath={currentPath} />
        <main>{children}</main>
        <Footer />
      </PageContext.Provider>
    </DsfrProvider>
  );
}
