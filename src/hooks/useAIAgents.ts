import { useState, useEffect } from 'react';

export const useAIAgents = () => {
  const [agents, setAgents] = useState({});

  const fetchStatus = async () => {
    const res = await fetch('/api/ai-agents/status');
    const data = await res.json();
    setAgents(data);
  };

  useEffect(() => { fetchStatus(); }, []);

  return { agents, refetch: fetchStatus };
};
