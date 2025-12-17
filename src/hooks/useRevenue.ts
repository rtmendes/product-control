import { useState, useEffect } from 'react';

export const useRevenue = () => {
  const [goals, setGoals] = useState([]);

  const fetchGoals = async () => {
    const res = await fetch('/api/revenue');
    const data = await res.json();
    setGoals(data);
  };

  useEffect(() => { fetchGoals(); }, []);

  return { goals, refetch: fetchGoals };
};
