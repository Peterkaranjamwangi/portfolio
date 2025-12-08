import { useState, useEffect } from 'react';

interface Author {
  id: number;
  name: string | null;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface Tag {
  id: number;
  name: string;
}

export interface Post {
  id: number;
  title: string;
  subtitle: string | null;
  content: string;
  slug: string;
  image: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  publishedAt: string | null;
  author: Author;
  categories: Category[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePosts(status?: string): UsePostsReturn {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const url = status
        ? `/api/posts?status=${status}`
        : '/api/posts';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }

      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [status]);

  return { posts, loading, error, refetch: fetchPosts };
}
