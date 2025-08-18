# Phase 3: Data Integration from JSON

## Overview

This phase transforms your static template to use real JSON data, implementing the complete data layer with TypeScript interfaces, data transformation utilities, and dynamic component rendering.

## Prerequisites

- Phase 2 completed successfully
- Static template working with Lorem Ipsum content
- Understanding of TypeScript interfaces and JSON data structures

## Implementation Steps

### Step 1: Create TypeScript Schema Definitions

Create `src/utils/schemas/cv-schema.ts`:

```typescript
// src/utils/schemas/cv-schema.ts
import { z } from 'zod';

// Location Schema
export const LocationSchema = z.object({
  address: z.string().nullable().optional(),
  postal_code: z.string().nullable().optional(),
  city: z.string(),
  country_code: z.string(),
  region: z.string().nullable().optional(),
});

// Profile Schema
export const ProfileSchema = z.object({
  network: z.string(),
  username: z.string().nullable().optional(),
  url: z.string(),
  icon: z.string().nullable().optional(),
});

// Action Schema
export const ActionSchema = z.object({
  type: z.string(),
  label: z.string(),
  url: z.string(),
  icon: z.string().optional(),
});

// Basics Schema
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
  actions: z.array(ActionSchema).optional(),
});

// About Schema
export const AboutSchema = z.object({
  summary: z.string(),
});

// Work Experience Schema
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

// Education Schema
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

// Skill Schema
export const SkillSchema = z.object({
  name: z.string(),
  level: z.string().optional(),
  keywords: z.array(z.string()),
});

// Certificate Schema
export const CertificateSchema = z.object({
  name: z.string(),
  date: z.string().nullable().optional(),
  issuer: z.string(),
  url: z.string().nullable().optional(),
});

// Project Schema
export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  highlights: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  url: z.string().nullable().optional(),
});

// Award Schema
export const AwardSchema = z.object({
  title: z.string(),
  date: z.string().optional(),
  awarder: z.string(),
  summary: z.string().optional(),
});

// Publication Schema
export const PublicationSchema = z.object({
  name: z.string(),
  publisher: z.string(),
  release_date: z.string().optional(),
  url: z.string().optional(),
  summary: z.string().optional(),
});

// Language Schema
export const LanguageSchema = z.object({
  language: z.string(),
  fluency: z.string().optional(),
});

// Interest Schema
export const InterestSchema = z.object({
  name: z.string(),
  keywords: z.array(z.string()).optional(),
});

// Reference Schema
export const ReferenceSchema = z.object({
  name: z.string(),
  reference: z.string(),
  contact: z.string().optional(),
});

// Volunteer Schema
export const VolunteerSchema = z.object({
  organization: z.string(),
  position: z.string(),
  url: z.string().optional(),
  start_date: z.string(),
  end_date: z.string().optional(),
  summary: z.string().optional(),
  highlights: z.array(z.string()).optional(),
});

// Media Schema
export const MediaSchema = z.object({
  type: z.string(),
  url: z.string(),
  title: z.string().optional(),
});

// Link Schema
export const LinkSchema = z.object({
  title: z.string(),
  url: z.string(),
  description: z.string().optional(),
});

// Main CV Data Schema
export const CVDataSchema = z.object({
  basics: BasicsSchema,
  about: AboutSchema,
  media: z.array(MediaSchema).optional(),
  work: z.array(WorkExperienceSchema).optional(),
  volunteer: z.array(VolunteerSchema).optional(),
  education: z.array(EducationSchema).optional(),
  awards: z.array(AwardSchema).optional(),
  publications: z.array(PublicationSchema).optional(),
  languages: z.array(LanguageSchema).optional(),
  certificates: z.array(CertificateSchema).optional(),
  skills: z.array(SkillSchema).optional(),
  interests: z.array(InterestSchema).optional(),
  references: z.array(ReferenceSchema).optional(),
  projects: z.array(ProjectSchema).optional(),
  links: z.array(LinkSchema).optional(),
  locations: z.array(LocationSchema).optional(),
});

// TypeScript Types
export type CVData = z.infer<typeof CVDataSchema>;
export type Basics = z.infer<typeof BasicsSchema>;
export type About = z.infer<typeof AboutSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type Certificate = z.infer<typeof CertificateSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Location = z.infer<typeof LocationSchema>;
```

### Step 2: Create Data Utility Functions

Create `src/utils/helpers/date-helpers.ts`:

```typescript
// src/utils/helpers/date-helpers.ts

/**
 * Format a date string to readable format
 */
export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Present';

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  } catch (error) {
    console.warn('Invalid date format:', dateString);
    return dateString || 'Present';
  }
}

/**
 * Format a date range
 */
export function formatDateRange(
  startDate: string,
  endDate?: string | null
): string {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  return `${start} - ${end}`;
}

/**
 * Calculate duration between two dates
 */
export function calculateDuration(
  startDate: string,
  endDate?: string | null
): string {
  try {
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
    } else if (months > 0) {
      return `${months} mo${months > 1 ? 's' : ''}`;
    } else {
      return 'Less than 1 month';
    }
  } catch (error) {
    console.warn('Error calculating duration:', error);
    return '';
  }
}

/**
 * Check if a date is current (no end date or end date is in the future)
 */
export function isCurrentPosition(endDate?: string | null): boolean {
  if (!endDate) return true;

  try {
    const end = new Date(endDate);
    const now = new Date();
    return end > now;
  } catch (error) {
    return false;
  }
}

/**
 * Sort items by start date (newest first)
 */
export function sortByStartDate<T extends { start_date: string }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => {
    try {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return dateB.getTime() - dateA.getTime();
    } catch (error) {
      return 0;
    }
  });
}
```

Create `src/utils/helpers/data-helpers.ts`:

```typescript
// src/utils/helpers/data-helpers.ts

/**
 * Get network icon identifier
 */
export function getNetworkIcon(network: string): string {
  const iconMap: Record<string, string> = {
    LinkedIn: 'linkedin',
    GitHub: 'github',
    Twitter: 'twitter',
    Instagram: 'instagram',
    Facebook: 'facebook',
    YouTube: 'youtube',
    Website: 'website',
    Portfolio: 'portfolio',
    Email: 'email',
    Phone: 'phone',
    Dribbble: 'dribbble',
    Behance: 'behance',
    Medium: 'medium',
    'Dev.to': 'devto',
    'Stack Overflow': 'stackoverflow',
  };

  return iconMap[network] || 'link';
}

/**
 * Format location string
 */
export function formatLocation(location?: {
  city: string;
  region?: string | null;
  country?: string;
}): string {
  if (!location) return '';

  const parts = [location.city, location.region, location.country].filter(
    Boolean
  );

  return parts.join(', ');
}

/**
 * Generate initials from name
 */
export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Sanitize and validate URL
 */
export function sanitizeUrl(url?: string | null): string | null {
  if (!url) return null;

  try {
    // Add protocol if missing
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    const validUrl = new URL(url);
    return validUrl.href;
  } catch (error) {
    console.warn('Invalid URL:', url);
    return null;
  }
}

/**
 * Extract domain from URL for display
 */
export function extractDomain(url?: string | null): string {
  if (!url) return '';

  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '');
  } catch (error) {
    return url || '';
  }
}

/**
 * Group skills by category
 */
export function groupSkillsByCategory(
  skills: Array<{ name: string; keywords: string[]; level?: string }>
): Array<{ name: string; keywords: string[]; level?: string }> {
  // Return skills as-is since they're already categorized
  return skills;
}

/**
 * Get skill level color
 */
export function getSkillLevelColor(level?: string): string {
  const levelColors: Record<string, string> = {
    Expert: 'var(--color-success)',
    Advanced: 'var(--color-primary)',
    Intermediate: 'var(--color-warning)',
    Beginner: 'var(--color-text-secondary)',
    Novice: 'var(--color-text-secondary)',
  };

  return levelColors[level || ''] || 'var(--color-primary)';
}

/**
 * Truncate text to specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Generate SEO-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
```

### Step 3: Create Data Loading Utilities

Create `src/utils/data-loader.ts`:

```typescript
// src/utils/data-loader.ts
import type { CVData } from './schemas/cv-schema';
import { CVDataSchema } from './schemas/cv-schema';

/**
 * Load and validate CV data from JSON file
 */
export async function loadCVData(dataPath: string): Promise<CVData> {
  try {
    // In Astro, we can import JSON directly
    const data = await import(/* @vite-ignore */ dataPath);
    const jsonData = data.default || data;

    // Validate data against schema
    const validatedData = CVDataSchema.parse(jsonData);

    return validatedData;
  } catch (error) {
    console.error('Error loading CV data:', error);
    throw new Error(`Failed to load CV data from ${dataPath}: ${error}`);
  }
}

/**
 * Transform legacy JSON structure to current schema
 */
export function transformLegacyData(legacyData: any): CVData {
  try {
    // Handle legacy data structure differences
    const transformedData = {
      basics: {
        name: legacyData.basics?.name || '',
        label: legacyData.basics?.label || '',
        image: legacyData.basics?.image || null,
        bg_image: legacyData.basics?.bg_image || null,
        email: legacyData.basics?.email || '',
        phone: legacyData.basics?.phone || undefined,
        url: legacyData.basics?.url || null,
        location: legacyData.basics?.location
          ? {
              address: legacyData.basics.location.address || null,
              postal_code: legacyData.basics.location.postal_code || null,
              city: legacyData.basics.location.city || '',
              country_code: legacyData.basics.location.country_code || '',
              region: legacyData.basics.location.region || null,
            }
          : undefined,
        profiles: legacyData.basics?.profiles || [],
        actions: legacyData.basics?.actions || [],
      },
      about: {
        summary: legacyData.about?.summary || legacyData.basics?.summary || '',
      },
      media: legacyData.media || [],
      work:
        legacyData.work?.map((work: any) => ({
          name: work.name,
          position: work.position,
          type: work.type || null,
          url: work.url || null,
          start_date: work.start_date || work.startDate,
          end_date: work.end_date || work.endDate || null,
          summary: work.summary,
          highlights: work.highlights || [],
          city: work.city,
          state: work.state || null,
          country: work.country,
        })) || [],
      volunteer: legacyData.volunteer || [],
      education:
        legacyData.education?.map((edu: any) => ({
          institution: edu.institution,
          url: edu.url || null,
          area: edu.area,
          study_type: edu.study_type || edu.studyType,
          start_date: edu.start_date || edu.startDate,
          end_date: edu.end_date || edu.endDate || null,
          score: edu.score || null,
          courses: edu.courses || [],
          city: edu.city,
          state: edu.state || null,
          country: edu.country,
        })) || [],
      awards: legacyData.awards || [],
      publications: legacyData.publications || [],
      languages: legacyData.languages || [],
      certificates: legacyData.certificates || [],
      skills: legacyData.skills || [],
      interests: legacyData.interests || [],
      references: legacyData.references || [],
      projects: legacyData.projects || [],
      links: legacyData.links || [],
      locations: legacyData.locations || [],
    };

    // Validate transformed data
    return CVDataSchema.parse(transformedData);
  } catch (error) {
    console.error('Error transforming legacy data:', error);
    throw new Error(`Failed to transform legacy data: ${error}`);
  }
}

/**
 * Get all available CV data files
 */
export async function getAvailableDataFiles(): Promise<string[]> {
  // This would be implemented based on your file structure
  // For now, return a hardcoded list
  return ['sudeep-cv.json'];
}

/**
 * Generate static paths for dynamic routing
 */
export async function generateCVPaths() {
  const dataFiles = import.meta.glob('/src/data/*.json');
  const paths = [];

  for (const path in dataFiles) {
    try {
      const data = (await dataFiles[path]()) as { default: any };
      const fileName = path.split('/').pop()?.replace('.json', '') || 'resume';

      // Transform and validate data
      const transformedData = transformLegacyData(data.default);

      paths.push({
        params: { slug: fileName },
        props: { cvData: transformedData },
      });
    } catch (error) {
      console.error(`Invalid data in ${path}:`, error);
    }
  }

  return paths;
}
```

### Step 4: Copy and Transform JSON Data

Copy your JSON data to `src/data/sudeep-cv.json`:

```json
{
  "basics": {
    "name": "Sudeep G",
    "label": "Senior Software Engineer | Full-Stack Developer",
    "image": null,
    "bg_image": null,
    "email": "sudeepg95@gmail.com",
    "phone": "+919020709002",
    "url": null,
    "location": {
      "address": null,
      "postal_code": null,
      "city": "Bengaluru",
      "country_code": "IN",
      "region": null
    },
    "profiles": [
      {
        "network": "LinkedIn",
        "username": "sudeepg95",
        "url": "https://www.linkedin.com/in/sudeepg95",
        "icon": null
      },
      {
        "network": "GitHub",
        "username": "sudeepg95",
        "url": "https://github.com/sudeepg95",
        "icon": null
      },
      {
        "network": "Email",
        "username": null,
        "url": "sudeepg95@gmail.com",
        "icon": null
      },
      {
        "network": "Phone",
        "username": null,
        "url": "+919020709002",
        "icon": null
      }
    ],
    "actions": []
  },
  "about": {
    "summary": "Highly accomplished Senior Software Engineer with 7 years of experience specializing in full-stack web development, machine learning, and product building. Proven ability to architect scalable solutions, lead complex migrations, and drive product innovation, consistently delivering high-impact results in fast-paced environments."
  },
  "media": [],
  "work": [
    {
      "name": "InVideo",
      "position": "Senior Software Engineer",
      "type": null,
      "url": null,
      "start_date": "2021-11-01",
      "end_date": "2024-03-28",
      "summary": "Led UI architectural initiatives and drove significant code migrations to enhance a next-gen video editing platform.",
      "highlights": [
        "Architected and implemented critical UI architectural decisions, optimizing front-end performance and scalability for a next-gen video editing platform.",
        "Directed and executed large-scale code migration from Angular to React for entire modules utilizing Module Federation, significantly improving system efficiency and maintainability.",
        "Provided 24/7 on-call support and directly engaged with users to identify and resolve critical bugs in production environments, ensuring high system availability and user satisfaction."
      ],
      "city": "Remote",
      "state": null,
      "country": ""
    },
    {
      "name": "ThoughtWorks",
      "position": "Senior Consultant (Contract)",
      "type": null,
      "url": null,
      "start_date": "2020-08-01",
      "end_date": "2021-11-01",
      "summary": "Delivered comprehensive web and mobile modules, focusing on high-performance and user experience for diverse client projects.",
      "highlights": [
        "Developed scalable web modules using React and Angular, enhancing user experience and functionality for key client applications.",
        "Engineered cross-platform React components for seamless integration across iOS, Android, and web applications, broadening accessibility.",
        "Built robust Angular modules for Progressive Web Applications (PWAs), improving offline capabilities and user engagement.",
        "Constructed high-performance static websites from scratch using Gatsby, achieving minimal load times and optimizing SEO performance."
      ],
      "city": "Remote",
      "state": null,
      "country": ""
    }
  ],
  "volunteer": [],
  "education": [
    {
      "institution": "NSS College of Engineering",
      "url": null,
      "area": "Computer Science & Engineering",
      "study_type": "B.Tech",
      "start_date": "2012-08-01",
      "end_date": "2016-05-31",
      "score": null,
      "courses": [],
      "city": "Palakkad",
      "state": null,
      "country": "India"
    }
  ],
  "awards": [],
  "publications": [],
  "languages": [],
  "certificates": [
    {
      "name": "TensorFlow in Practice Specialization",
      "date": null,
      "issuer": "deeplearning.ai (Coursera)",
      "url": null
    },
    {
      "name": "Architecting with Google Cloud Platform Specialization",
      "date": null,
      "issuer": "Coursera",
      "url": null
    }
  ],
  "skills": [
    {
      "name": "Programming Languages",
      "keywords": ["JavaScript", "Python", "Golang", "Java", "Bash"]
    },
    {
      "name": "Frameworks/Libraries",
      "keywords": [
        "React",
        "React Native",
        "Redux",
        "Angular",
        "Gatsby",
        "Vue.js",
        "Express",
        "NestJS"
      ]
    }
  ],
  "interests": [],
  "references": [],
  "projects": [],
  "links": [],
  "locations": []
}
```

### Step 5: Update Header Component for Dynamic Data

Update `src/components/sections/Header.astro`:

```astro
---
// src/components/sections/Header.astro
import type { Basics } from '../../utils/schemas/cv-schema';
import { getNetworkIcon, sanitizeUrl } from '../../utils/helpers/data-helpers';

interface Props {
  basics: Basics;
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

// Process profiles to handle different URL formats
const processedProfiles =
  profiles
    ?.map((profile) => ({
      ...profile,
      url:
        profile.network === 'Email'
          ? `mailto:${profile.url}`
          : profile.network === 'Phone'
            ? `tel:${profile.url}`
            : sanitizeUrl(profile.url),
      icon: getNetworkIcon(profile.network),
    }))
    .filter((profile) => profile.url) || [];
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
              href={sanitizeUrl(url)}
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
      processedProfiles.length > 0 && (
        <div class="social-links">
          {processedProfiles.map((profile) => (
            <a
              href={profile.url!}
              class="social-link"
              target="_blank"
              rel="noopener noreferrer"
              title={`${profile.network}${profile.username ? ` (${profile.username})` : ''}`}
            >
              <span class={`social-icon ${profile.icon}`} />
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

<!-- Keep the existing styles from Phase 2 -->
<style>
  /* Copy all styles from Phase 2 Header component */
  .cv-header {
    position: relative;
    background: linear-gradient(
      135deg,
      var(--color-primary) 0%,
      var(--color-accent) 100%
    );
    color: white;
    overflow: hidden;
    margin: -2rem -2rem 0 -2rem;
    border-radius: var(--border-radius-lg) var(--border-radius-lg) 0 0;
  }

  /* ... rest of styles from Phase 2 ... */

  /* Add new social icon styles */
  .social-icon.linkedin {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E");
  }

  .social-icon.github {
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  }

  /* Additional social icons can be added here */

  /* Copy remaining styles from Phase 2 */
</style>
```

### Step 6: Update About Component for Dynamic Data

Update `src/components/sections/About.astro`:

```astro
---
// src/components/sections/About.astro
import type { About } from '../../utils/schemas/cv-schema';

interface Props {
  about: About;
}

const { about } = Astro.props;
const { summary } = about;

// Split summary into paragraphs if it contains line breaks
const paragraphs = summary.split('\n\n').filter((p) => p.trim().length > 0);
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
    {
      paragraphs.length > 1 ? (
        paragraphs.map((paragraph) => (
          <p class="summary-text">{paragraph.trim()}</p>
        ))
      ) : (
        <p class="summary-text">{summary}</p>
      )
    }
  </div>
</section>

<!-- Keep existing styles from Phase 2 -->
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
    margin-bottom: 1.5rem;
  }

  .summary-text:last-child {
    margin-bottom: 0;
  }

  @media print {
    .about-section {
      margin: 1rem 0;
    }

    .summary-text {
      font-size: 1rem;
      line-height: 1.6;
    }
  }
</style>
```

### Step 7: Update Work Experience Component for Dynamic Data

Update `src/components/sections/WorkExperience.astro`:

```astro
---
// src/components/sections/WorkExperience.astro
import type { WorkExperience } from '../../utils/schemas/cv-schema';
import {
  formatDateRange,
  calculateDuration,
} from '../../utils/helpers/date-helpers';
import { formatLocation, sanitizeUrl } from '../../utils/helpers/data-helpers';

interface Props {
  work: WorkExperience[];
}

const { work } = Astro.props;

// Sort work experience by start date (newest first)
const sortedWork = [...work].sort((a, b) => {
  const dateA = new Date(a.start_date);
  const dateB = new Date(b.start_date);
  return dateB.getTime() - dateA.getTime();
});
---

{
  sortedWork.length > 0 && (
    <section class="work-section">
      <h2 class="section-title">
        <svg class="section-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4A2,2 0 0,1 2,19V8A2,2 0 0,1 4,6H8V4A2,2 0 0,1 10,2M14,6V4H10V6H14Z" />
        </svg>
        Work Experience
      </h2>

      <div class="work-timeline">
        {sortedWork.map((job) => {
          const dateRange = formatDateRange(job.start_date, job.end_date);
          const duration = calculateDuration(job.start_date, job.end_date);
          const location = formatLocation({
            city: job.city || '',
            region: job.state,
            country: job.country,
          });

          return (
            <article class="work-item">
              <div class="work-header">
                <div class="work-main">
                  <h3 class="position">{job.position}</h3>
                  <div class="company">
                    {job.url ? (
                      <a
                        href={sanitizeUrl(job.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="company-link"
                      >
                        {job.name}
                      </a>
                    ) : (
                      <span>{job.name}</span>
                    )}
                    {job.type && <span class="work-type">({job.type})</span>}
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

              {job.summary && (
                <div class="work-summary">
                  <p>{job.summary}</p>
                </div>
              )}

              {job.highlights && job.highlights.length > 0 && (
                <div class="work-highlights">
                  <ul class="highlights-list">
                    {job.highlights.map((highlight) => (
                      <li class="highlight-item">{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  )
}

<!-- Keep existing styles from Phase 2 -->
<style>
  /* Copy all styles from Phase 2 WorkExperience component */
  .work-section {
    margin: 2rem 0;
  }

  /* ... rest of styles ... */
</style>
```

### Step 8: Update Dynamic Index Page

Create `src/pages/[slug].astro`:

```astro
---
// src/pages/[slug].astro
import { CVDataSchema, type CVData } from '../utils/schemas/cv-schema';
import { transformLegacyData } from '../utils/data-loader';
import CVLayout from '../layouts/CVLayout.astro';
import Header from '../components/sections/Header.astro';
import About from '../components/sections/About.astro';
import WorkExperience from '../components/sections/WorkExperience.astro';
import Skills from '../components/sections/Skills.astro';

export async function getStaticPaths() {
  // Load resume data files from data directory
  const dataFiles = import.meta.glob('../data/*.json');
  const paths = [];

  for (const path in dataFiles) {
    const data = (await dataFiles[path]()) as { default: any };
    const slug = path.split('/').pop()?.replace('.json', '') || 'resume';

    try {
      // Transform legacy data structure to current schema
      const transformedData = transformLegacyData(data.default);
      const validatedData = CVDataSchema.parse(transformedData);

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
const { basics, about, work, education, skills, certificates, projects } =
  cvData;

const pageTitle = `${basics.name} - ${basics.label}`;
const pageDescription = about.summary.substring(0, 160) + '...';
---

<CVLayout title={pageTitle} description={pageDescription} theme="professional">
  <Header basics={basics} />
  <About about={about} />

  {work && work.length > 0 && <WorkExperience work={work} />}

  {skills && skills.length > 0 && <Skills skills={skills} />}

  <!-- Add other sections as needed -->
</CVLayout>
```

Update `src/pages/index.astro`:

```astro
---
// src/pages/index.astro - Redirect to default resume
export async function getStaticPaths() {
  return [{ params: {}, props: {} }];
}

// Redirect to the default resume
return Astro.redirect('/sudeep-cv');
---
```

## TODO List for Phase 3

### ✅ Schema & Types Definition

- [ ] Create comprehensive Zod schemas in `cv-schema.ts`
- [ ] Define TypeScript interfaces for all data structures
- [ ] Add validation for date formats and URL structures
- [ ] Test schema validation with sample data
- [ ] Handle optional and nullable fields correctly

### ✅ Data Utilities

- [ ] Create date formatting helpers (`formatDate`, `calculateDuration`)
- [ ] Implement data transformation utilities
- [ ] Add URL sanitization and validation functions
- [ ] Create network icon mapping system
- [ ] Test all utility functions with edge cases

### ✅ Data Loading System

- [ ] Implement JSON data loading with validation
- [ ] Create legacy data transformation function
- [ ] Add error handling for malformed data
- [ ] Implement dynamic path generation for Astro
- [ ] Test with multiple JSON files

### ✅ Component Updates

- [ ] Update Header component to accept dynamic props
- [ ] Modify About component for dynamic content
- [ ] Transform WorkExperience component for data binding
- [ ] Update Skills component for dynamic skill categories
- [ ] Add conditional rendering for optional sections

### ✅ JSON Data Integration

- [ ] Copy and transform existing JSON resume data
- [ ] Validate data structure against schemas
- [ ] Test data loading in development environment
- [ ] Handle missing or null fields gracefully
- [ ] Verify all data displays correctly

### ✅ Dynamic Routing

- [ ] Implement `[slug].astro` for dynamic CV pages
- [ ] Set up static path generation
- [ ] Add proper error handling for invalid routes
- [ ] Test multiple CV data files
- [ ] Implement default route redirection

### ✅ Data Processing

- [ ] Sort work experience by date (newest first)
- [ ] Handle date formatting for display
- [ ] Process social media URLs correctly
- [ ] Format location information consistently
- [ ] Calculate employment durations automatically

### ✅ Validation & Error Handling

- [ ] Test with invalid JSON data
- [ ] Handle missing required fields gracefully
- [ ] Add console warnings for data issues
- [ ] Implement fallback values for optional fields
- [ ] Test edge cases (empty arrays, null values)

### ✅ Performance & Optimization

- [ ] Optimize data loading performance
- [ ] Test with large datasets
- [ ] Minimize bundle size impact
- [ ] Cache validation results where possible
- [ ] Profile component rendering performance

### ✅ Cross-browser Testing

- [ ] Test data loading in all major browsers
- [ ] Verify date formatting across locales
- [ ] Check URL handling and validation
- [ ] Test print functionality with dynamic data
- [ ] Validate responsive behavior

## Verification Checklist

Before proceeding to Phase 4, ensure:

1. **Data loads correctly**: All JSON data displays without errors
2. **Schema validation works**: Invalid data is caught and reported
3. **Dynamic routing functions**: Multiple CV slugs work correctly
4. **Date formatting is consistent**: All dates display properly
5. **URLs are handled safely**: All links work and are secure
6. **Components render dynamically**: No more Lorem Ipsum content
7. **Performance is acceptable**: No significant loading delays
8. **Error handling works**: Graceful degradation for missing data

## Next Steps

Once Phase 3 is complete, proceed to **Phase 4: Advanced Features Implementation** where you'll:

1. Add theme switching functionality
2. Implement PDF export capability
3. Add animations and interactive elements
4. Optimize for performance and SEO

## Common Issues & Solutions

### Issue: Schema Validation Errors

**Solution**: Check data types and required fields in JSON

```bash
npm run type-check
```

### Issue: Date Formatting Problems

**Solution**: Ensure dates are in YYYY-MM-DD format

```typescript
// Convert dates if needed
const formattedDate = new Date(dateString).toISOString().split('T')[0];
```

### Issue: Component Not Rendering

**Solution**: Check for missing props or conditional rendering

```astro
{data && data.length > 0 && <Component data={data} />}
```

## Resources

- [Zod Documentation](https://zod.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Astro Dynamic Routing](https://docs.astro.build/en/core-concepts/routing/#dynamic-routes)
- [JSON Resume Schema](https://jsonresume.org/schema/)
