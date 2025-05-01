import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useBookmarks = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState<number[]>([]);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    } else {
      setBookmarkedItems([]);
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      const response = await api.bookmarks.getAll();
      setBookmarkedItems(response.item_ids);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    }
  };

  const toggleBookmark = async (itemId: number) => {
    try {
      if (isBookmarked(itemId)) {
        await api.bookmarks.remove(itemId);
        setBookmarkedItems(prev => prev.filter(id => id !== itemId));
      } else {
        await api.bookmarks.add(itemId);
        setBookmarkedItems(prev => [...prev, itemId]);
      }
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      throw error;
    }
  };

  const isBookmarked = (itemId: number): boolean => {
    return bookmarkedItems.includes(itemId);
  };

  return {
    bookmarkedItems,
    isBookmarked,
    toggleBookmark,
    refreshBookmarks: fetchBookmarks,
  };
}; 