
import { useState, useEffect } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
}

const Confetti: React.FC<ConfettiProps> = ({ active, duration = 3000 }) => {
  const [pieces, setPieces] = useState<{ id: number; color: string; size: number; x: number; delay: number }[]>([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (active && !isActive) {
      setIsActive(true);
      
      // Create confetti pieces
      const newPieces = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        color: `hsl(${Math.random() * 360}, 70%, 60%)`,
        size: Math.random() * 8 + 4,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      
      setPieces(newPieces);
      
      // Cleanup after duration
      const timer = setTimeout(() => {
        setIsActive(false);
        setPieces([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [active, duration, isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: "-20px",
            backgroundColor: piece.color,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            borderRadius: Math.random() > 0.5 ? "50%" : "0",
            animationDuration: `${Math.random() * 3 + 1}s`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
