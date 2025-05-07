import { useEffect, useState } from "react";

export function useClosableAlert() {
  const [showDataAddedAlert, setshowDataAddedAlert] = useState(false);
  const [hideAlertTimeout, setHideAlertTimeout] =
    useState<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (hideAlertTimeout) {
      clearTimeout(hideAlertTimeout);
    }
    if (showDataAddedAlert) {
      const timeout = setTimeout(() => setshowDataAddedAlert(false), 6000);
      setHideAlertTimeout(timeout);
      return () => clearTimeout(hideAlertTimeout);
    }
  }, [hideAlertTimeout, showDataAddedAlert]);

  return [showDataAddedAlert, setshowDataAddedAlert] as const;
}
