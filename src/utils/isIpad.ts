import { useState, useEffect } from "react";

export const IsDeviceIpad = () => {
  const [isIpadPortrait, setIsIpadPortrait] = useState(() => {
    if (typeof window === "undefined") return false;

    const isIpad =
      /ipad|macintosh/i.test(navigator.userAgent) && "ontouchend" in document;

    if (!isIpad) return false;

    return window.matchMedia("(orientation: portrait)").matches;
  });

  useEffect(() => {
    const checkOrientation = () => {
      const isIpad =
        /ipad|macintosh/i.test(navigator.userAgent) && "ontouchend" in document;
      if (isIpad) {
        const isPortrait = window.matchMedia("(orientation: portrait)").matches;
        setIsIpadPortrait(isPortrait);
      }
    };

    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);

  return isIpadPortrait;
};
