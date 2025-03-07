import React, { useState, useEffect, useCallback, useRef } from "react";
import { StoriesGroup } from "../types";
import ProgressBar from "./Progressbar";
import NavigationControls from "./NavigationControls";
import "../styles/StoryViewer.css";

interface StoryViewerProps {
  storiesGroups: StoriesGroup[];
  initialGroupIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({
  storiesGroups,
  initialGroupIndex,
  onClose,
}) => {
  const [groupIndex, setGroupIndex] = useState(initialGroupIndex);
  const [storyIndex, setStoryIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [direction, setDirection] = useState<'prev' | 'next' | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const currentGroup = storiesGroups[groupIndex];
  const currentStory = currentGroup?.stories[storyIndex];

  // Preload the next story image
  useEffect(() => {
    if (!currentStory) return;

    setLoading(true);
    const img = new Image();
    img.src = currentStory.imageUrl;
    img.onload = () => {
      setLoading(false);
    };
  }, [currentStory]);

  // Handle animation effect
  useEffect(() => {
    if (direction && imageRef.current) {
      // Add animation class
      imageRef.current.classList.add(`slide-${direction}`);
      
      // Remove animation class after animation completes
      const timeout = setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.classList.remove(`slide-${direction}`);
        }
        setDirection(null);
      }, 300); // Match this with CSS animation duration
      
      return () => clearTimeout(timeout);
    }
  }, [direction, currentStory]);

  const goToNextStory = useCallback(() => {
    // Set direction for animation
    setDirection('next');
    
    // If there are more stories in the current group
    if (storyIndex < currentGroup.stories.length - 1) {
      setStoryIndex(storyIndex + 1);
    }
    // If there are more groups
    else if (groupIndex < storiesGroups.length - 1) {
      setGroupIndex(groupIndex + 1);
      setStoryIndex(0);
    }
    // If we've reached the end
    else {
      onClose();
    }
  }, [storyIndex, groupIndex, currentGroup, storiesGroups, onClose]);

  const goToPrevStory = useCallback(() => {
    // Set direction for animation
    setDirection('prev');
    
    // If there are previous stories in the current group
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1);
    }
    // If there are previous groups
    else if (groupIndex > 0) {
      setGroupIndex(groupIndex - 1);
      setStoryIndex(storiesGroups[groupIndex - 1].stories.length - 1);
    }
  }, [storyIndex, groupIndex, storiesGroups]);

  // Exit if we don't have valid data
  if (!currentGroup || !currentStory) {
    return null;
  }

  return (
    <div className="story-viewer">
      <div className="story-header">
        <div className="progress-bars">
          {currentGroup.stories.map((_, index) => (
            <ProgressBar
              key={index}
              duration={5}
              index={index}
              activeIndex={storyIndex}
              onComplete={goToNextStory}
            />
          ))}
        </div>
        <div className="story-user-info">
          <img
            src={currentGroup.profilePic}
            alt={currentGroup.username}
            className="story-user-avatar"
          />
          <span className="story-user-name">{currentGroup.username}</span>
          <span className="story-timestamp">{currentStory.timestamp}</span>
        </div>
      </div>

      <div className="story-content">
        {loading ? (
          <div className="story-loading">Loading...</div>
        ) : (
          <img
            ref={imageRef}
            src={currentStory.imageUrl}
            alt="Story"
            className="story-image"
          />
        )}
        <NavigationControls
          onPrev={goToPrevStory}
          onNext={goToNextStory}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default StoryViewer;