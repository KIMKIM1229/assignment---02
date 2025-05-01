import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface YogaItemProps {
  item: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
  };
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}

const YogaItem: React.FC<YogaItemProps> = ({ item, isBookmarked, onBookmarkToggle }) => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="yoga-item">
      <h3>{item.title}</h3>
      {/* Add any other necessary components or elements here */}
    </div>
  );
};

export default YogaItem; 