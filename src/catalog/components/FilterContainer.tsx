import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

function DekstopFilterContainer({ children }: { children?: React.ReactNode }) {
  return (
    <aside
      css={css`
        width: 30%;
        max-width: 400px;
        background-color: ${fr.colors.decisions.background.alt.grey.default};
      `}
    >
      <div className="fr-container fr-pt-5w">
        <h3>Filtrer</h3>
        {children}
      </div>
    </aside>
  );
}

function MobileFilterContainer({ children }: { children?: React.ReactNode }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
          Filtrer les résultats
          <i
            className={fr.cx("fr-icon-arrow-down-s-line", "fr-ml-3w")}
            aria-hidden={true}
          />
        </button>
        {isFilterOpen && <div>{children}</div>}
      </div>
    </div>
  );
}

// Just a UI wrapper for the filter container
export default function FilterContainer({
  children,
}: {
  children?: React.ReactNode;
}) {
  const containers: [number, React.ReactElement][] = [
      [0, <MobileFilterContainer>{children}</MobileFilterContainer>],
      [768, <DekstopFilterContainer>{children}</DekstopFilterContainer>],
    ],
    sortedContainers = containers.sort((a, b) => a[0] - b[0]);
  function getComponentIndex() {
    let index = 0;
    sortedContainers.forEach(([breakpoint, _], i) => {
      if (breakpoint <= window.innerWidth) {
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
