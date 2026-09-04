"use client";

import * as React from "react";

import { useResource } from "@/hooks/use-resource";
import { projectsService } from "@/services";
import type { Project, Technology } from "@/services/types";

export type { Project, Technology };

interface UseProjectsReturn {
  projects: Project[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Reads projects through the projects service.
 *
 * The `{ items, loading, error, refetch }` shape is kept as-is so the admin and
 * public pages that already consume it need no change; what moved is where the
 * request is built and how failures are shaped.
 */
export function useProjects(status?: string): UseProjectsReturn {
  const { data, error, isLoading, refetch } = useResource<Project[]>(
    (signal) => projectsService.list(status, signal),
    [status],
  );

  return {
    // A null `data` is "not loaded yet"; callers map over the list either way.
    projects: React.useMemo(() => data ?? [], [data]),
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
