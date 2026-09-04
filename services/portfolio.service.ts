import { apiDelete, apiGet, apiPatch, apiPost } from "@/lib/api-client";
import type {
  Post,
  Project,
  Service,
  Skill,
  SkillType,
  Technology,
} from "@/services/types";

/**
 * The portfolio content endpoints.
 *
 * One module per resource would be five files of four lines each; grouping them
 * keeps the shared shape — list unwraps the envelope, mutations take an id —
 * visible in one place. Every call goes through the single HTTP client, so a
 * failure anywhere in here arrives as an `ApiError`.
 */

/** The API answers lists as `{ projects: [...], count }`; callers want the array. */
function unwrap<T>(payload: Record<string, unknown>, key: string): T[] {
  const value = payload?.[key];
  return Array.isArray(value) ? (value as T[]) : [];
}

export const projectsService = {
  async list(status?: string, signal?: AbortSignal): Promise<Project[]> {
    const payload = await apiGet<Record<string, unknown>>("/api/projects", {
      query: { status },
      signal,
    });
    return unwrap<Project>(payload, "projects");
  },

  create: (project: unknown) => apiPost<{ project: Project }>("/api/projects", project),
  update: (id: number, project: unknown) =>
    apiPatch<{ project: Project }>(`/api/projects/${id}`, project),
  remove: (id: number) => apiDelete<unknown>(`/api/projects/${id}`),
};

export const skillsService = {
  async list(type?: SkillType, signal?: AbortSignal): Promise<Skill[]> {
    const payload = await apiGet<Record<string, unknown>>("/api/skills", {
      query: { type },
      signal,
    });
    return unwrap<Skill>(payload, "skills");
  },

  create: (skill: unknown) => apiPost<{ skill: Skill }>("/api/skills", skill),
  update: (id: number, skill: unknown) =>
    apiPatch<{ skill: Skill }>(`/api/skills/${id}`, skill),
  remove: (id: number) => apiDelete<unknown>(`/api/skills/${id}`),
};

export const servicesService = {
  async list(signal?: AbortSignal): Promise<Service[]> {
    const payload = await apiGet<Record<string, unknown>>("/api/services", { signal });
    return unwrap<Service>(payload, "services");
  },

  create: (service: unknown) => apiPost<{ service: Service }>("/api/services", service),
  update: (id: number, service: unknown) =>
    apiPatch<{ service: Service }>(`/api/services/${id}`, service),
  remove: (id: number) => apiDelete<unknown>(`/api/services/${id}`),
};

export const technologiesService = {
  async list(category?: string, signal?: AbortSignal): Promise<Technology[]> {
    const payload = await apiGet<Record<string, unknown>>("/api/technologies", {
      query: { category },
      signal,
    });
    return unwrap<Technology>(payload, "technologies");
  },

  create: (technology: unknown) =>
    apiPost<{ technology: Technology }>("/api/technologies", technology),
  update: (id: number, technology: unknown) =>
    apiPatch<{ technology: Technology }>(`/api/technologies/${id}`, technology),
  remove: (id: number) => apiDelete<unknown>(`/api/technologies/${id}`),
};

export const postsService = {
  async list(status?: string, signal?: AbortSignal): Promise<Post[]> {
    const payload = await apiGet<Record<string, unknown>>("/api/posts", {
      query: { status },
      signal,
    });
    return unwrap<Post>(payload, "posts");
  },

  create: (post: unknown) => apiPost<{ post: Post }>("/api/posts", post),
  update: (id: number, post: unknown) => apiPatch<{ post: Post }>(`/api/posts/${id}`, post),
  remove: (id: number) => apiDelete<unknown>(`/api/posts/${id}`),
};
