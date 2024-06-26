import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring";
import useMeasure from "react-use-measure";

import { ContentProps } from "../../i18n";

export interface FilterContainerContent {
  filterResults: string;
  filter: string;
}

function DekstopFilterContainer({
  children,
  content,
}: { children?: React.ReactNode } & ContentProps<FilterContainerContent>) {
  return (
    <aside
      css={css`
        width: 30%;
        max-width: 400px;
        background-color: ${fr.colors.decisions.background.alt.grey.default};
        min-height: 800px;
      `}
    >
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
  const [ref, { height: viewHeight }] = useMeasure();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const style = useSpring({
    from: { height: 0, opacity: 0, y: 0 },
    to: {
      height: isFilterOpen ? viewHeight : 0,
      opacity: isFilterOpen ? 1 : 0,
      y: isFilterOpen ? 0 : -10,
    },
  });

  return (
    <div
      css={css`
        width: 100%;
        ${fr.breakpoints.up("md")} {
          width: 30%;
          max-width: 400px;
          background-color: ${fr.colors.decisions.background.alt.grey.default};
        }
      `}
    >
      <div className="fr-container fr-pt-5w">
        <button
          css={css`
            width: 100% !important;
            justify-content: center;
          `}
          className={fr.cx("fr-btn", "fr-btn--tertiary-no-outline")}
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
        <animated.div style={style}>
          <div ref={ref}>{children}</div>
        </animated.div>
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
        <MobileFilterContainer content={content}>
          {children}
        </MobileFilterContainer>,
      ],
      [
        768,
        <DekstopFilterContainer content={content}>
          {children}
        </DekstopFilterContainer>,
      ],
    ],
    sortedContainers = containers.sort((a, b) => a[0] - b[0]);
  function getComponentIndex() {
    let index = 0;
    sortedContainers.forEach(([breakpoint], i) => {
      const windowWidth = typeof window === "undefined" ? 0 : window.innerWidth;
      if (breakpoint <= windowWidth) {
        index = i;
      }
    });
    return index > -1 ? index : 0;
  }
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<number>(
    getComponentIndex(),
  );

  useEffect(() => {
    function handleWindowResize() {
      setSelectedComponentIndex(getComponentIndex());
    }
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return containers[selectedComponentIndex][1];
}
