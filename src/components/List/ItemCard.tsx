import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Item } from '../../types';
import { useAuth } from '../Auth/AuthContext';
import { useBookmarks } from '../../hooks/useBookmarks';
import FadeIn from '../Common/FadeIn';

interface ItemCardProps {
  item: Item;
  index: number;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, index }) => {
  const { isAuthenticated } = useAuth();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmarkClick = async () => {
    if (!isAuthenticated) {
      alert('請先登入才能收藏項目');
      return;
    }

    setIsLoading(true);
    try {
      await toggleBookmark(item.id);
    } catch (error) {
      alert('操作失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="item-card"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="item-image-container">
          <img src={item.imageUrl} alt={item.title} className="item-image" />
          {isAuthenticated && (
            <motion.button
              className={`bookmark-button ${isBookmarked(item.id) ? 'bookmarked' : ''}`}
              onClick={handleBookmarkClick}
              disabled={isLoading}
              whileTap={{ scale: 0.95 }}
            >
              {isBookmarked(item.id) ? '❤️' : '🤍'}
            </motion.button>
          )}
        </div>
        <div className="item-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="category">{item.category}</span>
          {item.videoUrl && (
            <a 
              href={item.videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="video-link"
            >
              觀看影片 📺
            </a>
          )}
        </div>
      </motion.div>
    </FadeIn>
  );
};

export default ItemCard; 