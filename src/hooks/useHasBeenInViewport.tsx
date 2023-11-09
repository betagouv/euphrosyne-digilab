// Credit : https://tinloof.com/blog/how-to-create-scroll-animations-with-1-react-hook
import React, { useEffect, useState } from "react";

export default function useHasBeenInViewport(
  ref: React.RefObject<HTMLElement>,
) {
  const elementInViewPort = (element: React.RefObject<HTMLElement>) => {
    if (!element.current) return false;
    const { bottom } = element.current.getBoundingClientRect();
    return bottom - window.innerHeight < 170;
  };

  const [isInViewPort, setIsInViewport] = useState(elementInViewPort(ref));

  useEffect(() => {
    function handleScroll() {
      if (!isInViewPort) {
        setIsInViewport(elementInViewPort(ref));
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [ref, isInViewPort]);

  return isInViewPort;
}
