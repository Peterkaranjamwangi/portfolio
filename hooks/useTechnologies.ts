import { useState, useEffect } from 'react';

export interface Technology {
  id: number;
  label: string;
  value: number;
  icon?: string;
  href?: string;
  category: 'DESIGN' | 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'GENERAL';
  _count?: {
    projects: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface UseTechnologiesReturn {
  technologies: Technology[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTechnologies(category?: string): UseTechnologiesReturn {
  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = category
        ? `/api/technologies?category=${category}`
        : '/api/technologies';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch technologies');
      }

      const data = await response.json();
      setTechnologies(data.technologies || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching technologies:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnologies();
  }, [category]);

  return { technologies, loading, error, refetch: fetchTechnologies };
}
