import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    startDate: z.string(),
    role: z.string(),
    difficulty: z.enum(['Beginner', 'Easy', 'Medium', 'Hard', 'Expert']),
    featured: z.boolean().default(false),
    order: z.number(),
    techStack: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string()),
      }),
    ),
    features: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        impact: z.string().optional(),
      }),
    ),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
        }),
      )
      .optional(),
    screenshots: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string(),
        }),
      )
      .optional(),
    links: z.array(
      z.object({
        type: z.enum(['github', 'demo', 'live', 'documentation']),
        url: z.string().url(),
        label: z.string(),
      }),
    ),
    ogImage: z.string().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
  }),
});

export const collections = { projects, blog };
