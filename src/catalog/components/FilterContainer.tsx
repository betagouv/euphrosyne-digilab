"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useCallback, useEffect, useState } from "react";
import { tss } from "tss-react";

import { ContentProps } from "../../i18n";

export interface FilterContainerContent {
  filterResults: string;
  filter: string;
}

function DekstopFilterContainer({
  children,
  content,
}: { children?: React.ReactNode } & ContentProps<FilterContainerContent>) {
  const { classes, cx } = tss.create({
    root: {
      width: "30%",
      maxWidth: "400px",
      backgroundColor: fr.colors.decisions.background.alt.grey.default,
      minHeight: "800px",
    },
  })();
  return (
    <aside className={cx(classes.root)}>
      <div className="fr-container fr-pt-5w">
        <h3>{content.filter}</h3>
        {children}
      </div>
    </aside>
  );
}

function MobileFilterContainer({
  children,
  content,
}: { children?: React.ReactNode } & ContentProps<FilterContainerContent>) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { classes, cx } = tss.create({
    root: {
      width: "100%",
      [fr.breakpoints.up("md")]: {
        width: "30%",
        maxWidth: "400px",
        backgroundColor: fr.colors.decisions.background.alt.grey.default,
      },
    },
    toggleButton: {
      width: "100% !important",
      justifyContent: "center",
    },
  })();

  return (
    <div className={cx(classes.root)}>
      <div className="fr-container fr-pt-5w">
        <button
          className={cx(
            classes.toggleButton,
            fr.cx("fr-btn", "fr-btn--tertiary-no-outline"),
          )}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <i
            className={fr.cx("fr-icon-equalizer-line", "fr-mr-3w")}
            aria-hidden={true}
          />
          {content.filterResults}
          <i
            className={fr.cx(
              `fr-icon-arrow-${isFilterOpen ? "up" : "down"}-s-line`,
              "fr-ml-3w",
            )}
            aria-hidden={true}
          />
        </button>
        <div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

// Just a UI wrapper for the filter container
export default function FilterContainer({
  children,
  content,
}: {
  children?: React.ReactNode;
} & ContentProps<FilterContainerContent>) {
  const containers: [number, React.ReactElement][] = [
    [
      0,
      <MobileFilterContainer content={content} key={"mobile-filter-container"}>
        {children}
      </MobileFilterContainer>,
    ],
    [
      768,
      <DekstopFilterContainer
        content={content}
        key={"desktop-filter-container"}
      >
        {children}
      </DekstopFilterContainer>,
    ],
  ];

  const sortedContainers = containers.sort((a, b) => a[0] - b[0]);

  const getComponentIndex = useCallback(() => {
    let index = 0;
    sortedContainers.forEach(([breakpoint], i) => {
      const windowWidth = typeof window === "undefined" ? 0 : window.innerWidth;
      if (breakpoint <= windowWidth) {
        index = i;
      }
    });
    return index > -1 ? index : 0;
  }, [sortedContainers]);

  const [selectedComponentIndex, setSelectedComponentIndex] =
    useState<number>(1);

  useEffect(() => {
    setSelectedComponentIndex(getComponentIndex());
  }, [getComponentIndex]);

  useEffect(() => {
    function handleWindowResize() {
      setSelectedComponentIndex(getComponentIndex());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [getComponentIndex]);

  return containers[selectedComponentIndex][1];
}
