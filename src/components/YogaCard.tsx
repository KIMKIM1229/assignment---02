import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface YogaItem {
  id: number;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl: string;
  difficulty: string;
  duration: string;
  benefits: string[];
}

interface YogaCardProps {
  item: YogaItem;
  isBookmarked: boolean;
  onBookmarkToggle: (id: number) => void;
}

const YogaCard: React.FC<YogaCardProps> = ({ item, isBookmarked, onBookmarkToggle }) => {
  const { isLoggedIn } = useAuth();

  const handleBookmarkClick = () => {
    onBookmarkToggle(item.id);
  };

  return (
    <div className="yoga-card">
      {item.imageUrl && (
        <div className="yoga-image-container">
          <img src={item.imageUrl} alt={item.title} className="yoga-image" />
          {isLoggedIn && (
            <button
              onClick={handleBookmarkClick}
              className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`}
            >
              {isBookmarked ? '❤️' : '🤍'}
            </button>
          )}
        </div>
      )}
      
      <div className="yoga-content">
        <h3>{item.title}</h3>
        <div className="yoga-info">
          <span className="difficulty">難度：{item.difficulty}</span>
          <span className="duration">時長：{item.duration}</span>
          <span className="category">類別：{item.category}</span>
        </div>
        
        <p className="description">{item.description}</p>
        
        {item.benefits && item.benefits.length > 0 && (
          <div className="benefits">
            <h4>效果：</h4>
            <ul>
              {item.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        
        {item.videoUrl && (
          <a 
            href={item.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
          >
            觀看教學影片 📺
          </a>
        )}
      </div>
    </div>
  );
};

export default YogaCard; 