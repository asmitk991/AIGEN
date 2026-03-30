import { useState, useEffect } from 'react';

const HISTORY_KEY = 'content_history';

export const useHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(HISTORY_KEY);
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse history', e);
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = (item) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, 50); // Keep last 50
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
    
    return newItem;
  };

  const deleteFromHistory = (id) => {
    if (window.confirm('Are you sure you want to delete this from your history?')) {
      setHistory(prev => {
        const updated = prev.filter(item => item.id !== id);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear your entire history?')) {
      localStorage.removeItem(HISTORY_KEY);
      setHistory([]);
    }
  };

  return {
    history,
    addToHistory,
    deleteFromHistory,
    clearHistory
  };
};
