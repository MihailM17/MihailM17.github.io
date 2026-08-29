import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectSchema = z.object({
  slug: z.string(),
  index: z.string(),
  title: z.string(),
  titleEn: z.string().optional(),
  year: z.string(),
  kicker: z.string(),
  meta: z.string(),
  youtubeUrl: z.string().url(),
  thumb: z.string().url(),
  cover: z.string().url(),
  synopsis: z.string(),
  story: z.array(z.string()),
  specs: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  gallery: z.array(z.object({
    src: z.string(),
    caption: z.string(),
    alt: z.string(),
  })),
});

const siteContentSchema = z.object({
  siteTitle: z.string(),
  hero: z.object({
    eyebrow: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    sub: z.string(),
    meta: z.string(),
  }),
  about: z.object({
    kicker: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    lead: z.string(),
    p1: z.string(),
    p2: z.string(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    lang: z.string(),
    portraitAlt: z.string(),
  }),
  narrative: z.object({
    kicker: z.string(),
    index: z.string(),
    count: z.string(),
    hint: z.string(),
  }),
  commercial: z.object({
    kicker: z.string(),
    index: z.string(),
    count: z.string(),
    hint: z.string(),
    jobs: z.array(z.object({
      org: z.string(),
      role: z.string(),
      years: z.string(),
      desc: z.string(),
      items: z.array(z.object({
        url: z.string(),
        thumb: z.string(),
        label: z.string(),
        isVertical: z.boolean().optional(),
      })),
      detail: z.object({
        slug: z.string(),
        title: z.string(),
        role: z.string(),
        years: z.string(),
        synopsis: z.string().optional(),
        description: z.string(),
        gallery: z.array(z.object({
          src: z.string(),
          caption: z.string(),
          alt: z.string(),
        })),
      }).optional(),
    })),
    credits: z.array(z.object({
      org: z.string(),
      role: z.string(),
      note: z.string().optional(),
    })),
  }),
  gallery: z.object({
    eyebrow: z.string(),
    title: z.string(),
    hint: z.string(),
    items: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      caption: z.string(),
      year: z.string(),
    })),
  }),
  craft: z.object({
    kicker: z.string(),
    title: z.string(),
    nowKicker: z.string(),
    nowTitle: z.string(),
    tags: z.array(z.string()),
    approachKicker: z.string(),
    approachText: z.string(),
    approachNote: z.string().optional(),
  }),
  contact: z.object({
    kicker: z.string(),
    title: z.string(),
    titleAccent: z.string().optional(),
    lede: z.string(),
    email: z.string().email(),
    instagram: z.string().url(),
    linkedin: z.string().url(),
    formNote: z.string(),
  }),
  footer: z.string(),
  nav: z.array(z.object({
    href: z.string(),
    label: z.string(),
    sub: z.string().optional(),
  })),
});

export const collections = {
  projects: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/projects' }),
    schema: projectSchema,
  }),
  site: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/site' }),
    schema: siteContentSchema,
  }),
};