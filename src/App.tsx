import React, { useState, useEffect } from "react";
import StoryList from "./components/StoryList";
import StoryViewer from "./components/StoryViewer";
import { StoriesGroup } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [storiesGroups, setStoriesGroups] = useState<StoriesGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeStoryGroupIndex, setActiveStoryGroupIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    // Simulating fetch from an external file
    const fetchStories = async () => {
      try {
        setLoading(true);
        // In a real app, you would use fetch API
        // For this example, we'll import directly
        const data = await import("./data/stories.json");
        setStoriesGroups(data.default);
        setLoading(false);
      } catch (err) {
        setError("Failed to load stories");
        setLoading(false);
        console.error(err);
      }
    };

    fetchStories();
  }, []);

  const handleStoryClick = (userId: string) => {
    const index = storiesGroups.findIndex((group) => group.userId === userId);
    if (index !== -1) {
      setActiveStoryGroupIndex(index);
    }
  };

  const handleCloseViewer = () => {
    setActiveStoryGroupIndex(null);
  };

  // Add no-scroll class to body when story viewer is open
  useEffect(() => {
    if (activeStoryGroupIndex !== null) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [activeStoryGroupIndex]);

  if (loading) {
    return <div className="loading">Loading stories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instagram Stories</h1>
      </header>

      <StoryList
        storiesGroups={storiesGroups}
        onStoryClick={handleStoryClick}
      />

      {activeStoryGroupIndex !== null && (
        <StoryViewer
          storiesGroups={storiesGroups}
          initialGroupIndex={activeStoryGroupIndex}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  );
};

export default App;
