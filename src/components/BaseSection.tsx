/** Section with padding */
import React from "react";

import styles from "./BaseSection.module.css";

export function BaseSection({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`fr-container fr-container--fluid ${styles.baseSection} ${className}`}
    >
      {children}
    </div>
  );
}
