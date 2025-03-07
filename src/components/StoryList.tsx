import React from "react";
import { StoriesGroup } from "../types";
import "../styles/StoryList.css";

interface StoryListProps {
  storiesGroups: StoriesGroup[];
  onStoryClick: (userId: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({
  storiesGroups,
  onStoryClick,
}) => {
  return (
    <div className="story-list-container">
      <div className="story-list">
        {storiesGroups.map((group) => (
          <div
            key={group.userId}
            className="story-item"
            onClick={() => onStoryClick(group.userId)}
          >
            <div className="story-avatar-container">
              <img
                src={group.profilePic}
                alt={group.username}
                className="story-avatar"
              />
            </div>
            <span className="story-username">{group.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList;
