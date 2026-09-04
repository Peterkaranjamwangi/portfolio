"use client";

import * as React from "react";

import { useResource } from "@/hooks/use-resource";
import { skillsService } from "@/services";
import type { Skill, SkillType } from "@/services/types";

export type { Skill };

interface UseSkillsReturn {
  skills: Skill[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useSkills(type?: SkillType): UseSkillsReturn {
  const { data, error, isLoading, refetch } = useResource<Skill[]>(
    (signal) => skillsService.list(type, signal),
    [type],
  );

  return {
    skills: React.useMemo(() => data ?? [], [data]),
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
