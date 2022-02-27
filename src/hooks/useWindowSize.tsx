import { useState, useEffect, useLayoutEffect } from "react";
import { debounce } from "lodash";

interface WindowPropInterface {
  width: number | null;
  height: number | null;
}
// Hook
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState<WindowPropInterface>({
    width: window.innerWidth,
    height: null,
  });

  const delayedQueryCall = debounce(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, 200);

  // Handler to call on window resize

  useEffect(() => {
    // Add event listener
    window.addEventListener("resize", delayedQueryCall);

    // Call handler right away so state gets updated with initial window size
    delayedQueryCall();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", delayedQueryCall);
  }, []); // Empty array ensures that effect is only run on mount

  useLayoutEffect(():any => {
    const window = {
      type: "desktop",
      collapsed: false,
    };

    if (windowSize.width && windowSize.width > 1200) {
      //On bigger screens (>1200px) - it defaults to open
      window.type = "desktop";
      window.collapsed = false;

    } else if (
      windowSize.width &&
      windowSize.width < 1200 &&
      windowSize.width > 766
    ) {
      // On smaller screens (1200px>, tablets) - it will default to collapse
      window.type = "tablet";
      window.collapsed = true;
    } else {
      // On mobile screens - it will default to hidden(collapsed)
      window.type = "mobile";
      window.collapsed = true;
    }
    localStorage.setItem("sidebarParams", JSON.stringify(window));
  }, [windowSize.width]);

  return windowSize;
}