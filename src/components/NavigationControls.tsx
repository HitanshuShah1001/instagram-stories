import React, { useState } from 'react';
import '../styles/NavigationControls.css';

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onClose: () => void;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({ 
  onPrev, 
  onNext, 
  onClose 
}) => {
  const [activeControl, setActiveControl] = useState<'prev' | 'next' | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveControl('prev');
    onPrev();
    // Reset active state after animation completes
    setTimeout(() => setActiveControl(null), 300);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveControl('next');
    onNext();
    // Reset active state after animation completes
    setTimeout(() => setActiveControl(null), 300);
  };

  return (
    <>
      <div 
        className={`navigation-prev ${activeControl === 'prev' ? 'active' : ''}`} 
        onClick={handlePrev} 
      />
      <div 
        className={`navigation-next ${activeControl === 'next' ? 'active' : ''}`} 
        onClick={handleNext} 
      />
      <button 
        className="close-button" 
        onClick={(e) => { 
          e.stopPropagation(); 
          onClose();
        }}
      >
        ×
      </button>
    </>
  );
};

export default NavigationControls;