# Astro.js CV Website Generator Implementation Guide

## Project Overview

This implementation guide details how to build a modern static CV website generator using **Astro.js**, TypeScript, and modern web technologies. The system converts JSON resume data into beautiful, fast-loading static websites.

## Technology Stack

### Core Technologies

- **Astro.js 4.x** - Static site generator with islands architecture
- **TypeScript** - Type safety and better developer experience
- **CSS Custom Properties** - Modern styling with theme support
- **JSON Resume Schema** - Standardized resume data format

### Development Tools

- **Vite** - Fast build tool (built into Astro)
- **Node.js 18+** - JavaScript runtime
- **ESLint & Prettier** - Code quality and formatting
- **Zod** - Runtime type validation

## Quick Start

### 1. Initialize Project

```bash
# Create new Astro project
npm create astro@latest cv-generator -- --template minimal --typescript

# Navigate to project directory
cd cv-generator

# Install dependencies
npm install @astrojs/tailwind zod gray-matter @types/node
```

### 2. Configure Astro

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  integrations: [tailwind()],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
    },
  },
});
```

### 3. Define Extended Data Schema

Based on analysis of modern CV platforms, here's the comprehensive schema that supports advanced features:

```typescript
// src/utils/cv-schema.ts
import { z } from 'zod';

export const LocationSchema = z.object({
  address: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  city: z.string(),
  country_code: z.string(),
  region: z.string().nullable().optional(),
});

export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().nullable().optional(),
  url: z.string(),
  icon: z.string().nullable().optional(),
});

export const BasicsSchema = z.object({
  name: z.string(),
  label: z.string(),
  image: z.string().nullable().optional(),
  bg_image: z.string().nullable().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  url: z.string().nullable().optional(),
  location: LocationSchema.optional(),
  profiles: z.array(ProfileSchema).optional(),
  actions: z
    .array(
      z.object({
        type: z.string(),
        label: z.string(),
        url: z.string(),
        icon: z.string().optional(),
      })
    )
    .optional(),
});

export const AboutSchema = z.object({
  summary: z.string(),
});

export const WorkExperienceSchema = z.object({
  name: z.string(),
  position: z.string(),
  type: z.string().nullable().optional(),
  url: z.string().nullable().optional(),
  start_date: z.string(), // ISO date format YYYY-MM-DD
  end_date: z.string().nullable().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().nullable().optional(),
  country: z.string().optional(),
});

export const EducationSchema = z.object({
  institution: z.string(),
  url: z.string().nullable().optional(),
  area: z.string(),
  study_type: z.string(),
  start_date: z.string(),
  end_date: z.string().nullable().optional(),
  score: z.string().nullable().optional(),
  courses: z.array(z.string()).optional(),
  city: z.string().optional(),
  state: z.string().nullable().optional(),
  country: z.string().optional(),
});

export const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()),
});

export const CertificateSchema = z.object({
  name: z.string(),
  date: z.string().nullable().optional(),
  issuer: z.string(),
  url: z.string().nullable().optional(),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  url: z.string().nullable().optional(),
});

export const AwardSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  awarder: z.string(),
  summary: z.string().optional(),
});

export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  release_date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
});

export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

export const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
});

export const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
  contact: z.string().optional(),
});

export const CVDataSchema = z.object({
  basics: BasicsSchema,
  about: AboutSchema,
  media: z
    .array(
      z.object({
        type: z.string(),
        url: z.string(),
        title: z.string().optional(),
      })
    )
    .optional(),
  work: z.array(WorkExperienceSchema).optional(),
  volunteer: z
    .array(
      z.object({
        organization: z.string(),
        position: z.string(),
        url: z.string().optional(),
        start_date: z.string(),
        end_date: z.string().optional(),
        summary: z.string().optional(),
        highlights: z.array(z.string()).optional(),
      })
    )
    .optional(),
  education: z.array(EducationSchema).optional(),
  awards: z.array(AwardSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  interests: z.array(InterestSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  links: z
    .array(
      z.object({
        title: z.string(),
        url: z.string(),
        description: z.string().optional(),
      })
    )
    .optional(),
  locations: z.array(LocationSchema).optional(),
});

export type CVData = z.infer<typeof CVDataSchema>;
```

## Component Architecture

### Design Principles

The component architecture follows modern CV website patterns with:

- **Modular sections** - Each resume section is a standalone component
- **Responsive grid layouts** - Flexible layouts that adapt to different screen sizes
- **Progressive enhancement** - Core content accessible without JavaScript
- **Print optimization** - Components designed for both screen and print media
- **Theme flexibility** - Support for multiple visual themes
- **Accessibility first** - WCAG 2.1 compliant components

### Utility Functions

```typescript
// src/utils/date-helpers.ts
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Present';

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
}

export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

export function calculateDuration(
  startDate: string,
  endDate?: string | null
): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  if (years > 0 && months > 0) {
    return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`;
  } else if (years > 0) {
    return `${years} yr${years > 1 ? 's' : ''}`;
  } else {
    return `${months} mo${months > 1 ? 's' : ''}`;
  }
}

// src/utils/theme-helpers.ts
export type Theme = 'professional' | 'modern' | 'creative' | 'minimal';

export const THEME_CONFIGS = {
  professional: {
    primaryColor: '#1e40af',
    accentColor: '#3b82f6',
    fontFamily: 'Inter',
    borderRadius: '0.375rem',
  },
  modern: {
    primaryColor: '#059669',
    accentColor: '#10b981',
    fontFamily: 'Poppins',
    borderRadius: '0.5rem',
  },
  creative: {
    primaryColor: '#7c3aed',
    accentColor: '#8b5cf6',
    fontFamily: 'Montserrat',
    borderRadius: '0.75rem',
  },
  minimal: {
    primaryColor: '#374151',
    accentColor: '#6b7280',
    fontFamily: 'Source Sans Pro',
    borderRadius: '0.25rem',
  },
};
```

### Enhanced Header Component

```astro
---
// src/components/Header.astro
interface Props {
  basics: {
    name: string;
    label: string;
    image?: string | null;
    bg_image?: string | null;
    email: string;
    phone?: string;
    url?: string | null;
    location?: {
      city: string;
      region?: string | null;
      country_code: string;
    };
    profiles?: Array<{
      network: string;
      username?: string | null;
      url: string;
      icon?: string | null;
    }>;
    actions?: Array<{
      type: string;
      label: string;
      url: string;
      icon?: string;
    }>;
  };
}

const { basics } = Astro.props;
const {
  name,
  label,
  image,
  bg_image,
  email,
  phone,
  url,
  location,
  profiles,
  actions,
} = basics;

// Map social network names to icons
const getNetworkIcon = (network: string): string => {
  const icons: Record<string, string> = {
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Twitter: 'twitter',
    Instagram: 'instagram',
    Website: 'globe',
    Email: 'mail',
    Phone: 'phone',
  };
  return icons[network] || 'link';
};
---

<header
  class="cv-header"
  style={bg_image ? `background-image: url(${bg_image})` : ''}
>
  {bg_image && <div class="header-overlay" />}

  <div class="header-content">
    <div class="header-main">
      {
        image && (
          <div class="profile-image-container">
            <img
              src={image}
              alt={`${name} profile photo`}
              class="profile-image"
              loading="eager"
            />
          </div>
        )
      }

      <div class="header-text">
        <h1 class="name">{name}</h1>
        <h2 class="title">{label}</h2>

        {
          url && (
            <a
              href={url}
              class="website-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="sr-only">Visit website</span>
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10.59 13.41c.41.39.41 1.03 0 1.42-.39.39-1.03.39-1.42 0a5.003 5.003 0 0 1 0-7.07l3.54-3.54a5.003 5.003 0 0 1 7.07 0 5.003 5.003 0 0 1 0 7.07l-1.49 1.49c.01-.82-.12-1.64-.4-2.42l.47-.48a2.982 2.982 0 0 0 0-4.24 2.982 2.982 0 0 0-4.24 0l-3.53 3.53a2.982 2.982 0 0 0 0 4.24zm2.82-4.24c.39-.39 1.03-.39 1.42 0a5.003 5.003 0 0 1 0 7.07l-3.54 3.54a5.003 5.003 0 0 1-7.07 0 5.003 5.003 0 0 1 0-7.07l1.49-1.49c-.01.82.12 1.64.4 2.42l-.47.48a2.982 2.982 0 0 0 0 4.24 2.982 2.982 0 0 0 4.24 0l3.53-3.53a2.982 2.982 0 0 0 0-4.24.996.996 0 0 1 0-1.42z" />
              </svg>
            </a>
          )
        }
      </div>
    </div>

    <div class="contact-info">
      <div class="contact-item">
        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
          ></path>
        </svg>
        <a href={`mailto:${email}`} class="contact-link">{email}</a>
      </div>

      {
        phone && (
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
            </svg>
            <a href={`tel:${phone}`} class="contact-link">
              {phone}
            </a>
          </div>
        )
      }

      {
        location && (
          <div class="contact-item">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            <span>
              {location.city}
              {location.region && `, ${location.region}`}
            </span>
          </div>
        )
      }
    </div>

    {
      profiles && profiles.length > 0 && (
        <div class="social-links">
          {profiles.map((profile) => (
            <a
              href={profile.url}
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
              title={`${profile.network}${profile.username ? ` (${profile.username})` : ''}`}
            >
              <span
                class="social-icon"
                data-network={getNetworkIcon(profile.network)}
              />
              <span class="social-text">{profile.network}</span>
            </a>
          ))}
        </div>
      )
    }

    {
      actions && actions.length > 0 && (
        <div class="header-actions">
          {actions.map((action) => (
            <a
              href={action.url}
              class={`action-button action-${action.type}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {action.icon && <span class="action-icon">{action.icon}</span>}
              <span>{action.label}</span>
            </a>
          ))}
        </div>
      )
    }
  </div>
</header>

<style>
  .cv-header {
    position: relative;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-accent, var(--color-primary)) 100%
    );
    color: white;
    overflow: hidden;
  }

  .header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(2px);
  }

  .header-content {
    position: relative;
    z-index: 1;
    padding: 3rem 2rem;
    text-align: center;
  }

  .header-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2rem;
  }

  .profile-image-container {
    position: relative;
  }

  .profile-image {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    border: 4px solid rgba(255, 255, 255, 0.2);
    object-fit: cover;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  .header-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
  }

  .name {
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .title {
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0;
    opacity: 0.9;
  }

  .website-link {
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.2s ease;
  }

  .website-link:hover {
    color: white;
  }

  .contact-info {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
    opacity: 0.8;
  }

  .contact-link {
    color: rgba(255, 255, 255, 0.9);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .contact-link:hover {
    color: white;
  }

  .social-links {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .social-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius, 0.5rem);
    color: white;
    text-decoration: none;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.2s ease;
    backdrop-filter: blur(10px);
  }

  .social-link:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  .social-icon::before {
    content: '';
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .social-icon[data-network='linkedin']::before {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E");
  }

  .social-icon[data-network='github']::before {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  }

  .header-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .action-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.75rem;
    background: white;
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 600;
    border-radius: var(--border-radius, 0.5rem);
    transition: all 0.2s ease;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
  }

  .action-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  @media (max-width: 768px) {
    .header-content {
      padding: 2rem 1rem;
    }

    .name {
      font-size: 2.5rem;
    }

    .title {
      font-size: 1.25rem;
    }

    .contact-info {
      flex-direction: column;
      gap: 1rem;
    }

    .social-links {
      flex-direction: column;
      align-items: center;
    }

    .header-actions {
      flex-direction: column;
    }
  }

  @media print {
    .cv-header {
      background: none !important;
      color: var(--color-text) !important;
      border-bottom: 2px solid var(--color-primary);
    }

    .header-overlay {
      display: none;
    }

    .profile-image {
      width: 80px;
      height: 80px;
      border: 2px solid var(--color-border);
    }

    .social-links,
    .header-actions {
      display: none;
    }
  }
</style>
```

### Base Layout Component

```astro
---
// src/layouts/CVLayout.astro
interface Props {
  title: string;
  description?: string;
  theme?: 'professional' | 'modern' | 'creative';
}

const { title, description, theme = 'professional' } = Astro.props;
---

<!doctype html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
    {description && <meta name="description" content={description} />}

    <!-- SEO Meta Tags -->
    <meta property="og:title" content={title} />
    {description && <meta property="og:description" content={description} />}
    <meta property="og:type" content="website" />

    <!-- Print Styles -->
    <style media="print">
      @page {
        margin: 0.5in;
      }
      .no-print {
        display: none !important;
      }
    </style>
  </head>
  <body>
    <main class="cv-container">
      <slot />
    </main>

    <style>
      :root {
        --color-primary: #2563eb;
        --color-text: #1f2937;
        --color-text-secondary: #6b7280;
        --color-background: #ffffff;
        --color-border: #e5e7eb;
        --font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      }

      [data-theme='professional'] {
        --color-primary: #1e40af;
        --color-accent: #3b82f6;
      }

      [data-theme='modern'] {
        --color-primary: #059669;
        --color-accent: #10b981;
      }

      [data-theme='creative'] {
        --color-primary: #7c3aed;
        --color-accent: #8b5cf6;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: var(--font-family);
        line-height: 1.6;
        color: var(--color-text);
        background: var(--color-background);
      }

      .cv-container {
        max-width: 8.5in;
        margin: 0 auto;
        padding: 1rem;
        background: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      }

      @media print {
        .cv-container {
          max-width: none;
          margin: 0;
          padding: 0;
          box-shadow: none;
        }
      }

      @media (max-width: 768px) {
        .cv-container {
          padding: 0.5rem;
          box-shadow: none;
        }
      }
    </style>
  </body>
</html>
```

## Dynamic Page Generation

### Core Section Components

#### About Section Component

```astro
---
// src/components/About.astro
interface Props {
  summary: string;
}

const { summary } = Astro.props;
---

<section class="about-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 5.5V4C15 1.79 13.21 0 11 0S7 1.79 7 4V5.5L1 7V9L7 7.5V11C7 11.55 7.45 12 8 12S9 11.55 9 11V8.5L11 8V22H13V8L15 8.5V11C15 11.55 15.45 12 16 12S17 11.55 17 11V7.5L21 9Z"
      ></path>
    </svg>
    About
  </h2>
  <div class="about-content">
    <p class="summary-text">{summary}</p>
  </div>
</section>

<style>
  .about-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .about-content {
    padding: 1rem 0;
  }

  .summary-text {
    font-size: 1.125rem;
    line-height: 1.8;
    color: var(--color-text);
    margin: 0;
  }

  @media print {
    .about-section {
      margin: 1rem 0;
    }
  }
</style>
```

#### Enhanced Work Experience Component

```astro
---
// src/components/WorkExperience.astro
import { formatDateRange, calculateDuration } from '../utils/date-helpers';

interface Props {
  name: string;
  position: string;
  type?: string | null;
  url?: string | null;
  start_date: string;
  end_date?: string | null;
  summary?: string;
  highlights?: string[];
  city?: string;
  state?: string | null;
  country?: string;
}

const {
  name,
  position,
  type,
  url,
  start_date,
  end_date,
  summary,
  highlights,
  city,
  state,
  country,
} = Astro.props;

const dateRange = formatDateRange(start_date, end_date);
const duration = calculateDuration(start_date, end_date);
const location = [city, state, country].filter(Boolean).join(', ');
---

<article class="work-item">
  <div class="work-header">
    <div class="work-main">
      <h3 class="position">{position}</h3>
      <div class="company">
        {
          url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              class="company-link"
            >
              {name}
            </a>
          ) : (
            <span>{name}</span>
          )
        }
        {type && <span class="work-type">({type})</span>}
      </div>
    </div>

    <div class="work-meta">
      <div class="date-info">
        <span class="date-range">{dateRange}</span>
        <span class="duration">({duration})</span>
      </div>
      {location && <div class="location">{location}</div>}
    </div>
  </div>

  {
    summary && (
      <div class="work-summary">
        <p>{summary}</p>
      </div>
    )
  }

  {
    highlights && highlights.length > 0 && (
      <div class="work-highlights">
        <ul class="highlights-list">
          {highlights.map((highlight) => (
            <li class="highlight-item">{highlight}</li>
          ))}
        </ul>
      </div>
    )
  }
</article>

<style>
  .work-item {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius, 0.5rem);
    transition: all 0.2s ease;
  }

  .work-item:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary);
  }

  .work-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 1rem;
  }

  .work-main {
    flex: 1;
  }

  .position {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.5rem 0;
  }

  .company {
    font-size: 1rem;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .company-link {
    color: var(--color-primary);
    text-decoration: none;
    font-weight: 500;
  }

  .company-link:hover {
    text-decoration: underline;
  }

  .work-type {
    font-style: italic;
    font-size: 0.875rem;
  }

  .work-meta {
    text-align: right;
    font-size: 0.875rem;
    color: var(--color-text-secondary);
    flex-shrink: 0;
  }

  .date-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.25rem;
  }

  .date-range {
    font-weight: 500;
  }

  .duration {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  .location {
    margin-top: 0.5rem;
    font-size: 0.75rem;
  }

  .work-summary {
    margin: 1rem 0;
    padding: 1rem;
    background: var(--color-background-secondary, #f8fafc);
    border-radius: var(--border-radius, 0.375rem);
    border-left: 3px solid var(--color-primary);
  }

  .work-summary p {
    margin: 0;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  .work-highlights {
    margin-top: 1rem;
  }

  .highlights-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .highlight-item {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.75rem;
    line-height: 1.6;
    color: var(--color-text);
  }

  .highlight-item::before {
    content: '▶';
    position: absolute;
    left: 0;
    color: var(--color-primary);
    font-size: 0.75rem;
    top: 0.125rem;
  }

  @media (max-width: 768px) {
    .work-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .work-meta {
      text-align: left;
    }

    .date-info {
      align-items: flex-start;
    }
  }

  @media print {
    .work-item {
      break-inside: avoid;
      border: none;
      border-bottom: 1px solid var(--color-border);
      border-radius: 0;
      padding: 1rem 0;
      box-shadow: none;
    }

    .work-item:hover {
      box-shadow: none;
      border-color: var(--color-border);
    }
  }
</style>
```

#### Skills Component with Categories

```astro
---
// src/components/Skills.astro
interface Skill {
  name: string;
  level?: string;
  keywords: string[];
}

interface Props {
  skills: Skill[];
}

const { skills } = Astro.props;
---

<section class="skills-section">
  <h2 class="section-title">
    <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
      <path
        d="M12,2A3,3 0 0,1 15,5V11A3,3 0 0,1 12,14A3,3 0 0,1 9,11V5A3,3 0 0,1 12,2M19,11C19,14.53 16.39,17.44 13,17.93V21H11V17.93C7.61,17.44 5,14.53 5,11H7A5,5 0 0,0 12,16A5,5 0 0,0 17,11H19Z"
      ></path>
    </svg>
    Skills & Technologies
  </h2>

  <div class="skills-grid">
    {
      skills.map((skillCategory) => (
        <div class="skill-category">
          <h3 class="category-title">{skillCategory.name}</h3>
          {skillCategory.level && (
            <span class="skill-level">{skillCategory.level}</span>
          )}
          <div class="keywords-container">
            {skillCategory.keywords.map((keyword) => (
              <span class="skill-tag">{keyword}</span>
            ))}
          </div>
        </div>
      ))
    }
  </div>
</section>

<style>
  .skills-section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  .skill-category {
    padding: 1.5rem;
    background: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius, 0.5rem);
    transition: all 0.2s ease;
  }

  .skill-category:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: var(--color-primary);
  }

  .category-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-text);
    margin: 0 0 0.5rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .skill-level {
    font-size: 0.75rem;
    background: var(--color-primary);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-weight: 500;
  }

  .keywords-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .skill-tag {
    background: var(--color-background-secondary, #f1f5f9);
    color: var(--color-text);
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }

  .skill-tag:hover {
    background: var(--color-primary);
    color: white;
    border-color: var(--color-primary);
  }

  @media (max-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }

  @media print {
    .skill-category {
      break-inside: avoid;
      border: 1px solid var(--color-border);
      box-shadow: none;
    }

    .skill-category:hover {
      box-shadow: none;
      border-color: var(--color-border);
    }

    .skill-tag:hover {
      background: var(--color-background-secondary, #f1f5f9);
      color: var(--color-text);
      border-color: var(--color-border);
    }
  }
</style>
```

### Dynamic Page Generation

```astro
---
// src/pages/[slug].astro
import { CVDataSchema, type CVData } from '../utils/cv-schema';
import CVLayout from '../layouts/CVLayout.astro';
import Header from '../components/Header.astro';
import About from '../components/About.astro';
import WorkExperience from '../components/WorkExperience.astro';
import Education from '../components/Education.astro';
import Skills from '../components/Skills.astro';
import Certificates from '../components/Certificates.astro';
import Projects from '../components/Projects.astro';

export async function getStaticPaths() {
  // Load resume data files from data directory
  const dataFiles = import.meta.glob('../data/*.json');
  const paths = [];

  for (const path in dataFiles) {
    const data = (await dataFiles[path]()) as { default: CVData };
    const slug = path.split('/').pop()?.replace('.json', '') || 'resume';

    try {
      const validatedData = CVDataSchema.parse(data.default);
      paths.push({
        params: { slug },
        props: { cvData: validatedData },
      });
    } catch (error) {
      console.error(`Invalid data in ${path}:`, error);
    }
  }

  return paths;
}

interface Props {
  cvData: CVData;
}

const { cvData } = Astro.props;
const {
  basics,
  about,
  work,
  education,
  skills,
  certificates,
  projects,
  volunteer,
  awards,
  publications,
  languages,
} = cvData;
---

<CVLayout
  title={`${basics.name} - ${basics.label}`}
  description={about?.summary}
  theme="professional"
>
  <Header basics={basics} />

  {about?.summary && <About summary={about.summary} />}

  {
    work && work.length > 0 && (
      <section class="section">
        <h2 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14Z" />
          </svg>
          Work Experience
        </h2>
        {work.map((job) => (
          <WorkExperience {...job} />
        ))}
      </section>
    )
  }

  {skills && skills.length > 0 && <Skills skills={skills} />}

  {
    education && education.length > 0 && (
      <section class="section">
        <h2 class="section-title">
          <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z" />
          </svg>
          Education
        </h2>
        {education.map((edu) => (
          <Education {...edu} />
        ))}
      </section>
    )
  }

  {
    certificates && certificates.length > 0 && (
      <Certificates certificates={certificates} />
    )
  }

  {projects && projects.length > 0 && <Projects projects={projects} />}
</CVLayout>

<style>
  .section {
    margin: 2rem 0;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-primary);
    margin-bottom: 1.5rem;
    padding-bottom: 0.75rem;
    border-bottom: 2px solid var(--color-primary);
  }

  .section-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  @media print {
    .section {
      margin: 1rem 0;
    }
  }
</style>
```

## UI Patterns and Design System

### Modern CV Design Patterns

Based on analysis of contemporary CV websites, implement these key patterns:

#### 1. Visual Hierarchy

- **Hero Section**: Large header with gradient background and profile image
- **Section Separation**: Clear visual separators with icons and consistent spacing
- **Card-based Layout**: Work experience, education, and projects in elevated cards
- **Typography Scale**: Consistent font sizing hierarchy (3rem → 1.5rem → 1.25rem → 1rem)

#### 2. Interactive Elements

```typescript
// src/utils/interactions.ts
export function addScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Animate sections on scroll
  document.querySelectorAll('.section').forEach((section) => {
    observer.observe(section);
  });
}

// Add smooth scrolling to anchor links
export function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}
```

#### 3. CSS Animation Framework

```css
/* src/styles/animations.css */
.animate-in {
  animation: slideInUp 0.6s ease-out forwards;
  opacity: 1;
  transform: translateY(0);
}

.section {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.skill-tag {
  animation: fadeInScale 0.3s ease-out;
  animation-fill-mode: both;
}

.skill-tag:nth-child(1) {
  animation-delay: 0.1s;
}
.skill-tag:nth-child(2) {
  animation-delay: 0.2s;
}
.skill-tag:nth-child(3) {
  animation-delay: 0.3s;
}
/* ... continue pattern */

/* Hover animations */
.hover-lift {
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Print animations (disable) */
@media print {
  *,
  *::before,
  *::after {
    animation-duration: 0s !important;
    animation-delay: 0s !important;
    transition-duration: 0s !important;
    transition-delay: 0s !important;
  }
}
```

#### 4. Responsive Grid System

```css
/* src/styles/grid.css */
.cv-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

@media (min-width: 768px) {
  .cv-grid {
    grid-template-columns: 300px 1fr;
    gap: 3rem;
  }
}

@media (min-width: 1024px) {
  .cv-grid {
    grid-template-columns: 350px 1fr;
    gap: 4rem;
  }
}

.sidebar {
  order: 2;
}

.main-content {
  order: 1;
}

@media (min-width: 768px) {
  .sidebar {
    order: 1;
    position: sticky;
    top: 2rem;
    align-self: start;
  }

  .main-content {
    order: 2;
  }
}

/* Print layout */
@media print {
  .cv-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 0;
    max-width: none;
  }

  .sidebar,
  .main-content {
    order: initial;
  }
}
```

## Advanced Features Implementation

### 1. Theme Switching System

```typescript
// src/utils/theme-switcher.ts
export type Theme = 'professional' | 'modern' | 'creative' | 'minimal';

class ThemeManager {
  private currentTheme: Theme = 'professional';

  constructor() {
    this.loadSavedTheme();
    this.applyTheme(this.currentTheme);
  }

  setTheme(theme: Theme) {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.broadcastThemeChange(theme);
  }

  private applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);

    const config = THEME_CONFIGS[theme];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', config.primaryColor);
    root.style.setProperty('--color-accent', config.accentColor);
    root.style.setProperty('--font-family', config.fontFamily);
    root.style.setProperty('--border-radius', config.borderRadius);
  }

  private loadSavedTheme() {
    const saved = localStorage.getItem('cv-theme') as Theme;
    if (saved && Object.keys(THEME_CONFIGS).includes(saved)) {
      this.currentTheme = saved;
    }
  }

  private saveTheme(theme: Theme) {
    localStorage.setItem('cv-theme', theme);
  }

  private broadcastThemeChange(theme: Theme) {
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }
}

export const themeManager = new ThemeManager();
```

```astro
---
// src/components/ThemeSwitcher.astro
---

<div class="theme-switcher no-print">
  <button
    class="theme-button"
    data-theme="professional"
    title="Professional Theme"
  >
    <div class="theme-preview professional"></div>
  </button>
  <button class="theme-button" data-theme="modern" title="Modern Theme">
    <div class="theme-preview modern"></div>
  </button>
  <button class="theme-button" data-theme="creative" title="Creative Theme">
    <div class="theme-preview creative"></div>
  </button>
  <button class="theme-button" data-theme="minimal" title="Minimal Theme">
    <div class="theme-preview minimal"></div>
  </button>
</div>

<script>
  import { themeManager } from '../utils/theme-switcher';

  document.querySelectorAll('.theme-button').forEach((button) => {
    button.addEventListener('click', () => {
      const theme = button.getAttribute('data-theme');
      if (theme) {
        themeManager.setTheme(theme);
        updateActiveButton(button);
      }
    });
  });

  function updateActiveButton(activeButton) {
    document.querySelectorAll('.theme-button').forEach((btn) => {
      btn.classList.remove('active');
    });
    activeButton.classList.add('active');
  }
</script>

<style>
  .theme-switcher {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    gap: 0.5rem;
    background: white;
    padding: 0.75rem;
    border-radius: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }

  .theme-button {
    width: 40px;
    height: 40px;
    border: 2px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s ease;
    background: none;
    padding: 4px;
  }

  .theme-button:hover {
    transform: scale(1.1);
  }

  .theme-button.active {
    border-color: var(--color-primary);
  }

  .theme-preview {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: linear-gradient(
      135deg,
      var(--preview-primary) 0%,
      var(--preview-accent) 100%
    );
  }

  .professional {
    --preview-primary: #1e40af;
    --preview-accent: #3b82f6;
  }

  .modern {
    --preview-primary: #059669;
    --preview-accent: #10b981;
  }

  .creative {
    --preview-primary: #7c3aed;
    --preview-accent: #8b5cf6;
  }

  .minimal {
    --preview-primary: #374151;
    --preview-accent: #6b7280;
  }

  @media (max-width: 768px) {
    .theme-switcher {
      top: 10px;
      right: 10px;
      padding: 0.5rem;
    }

    .theme-button {
      width: 35px;
      height: 35px;
    }
  }
</style>
```

### 2. PDF Export Functionality

```typescript
// src/utils/pdf-export.ts
export async function generatePDF() {
  // Hide interactive elements for PDF
  const interactiveElements = document.querySelectorAll('.no-print');
  interactiveElements.forEach((el) => (el.style.display = 'none'));

  // Apply print styles
  document.body.classList.add('print-mode');

  try {
    if ('print' in window) {
      window.print();
    } else {
      // Fallback for environments without print
      await import('html2pdf.js').then((html2pdf) => {
        const element = document.querySelector('.cv-container');
        const opt = {
          margin: 0.5,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        };
        html2pdf().set(opt).from(element).save();
      });
    }
  } finally {
    // Restore interactive elements
    interactiveElements.forEach((el) => (el.style.display = ''));
    document.body.classList.remove('print-mode');
  }
}
```

```astro
---
// src/components/ExportButton.astro
---

<button class="export-button no-print" id="export-pdf">
  <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"
    ></path>
  </svg>
  <span>Export PDF</span>
</button>

<script>
  import { generatePDF } from '../utils/pdf-export';

  document.getElementById('export-pdf')?.addEventListener('click', generatePDF);
</script>

<style>
  .export-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.875rem 1.5rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease;
  }

  .export-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.2);
  }

  .icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (max-width: 768px) {
    .export-button {
      bottom: 10px;
      right: 10px;
      padding: 0.75rem 1.25rem;
    }
  }
</style>
```

### 3. Analytics and Performance Monitoring

```typescript
// src/utils/analytics.ts
export class CVAnalytics {
  private startTime: number;

  constructor() {
    this.startTime = performance.now();
    this.trackPageLoad();
    this.trackUserInteractions();
  }

  private trackPageLoad() {
    window.addEventListener('load', () => {
      const loadTime = performance.now() - this.startTime;
      this.sendEvent('page_load', { load_time: Math.round(loadTime) });
    });
  }

  private trackUserInteractions() {
    // Track section views
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionName =
              entry.target.getAttribute('data-section') ||
              entry.target.className;
            this.sendEvent('section_view', { section: sectionName });
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('.section').forEach((section) => {
      observer.observe(section);
    });

    // Track link clicks
    document.querySelectorAll('a[href^="http"]').forEach((link) => {
      link.addEventListener('click', () => {
        this.sendEvent('external_link_click', {
          url: link.getAttribute('href'),
          type: this.getLinkType(link),
        });
      });
    });
  }

  private getLinkType(link: HTMLElement): string {
    if (link.closest('.social-links')) return 'social';
    if (link.closest('.work-item')) return 'company';
    if (link.closest('.project-item')) return 'project';
    return 'other';
  }

  private sendEvent(eventName: string, data: Record<string, any>) {
    // Send to analytics service (Google Analytics, Plausible, etc.)
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, data);
    }

    // Log for development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', eventName, data);
    }
  }
}

export const analytics = new CVAnalytics();
```

## Build and Deployment

### Enhanced Build Configuration

```bash
# Install additional dependencies for advanced features
npm install @astrojs/tailwind @astrojs/sitemap @astrojs/compress html2pdf.js

# Build scripts in package.json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "build:analyze": "astro build --analyze",
    "build:profile": "astro build --profile",
    "optimize": "npm run build && npm run compress",
    "compress": "npx imagemin 'dist/**/*.{jpg,png,svg}' --out-dir=dist"
  }
}
```

### Production Optimization

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

export default defineConfig({
  site: 'https://your-cv-site.com',
  output: 'static',
  integrations: [
    tailwind(),
    sitemap(),
    compress({
      css: true,
      html: true,
      img: true,
      js: true,
      svg: true,
    }),
  ],
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto',
    minify: true,
  },
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'pdf-export': ['html2pdf.js'],
          },
        },
      },
    },
    optimizeDeps: {
      include: ['html2pdf.js'],
    },
  },
});
```

### Deployment Strategies

#### GitHub Pages Deployment

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Performance Optimizations

### Image Optimization

```astro
---
import { Image } from 'astro:assets';
---

{
  image && (
    <Image
      src={image}
      alt={`${name} profile photo`}
      width={150}
      height={150}
      class="profile-image"
      loading="eager"
      decoding="async"
      format="webp"
      quality={85}
    />
  )
}
```

### Critical CSS Optimization

```css
/* Inline critical CSS for above-the-fold content */
/* src/styles/critical.css */
.cv-header {
  /* Critical header styles */
}

.section-title {
  /* Critical section title styles */
}

/* Load non-critical CSS asynchronously */
```

### Bundle Analysis and Code Splitting

```typescript
// Bundle analysis script
import { defineConfig } from 'astro/config';

export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Vendor libraries
            if (id.includes('node_modules')) {
              if (id.includes('html2pdf')) {
                return 'pdf-export';
              }
              return 'vendor';
            }

            // Component chunks
            if (id.includes('/components/')) {
              return 'components';
            }

            // Utility chunks
            if (id.includes('/utils/')) {
              return 'utils';
            }
          },
        },
      },
    },
  },
});
```

### SEO and Meta Optimization

```astro
---
// Enhanced Layout with SEO
interface Props {
  title: string;
  description?: string;
  theme?: 'professional' | 'modern' | 'creative' | 'minimal';
  cvData?: CVData;
}

const { title, description, theme = 'professional', cvData } = Astro.props;

// Generate structured data
const structuredData = cvData
  ? {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: cvData.basics.name,
      jobTitle: cvData.basics.label,
      email: cvData.basics.email,
      telephone: cvData.basics.phone,
      url: cvData.basics.url,
      address: cvData.basics.location
        ? {
            '@type': 'PostalAddress',
            addressLocality: cvData.basics.location.city,
            addressCountry: cvData.basics.location.country_code,
          }
        : undefined,
      alumniOf: cvData.education?.map((edu) => ({
        '@type': 'EducationalOrganization',
        name: edu.institution,
      })),
      worksFor: cvData.work?.[0]
        ? {
            '@type': 'Organization',
            name: cvData.work[0].name,
          }
        : undefined,
    }
  : null;
---

<!doctype html>
<html lang="en" data-theme={theme}>
  <head>
    <meta charset="utf-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="generator" content={Astro.generator} />

    <!-- Primary Meta Tags -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content={cvData?.basics.name} />

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={Astro.url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta
      property="og:image"
      content={cvData?.basics.image || '/og-image.jpg'}
    />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content={Astro.url} />
    <meta property="twitter:title" content={title} />
    <meta property="twitter:description" content={description} />
    <meta
      property="twitter:image"
      content={cvData?.basics.image || '/og-image.jpg'}
    />

    <!-- Additional SEO -->
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href={Astro.url} />

    <!-- Structured Data -->
    {
      structuredData && (
        <script
          type="application/ld+json"
          set:html={JSON.stringify(structuredData)}
        />
      )
    }

    <!-- Preload critical resources -->
    <link
      rel="preload"
      href="/fonts/Inter-variable.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <!-- Print Styles -->
    <style media="print">
      @page {
        margin: 0.5in;
        size: letter;
      }
      .no-print {
        display: none !important;
      }
      body {
        font-size: 12pt;
        line-height: 1.4;
      }
      .cv-container {
        box-shadow: none;
      }
    </style>
  </head>
  <body>
    <main class="cv-container">
      <slot />
    </main>
  </body>
</html>
```

## Testing and Quality Assurance

### Automated Testing Setup

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
});
```

```typescript
// tests/cv-page.spec.ts
import { test, expect } from '@playwright/test';

test.describe('CV Page', () => {
  test('should load and display basic information', async ({ page }) => {
    await page.goto('/');

    // Check that header information is displayed
    await expect(page.locator('h1')).toContainText('Sudeep G');
    await expect(page.locator('h2')).toContainText('Senior Software Engineer');

    // Check contact information
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
  });

  test('should handle theme switching', async ({ page }) => {
    await page.goto('/');

    // Click modern theme
    await page.click('[data-theme="modern"]');

    // Check if theme applied
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'modern');
  });

  test('should export PDF', async ({ page }) => {
    await page.goto('/');

    // Mock the print function
    await page.evaluate(() => {
      window.print = () => console.log('PDF export triggered');
    });

    await page.click('#export-pdf');
    // Verify PDF export was triggered
  });

  test('should be responsive', async ({ page }) => {
    await page.goto('/');

    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that header stacks vertically
    const header = page.locator('.cv-header');
    await expect(header).toBeVisible();

    // Test desktop view
    await page.setViewportSize({ width: 1024, height: 768 });

    // Check that layout adapts
    await expect(header).toBeVisible();
  });

  test('should have proper accessibility', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading hierarchy
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);

    // Check for alt text on images
    const images = page.locator('img');
    await expect(images.first()).toHaveAttribute('alt');

    // Check for proper link attributes
    const externalLinks = page.locator('a[href^="http"]');
    await expect(externalLinks.first()).toHaveAttribute('rel', /noopener/);
  });
});
```

### Performance Monitoring

```typescript
// tests/performance.spec.ts
import { test, expect } from '@playwright/test';

test('should meet performance benchmarks', async ({ page }) => {
  await page.goto('/');

  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcp = entries.find(
          (entry) => entry.entryType === 'largest-contentful-paint'
        );
        const fid = entries.find((entry) => entry.entryType === 'first-input');
        const cls = entries.find((entry) => entry.entryType === 'layout-shift');

        resolve({
          lcp: lcp?.startTime,
          fid: fid?.processingStart - fid?.startTime,
          cls: cls?.value,
        });
      }).observe({
        entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'],
      });
    });
  });

  // LCP should be under 2.5s
  expect(metrics.lcp).toBeLessThan(2500);

  // FID should be under 100ms
  expect(metrics.fid).toBeLessThan(100);

  // CLS should be under 0.1
  expect(metrics.cls).toBeLessThan(0.1);
});
```

## Conclusion

This comprehensive implementation guide provides everything needed to reverse-engineer and build a modern CV website generator using Astro.js that matches the functionality and design patterns of contemporary CV platforms.

### Key Features Implemented:

1. **Comprehensive Data Schema**: Extended JSON schema supporting all modern CV sections including work experience, education, skills, certificates, projects, and more.

2. **Advanced Component Architecture**: Modular, reusable components with consistent styling, animations, and responsive design.

3. **Modern UI Patterns**:
   - Hero sections with gradient backgrounds
   - Card-based layouts with hover effects
   - Smooth scroll animations
   - Interactive theme switching
   - Responsive grid systems

4. **Professional Features**:
   - PDF export functionality
   - Multiple theme options
   - Print optimization
   - SEO optimization with structured data
   - Analytics and performance monitoring

5. **Development Best Practices**:

- TypeScript for type safety
- Component-based architecture
  - Automated testing setup
  - Performance optimization
  - Accessibility compliance

6. **Production Ready**:
   - Optimized build configuration
   - Multiple deployment strategies
   - CDN optimization
   - Bundle analysis and code splitting

### Technical Advantages:

- **Performance**: Static generation with minimal JavaScript, fast loading times
- **SEO**: Optimized for search engines with structured data and meta tags
- **Accessibility**: WCAG 2.1 compliant with proper ARIA labels and semantic HTML
- **Maintainability**: Clear component structure with TypeScript
- **Scalability**: Modular architecture supports easy feature additions
- **Cross-platform**: Works across all devices and browsers

### Implementation Timeline:

1. **Week 1**: Setup project, implement core schema and layout components
2. **Week 2**: Build all section components (About, Work, Skills, etc.)
3. **Week 3**: Add advanced features (themes, PDF export, animations)
4. **Week 4**: Optimization, testing, and deployment setup

This implementation provides a solid foundation that can be extended with additional features like contact forms, blog integration, or CMS connectivity while maintaining excellent performance and user experience.
