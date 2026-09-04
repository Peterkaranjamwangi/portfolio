"use client";

import * as React from "react";

import { useResource } from "@/hooks/use-resource";
import { servicesService } from "@/services";
import type { Service } from "@/services/types";

export type { Service };

interface UseServicesReturn {
  services: Service[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useServices(): UseServicesReturn {
  const { data, error, isLoading, refetch } = useResource<Service[]>(
    (signal) => servicesService.list(signal),
    [],
  );

  return {
    services: React.useMemo(() => data ?? [], [data]),
    loading: isLoading,
    error: error?.message ?? null,
    refetch,
  };
}
