"use client";

import Button from "@codegouvfr/react-dsfr/Button";
import React, { Children, useState } from "react";

interface ExpandableListProps {
  //renderItem: (item: T, index: number) => React.ReactNode;
  excerptLength: number;
  expandText: string;
  collapseText: string;
  children?: React.ReactNode;
}

export function ExpandableList({
  //renderItem,
  excerptLength,
  expandText: expandText,
  collapseText,
  children,
}: ExpandableListProps) {
  const [showAll, setShowAll] = useState(false);

  //const [visibleItems, setVisibleItems] = useState<T[]>([]);

  return (
    <>
      {showAll ? children : null}
      {children && (
        <div style={{ textAlign: "center", width: "100%" }}>
          <Button
            onClick={() => setShowAll(!showAll)}
            priority="tertiary no outline"
          >
            {showAll
              ? collapseText
              : expandText.replace(
                  "{}",
                  (Children.count(children) - excerptLength).toString(),
                )}
          </Button>
        </div>
      )}
    </>
  );
}
