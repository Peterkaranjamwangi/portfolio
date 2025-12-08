import { z } from 'zod';
import { ProjectStatus, SkillType, TechCategory, PostStatus } from '@prisma/client';

// Project schemas
export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  shortDescription: z.string().min(1, 'Description is required').max(500, 'Description is too long'),
  image: z.string().url('Must be a valid URL'),
  github: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  link: z.string().url('Must be a valid URL'),
  status: z.nativeEnum(ProjectStatus),
  order: z.number().int().min(0).default(0),
  technologyIds: z.array(z.number()).optional(),
});

export const projectUpdateSchema = projectSchema.partial();

// Skill schemas
export const skillSchema = z.object({
  label: z.string().min(1, 'Label is required').max(100, 'Label is too long'),
  type: z.nativeEnum(SkillType),
  icon: z.string().max(50, 'Icon name is too long').optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
});

export const skillUpdateSchema = skillSchema.partial();

// Service schemas
export const serviceSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description is too long'),
  icon: z.string().max(50, 'Icon name is too long').optional().or(z.literal('')),
  order: z.number().int().min(0).default(0),
});

export const serviceUpdateSchema = serviceSchema.partial();

// Technology schemas
export const technologySchema = z.object({
  label: z.string().min(1, 'Label is required').max(100, 'Label is too long'),
  value: z.number().int().min(0).max(100, 'Proficiency must be between 0-100'),
  icon: z.string().max(50, 'Icon name is too long').optional().or(z.literal('')),
  href: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  category: z.nativeEnum(TechCategory),
});

export const technologyUpdateSchema = technologySchema.partial();

// Post schemas
export const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  subtitle: z.string().max(300, 'Subtitle is too long').optional().or(z.literal('')),
  content: z.string().min(1, 'Content is required'),
  slug: z.string()
    .min(1, 'Slug is required')
    .max(200, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens only'),
  image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  status: z.nativeEnum(PostStatus),
  authorId: z.number().int().positive('Author ID is required'),
  categoryIds: z.array(z.number()).optional(),
  tagIds: z.array(z.number()).optional(),
});

export const postUpdateSchema = postSchema.partial().omit({ authorId: true });

// Type exports for frontend use
export type ProjectFormData = z.infer<typeof projectSchema>;
export type SkillFormData = z.infer<typeof skillSchema>;
export type ServiceFormData = z.infer<typeof serviceSchema>;
export type TechnologyFormData = z.infer<typeof technologySchema>;
export type PostFormData = z.infer<typeof postSchema>;
