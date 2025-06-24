import { useEffect, useRef, useState } from "react";

export function useClosableAlert() {
  const [showDataAddedAlert, setshowDataAddedAlert] = useState(false);
  const hideAlertTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (showDataAddedAlert) {
      // Clear any previous timeout
      if (hideAlertTimeout.current) {
        clearTimeout(hideAlertTimeout.current);
      }
      hideAlertTimeout.current = setTimeout(
        () => setshowDataAddedAlert(false),
        6000,
      );
      return () => {
        if (hideAlertTimeout.current) {
          clearTimeout(hideAlertTimeout.current);
        }
      };
    }
  }, [showDataAddedAlert]);

  return [showDataAddedAlert, setshowDataAddedAlert] as const;
}
