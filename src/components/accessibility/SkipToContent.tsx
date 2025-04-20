
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const SkipToContent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show skip link on Tab press
      if (e.key === "Tab" && !e.shiftKey && document.activeElement === document.body) {
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSkip = () => {
    // Find main content and focus it
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.tabIndex = -1;
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleSkip}
      className="absolute left-4 top-4 z-50 translate-y-[-120%] transition-transform focus:translate-y-0"
      variant="default"
    >
      Skip to main content
    </Button>
  );
};

export default SkipToContent;
