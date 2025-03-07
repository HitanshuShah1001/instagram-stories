
export interface Story {
  id: string;
  imageUrl: string;
  username: string;
  timestamp: string;
}

export interface StoriesGroup {
  userId: string;
  username: string;
  profilePic: string;
  stories: Story[];
}
