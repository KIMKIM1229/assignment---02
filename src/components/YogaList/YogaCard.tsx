import React from 'react';
import { motion } from 'framer-motion';
import { YogaAction } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';

interface YogaCardProps {
  yoga: YogaAction;
  isBookmarked: boolean;
}

const YogaCard: React.FC<YogaCardProps> = ({ yoga, isBookmarked }) => {
  const { isAuthenticated } = useAuth();
  const { toggleBookmark } = useBookmarks();

  const handleBookmarkClick = async () => {
    if (!isAuthenticated) {
      alert('請先登入才能收藏瑜伽動作');
      return;
    }
    await toggleBookmark(yoga.id);
  };

  return (
    <motion.div
      className="yoga-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="yoga-image-container">
        <img src={yoga.imageUrl} alt={yoga.title} className="yoga-image" />
        {isAuthenticated && (
          <button
            className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
            onClick={handleBookmarkClick}
          >
            {isBookmarked ? '❤️' : '🤍'}
          </button>
        )}
      </div>
      
      <div className="yoga-content">
        <h3>{yoga.title}</h3>
        <p className="description">{yoga.description}</p>
        <div className="yoga-info">
          <span className="difficulty">難度: {yoga.difficulty}</span>
          <span className="duration">時長: {yoga.duration}</span>
        </div>
        <div className="category-tag">{yoga.category}</div>
        
        {yoga.videoUrl && (
          <a 
            href={yoga.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            觀看教學影片
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default YogaCard; 