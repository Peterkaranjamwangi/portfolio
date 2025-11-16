import { useState, useEffect } from 'react';

export interface Skill {
  id: number;
  label: string;
  type: 'TECHNICAL' | 'SOFT';
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

interface UseSkillsReturn {
  skills: Skill[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSkills(type?: 'TECHNICAL' | 'SOFT'): UseSkillsReturn {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = type
        ? `/api/skills?type=${type}`
        : '/api/skills';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch skills');
      }

      const data = await response.json();
      setSkills(data.skills || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [type]);

  return { skills, loading, error, refetch: fetchSkills };
}
