import React, { useEffect, useState, useRef } from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  duration: number;
  index: number;
  activeIndex: number;
  onComplete: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  index,
  activeIndex,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset progress when active index changes
  useEffect(() => {
    // If this is not the active bar, set it to 0 or 100 based on position
    if (index !== activeIndex) {
      setProgress(index < activeIndex ? 100 : 0);
      return;
    }

    // Reset progress for the active bar
    setProgress(0);

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Start a new interval
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }

          // Schedule onComplete to run after the current render cycle
          setTimeout(() => {
            onComplete();
          }, 0);

          return 100;
        }
        return prev + 100 / (duration * 10);
      });
    }, 100);

    // Clean up interval on unmount or when activeIndex changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeIndex, duration, index, onComplete]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
