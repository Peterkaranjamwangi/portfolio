"use client";

import * as React from "react";

import { useResource } from "@/hooks/use-resource";
import { technologiesService } from "@/services";
import type { Technology } from "@/services/types";

export type { Technology };

interface UseTechnologiesReturn {
  technologies: Technology[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTechnologies(category?: string): UseTechnologiesReturn {
  const { data, error, isLoading, refetch } = useResource<Technology[]>(
    (signal) => technologiesService.list(category, signal),
    [category],
  );

  return {
    technologies: React.useMemo(() => data ?? [], [data]),
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
