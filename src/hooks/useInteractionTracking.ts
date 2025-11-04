import { useEffect, useState } from "react";

/**
 * Track user interactions to detect bot behavior
 * Real users interact with the form naturally
 */
export function useInteractionTracking() {
  const [interactionCount, setInteractionCount] = useState(0);

  useEffect(() => {
    const handleInteraction = () => {
      setInteractionCount((prev) => prev + 1);
    };

    // Track clicks, typing, and mouse movement
    document.addEventListener("click", handleInteraction);
    document.addEventListener("keydown", handleInteraction);
    document.addEventListener("mousemove", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("mousemove", handleInteraction);
    };
  }, []);

  return interactionCount;
}
