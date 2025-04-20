
import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const KeyboardNavTip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Show the tip when user is navigating with keyboard
      if ((e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !dismissed) {
        setIsVisible(true);
        
        // Hide tip after 5 seconds
        const timer = setTimeout(() => {
          setIsVisible(false);
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismissed]);
  
  const handleDismiss = () => {
    setIsVisible(false);
    setDismissed(true);
    
    // Store preference in localStorage
    try {
      localStorage.setItem('keyboard-nav-tip-dismissed', 'true');
    } catch (error) {
      console.error('Error saving preference to localStorage:', error);
    }
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 animate-fade-in">
      <TooltipProvider>
        <Tooltip open={true}>
          <TooltipTrigger asChild>
            <div className="bg-primary text-primary-foreground p-4 rounded-lg shadow-lg max-w-xs">
              <p className="text-sm mb-2">
                <strong>Keyboard Tip:</strong> Use Tab to navigate, Space/Enter to select, and Esc to cancel.
              </p>
              <Button size="sm" onClick={handleDismiss} variant="secondary" className="w-full">
                Got it
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Press Tab to navigate between elements</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default KeyboardNavTip;
