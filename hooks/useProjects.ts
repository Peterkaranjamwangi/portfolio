import { useState, useEffect } from 'react';

interface Technology {
  id: number;
  label: string;
  value: number;
  icon?: string;
  href?: string;
  category: string;
}

export interface Project {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  github?: string;
  link: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'ARCHIVED';
  order: number;
  technologies: Technology[];
  createdAt: string;
  updatedAt: string;
}

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProjects(status?: string): UseProjectsReturn {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = status
        ? `/api/projects?status=${status}`
        : '/api/projects';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.projects || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [status]);

  return { projects, loading, error, refetch: fetchProjects };
}
