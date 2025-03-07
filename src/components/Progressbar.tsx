import React, { useEffect, useState, useRef } from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
  duration: number;
  index: number;
  activeIndex: number;
  onComplete: () => void;
  isImageLoaded: boolean;
}
const ProgressBar: React.FC<ProgressBarProps> = ({
  duration,
  index,
  activeIndex,
  onComplete,
  isImageLoaded,
}) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. If this bar is NOT active OR the image isn't loaded, set progress to
    //    100 if it's behind the active story, else 0, then exit.
    if (index !== activeIndex || !isImageLoaded) {
      setProgress(index < activeIndex ? 100 : 0);

      // Clear any existing interval to avoid overlap
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // 2. If this bar IS the active bar AND the image is loaded:
    //    Reset progress and start a new interval
    setProgress(0);

    // Clear any previous interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Completed
          clearInterval(intervalRef.current as NodeJS.Timeout);
          intervalRef.current = null;

          // Trigger onComplete on the next tick
          setTimeout(() => {
            onComplete();
          }, 0);

          return 100;
        }
        return prev + 100 / (duration * 10);
      });
    }, 100);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [activeIndex, duration, index, onComplete, isImageLoaded]);

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
