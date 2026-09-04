/**
 * The shapes the JSON API returns.
 *
 * These live with the services rather than with the hooks that used to declare
 * them: a type describes what the endpoint sends back, which is the service's
 * concern. Hooks re-export them so existing imports keep working.
 */

export type ProjectStatus = "COMPLETED" | "IN_PROGRESS" | "ARCHIVED";
export type SkillType = "TECHNICAL" | "SOFT";
export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type TechCategory =
  | "DESIGN"
  | "FRONTEND"
  | "BACKEND"
  | "DATABASE"
  | "DEVOPS"
  | "GENERAL";

export interface Technology {
  id: number;
  label: string;
  value: number;
  icon?: string;
  href?: string;
  category: TechCategory;
  _count?: { projects: number };
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  shortDescription: string;
  image: string;
  github?: string;
  link: string;
  status: ProjectStatus;
  order: number;
  technologies: Technology[];
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  label: string;
  type: SkillType;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  id: number;
  name: string | null;
  email: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Tag {
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
  status: PostStatus;
  publishedAt: string | null;
  author: Author;
  categories: Category[];
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}
