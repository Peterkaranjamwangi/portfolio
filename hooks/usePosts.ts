"use client";

import * as React from "react";

import { useResource } from "@/hooks/use-resource";
import { postsService } from "@/services";
import type { Author, Category, Post, Tag } from "@/services/types";

export type { Author, Category, Post, Tag };

interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function usePosts(status?: string): UsePostsReturn {
  const { data, error, isLoading, refetch } = useResource<Post[]>(
    (signal) => postsService.list(status, signal),
    [status],
  );

  return {
    posts: React.useMemo(() => data ?? [], [data]),
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
